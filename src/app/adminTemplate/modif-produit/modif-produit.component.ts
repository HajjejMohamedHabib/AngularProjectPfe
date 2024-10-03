import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductRequest } from 'src/app/models/ProductRequest';
import { ProductResponse } from 'src/app/models/ProductResponse';
import { ResponseLogin } from 'src/app/models/responseLogin';
import { ProductServices } from 'src/app/services/ProductServices';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-modif-produit',
  templateUrl: './modif-produit.component.html',
  styleUrls: ['./modif-produit.component.css']
})
export class ModifProduitComponent implements OnInit {
 id;
 produit:ProductResponse;
 marque;
 prix;
 description;
 nbre_piece;
 image;
 response:ResponseLogin;
 token;
 selectedfile:File;
 existeFile=false;
 registerForm: FormGroup;
  submitted = false;
  constructor(private productServices:ProductServices,private formBuilder:FormBuilder,private route:ActivatedRoute,private router:Router) {
}

  ngOnInit(): void {
    //
    let numberRegEx = /\-?\d*\.?\d{1,2}/;
this.registerForm = this.formBuilder.group({
  marque: ['', Validators.required],
  nomProduit:['',Validators.required],
  prix: ['', [Validators.required,Validators.pattern(numberRegEx)]],
  description: ['', [Validators.required]],
  nbre_piece: ['', [Validators.required,Validators.pattern(numberRegEx)]],
}
);
    //
    this.response=JSON.parse(localStorage.getItem('response'));
    this.token=this.response.jwttoken;
 this.id=this.route.snapshot.paramMap.get('id');
 console.log(this.id);
 this.productServices.retrouveProduit(this.id).subscribe(data=>this.produit=data);
  }
  get f() { return this.registerForm.controls; }
  ModifierProduit(){
    this.submitted=true
    if(this.registerForm.invalid){
      return ;
    }
    const formData =new FormData();
    formData.append('produit',JSON.stringify(this.produit))
    if(this.existeFile==true){
    formData.append('file',this.selectedfile);}
    else{
      formData.append('file',new File([],''));
    }
    this.productServices.modifProduit(this.id,formData,this.token).subscribe(data=>{
    this.router.navigateByUrl('contentProduit');});
  }
  onFileChanged(event){
    this.selectedfile=(<HTMLInputElement>event.target).files[0];
    this.existeFile=true;
      }
}
