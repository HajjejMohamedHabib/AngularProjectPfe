import { Component, OnInit, Output,EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import{ResponseLogin}from 'src/app/models/responseLogin';
import{RequestLogin}from 'src/app/models/requestLogin';
import { LoginService } from 'src/app/services/login.service';
import { first } from 'rxjs/operators';
import {ClientHeaderComponent} from '../client-header/client-header.component';
import { SharedServices } from 'src/app/services/sharedServices';
import { SharedServicesPannier } from 'src/app/services/sharedServicesPannier';
import { PannierServices } from 'src/app/services/Pannier';
import { Pannier_Produit } from 'src/app/models/pannier';
import { MyVarService } from 'src/app/services/myVarServices';
import { SecretPaiementServices } from 'src/app/services/SecretPaiementServices';
import { AbonnementServices } from 'src/app/services/AbonnementServices';
import { Abonnement } from 'src/app/models/Abonnement';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email:string;
  password:string;
  cleSecretPaiement;
  isLoginFailed=false;
  errorMessage='';
  response:ResponseLogin;
  @Output() adminEtat=new EventEmitter();
  returnUrl:string;
  dateFinAbonnement;
  typeAbonnement;
  idVend;
  registerForm: FormGroup;
  submitted:boolean=false;
  constructor(private loginSer:LoginService,private formBuilder:FormBuilder,private route:ActivatedRoute,private router:Router,private pannnierServices:PannierServices
    ,private sharedPannier:SharedServicesPannier,private abonnementServices:AbonnementServices,private secPaiementService:SecretPaiementServices,private myVarServices:MyVarService,private sharedServices:SharedServices) { }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
  }
  );
    this.dateFinAbonnement =new Date();
    if(JSON.parse(localStorage.getItem('abonnement')).typeAbonnement=='Monthly'){
    this.dateFinAbonnement.setDate(this.dateFinAbonnement.getDate()+30);
  }else if(JSON.parse(localStorage.getItem('abonnement')).typeAbonnement=='Annual'){
    this.dateFinAbonnement.setDate(this.dateFinAbonnement.getDate()+365);
  }
  this.typeAbonnement=JSON.parse(localStorage.getItem('abonnement')).typeAbonnement;
  this.idVend=JSON.parse(localStorage.getItem('abonnement')).vendeur;
    this.route.queryParams
      .subscribe(params => this.returnUrl = params['returnUrl'] || '');
    console.log(this.returnUrl);
    this.route.queryParams
      .subscribe(params => {
        console.log(params); // { order: "popular" }
        this.email = params.email;
        this.password=params.password;
        this.cleSecretPaiement=params.cleSecretPaiment;
      }
    );
this.secPaiementService.retriveSecretPaiement(this.email).subscribe(data=>{
  if(this.cleSecretPaiement==data.cleSecret){
this.abonnementServices.ajouterAbonnement(new Abonnement(this.typeAbonnement,this.dateFinAbonnement,
  this.idVend)).subscribe(data=>console.log(data));
  }
})
  }
  get f() { return this.registerForm.controls; }
  login(){
    this.submitted=true;
    if (this.registerForm.invalid) {
      return;
  }
    this.loginSer.recupereData(new RequestLogin(this.email,this.password)).pipe(first())
    .subscribe(data=>{this.isLoginFailed=false;
      this.myVarServices.setMyVar2(true);
      //this.router.navigateByUrl('/contentProduit');
      this.adminEtat.emit("true");
      this.response=data;
      localStorage.setItem('response',JSON.stringify(this.response));
      localStorage.setItem('etatadmin','true');
      if(this.response.autorities[0].authority=='Client'){
      this.myVarServices.setMyVar('Client');
            if(localStorage.getItem('pannier')!=null){
              let pans:Pannier_Produit[]=JSON.parse(localStorage.getItem('pannier'));
              for(let pan of pans){
        this.pannnierServices.ajouterPannier(this.response.jwttoken,new Pannier_Produit(pan.id,this.response.id)).subscribe(
      data=>console.log(data));
      }
      this.pannnierServices.getPannier(this.response.id,this.response.jwttoken).subscribe(data=>{
        localStorage.setItem('pannier',JSON.stringify(data));
      });
    }
      this.sharedServices.sendClickEvent5();
      this.sharedPannier.sendClickEvent();
      this.router.navigateByUrl(this.returnUrl)
      }
      else{
        this.myVarServices.setMyVar('Admin');
        //this.router.navigateByUrl('dashboard');
        window.location.reload();
      }
    },
    error=>{this.errorMessage=error.error.message;
      this.isLoginFailed=true;
    }
      );
    
  }

}
