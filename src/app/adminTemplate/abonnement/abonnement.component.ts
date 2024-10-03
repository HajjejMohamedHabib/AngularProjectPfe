import { Component, OnInit } from '@angular/core';
import { Abonnement } from 'src/app/models/Abonnement';
import { ResponseLogin } from 'src/app/models/responseLogin';
import { AbonnementServices } from 'src/app/services/AbonnementServices';
import { loadStripe } from '@stripe/stripe-js';
import { PaymentServices } from 'src/app/services/PaymentServices';
import { environment } from 'src/environments/environment';
import { ActivatedRoute, Router } from '@angular/router';
import { SecretPaiementServices } from 'src/app/services/SecretPaiementServices';
import { SecretPaiement } from 'src/app/models/SecretPaiement';
@Component({
  selector: 'app-abonnement',
  templateUrl: './abonnement.component.html',
  styleUrls: ['./abonnement.component.css']
})
export class AbonnementComponent implements OnInit {
  abonnement;
  response:ResponseLogin;
  token;
  dateFin; 
  etatBouton=false;
  typeAbonnement="";
  prix;
  stripePromise = loadStripe(environment.stripe);
  cleSecretPaiment;
  emailQueryParam;
  cleQueryParam;
  dateFinAbonnement;
  temp;
  constructor(private abonnementServices:AbonnementServices,private route:ActivatedRoute,private secPaiementService:SecretPaiementServices,private paymentServices:PaymentServices,private router:Router) { }

  ngOnInit(): void {
    this.route.queryParams
      .subscribe(params => {
        console.log(params); // { order: "popular" }
        this.emailQueryParam = params.email;
        this.cleQueryParam=params.cleSecretPaiment;
        this.temp=params.typeAbonnement;
      }
    );
    if(this.temp!=null){
      this.typeAbonnement=this.temp;
    }
    if(this.typeAbonnement!=""){
    this.dateFinAbonnement =new Date();
    if(this.typeAbonnement=='Monthly'){
    this.dateFinAbonnement.setDate(this.dateFinAbonnement.getDate()+30);
  }else if(this.typeAbonnement=='Annual'){
    this.dateFinAbonnement.setDate(this.dateFinAbonnement.getDate()+365);
  }}
    if(this.emailQueryParam!=null){
      this.secPaiementService.retriveSecretPaiementCle(this.emailQueryParam,this.cleQueryParam).subscribe(data=>{
        if(this.cleQueryParam==data.cleSecret){
      this.abonnementServices.ajouterAbonnement(new Abonnement(this.typeAbonnement,this.dateFinAbonnement,
        this.response.id)).subscribe(data=>{console.log(data);
        this.abonnementServices.getAbonnementVendeur(this.response.id,this.token).subscribe(
          data=>{
            this.abonnement=data;
            this.etatBouton=false;
          }
        )
        });
        }
      })
    }
    this.cleSecretPaiment= Math.floor(100000 + Math.random() * 900000
  
    );
  this.response=JSON.parse(localStorage.getItem('response'))
  this.token=this.response.jwttoken;
  this.abonnementServices.getAbonnementVendeur(this.response.id,this.token).subscribe(data=>{
    this.abonnement=data;console.log(data);
    if(this.abonnement!=null){
    this.dateFin=new Date(data.dateFinAbonnement);
    if(this.dateFin.getTime()<new Date().getTime()){
     this.etatBouton=true;
    }}
    else{
      this.etatBouton=true;
    }
  })
  }
  onSelectChanged(event){
    this.typeAbonnement=(<HTMLInputElement>event.target).value;
    if(this.typeAbonnement=='Annual'){
      this.prix=200;
      console.log(this.prix)
    }
    else if(this.typeAbonnement=='Monthly'){
      this.prix=20;
    }
  }
  ajoutAbonnement(){
    if(this.typeAbonnement==""){
      return ;
    }
    this.secPaiementService.ajouterSecretPaiement(new SecretPaiement(this.cleSecretPaiment,this.response.username,
      this.response.id)).subscribe(data=>console.log(data));
      this.pay();
  }
  async pay(): Promise<void> {
    // here we create a payment object
    const payment = {
      name: 'Abonnement',
      currency: 'usd',
      // amount on cents *10 => to be on dollar
      amount:this.prix*100,
      quantity: '1',
      cancelUrl: 'http://localhost:4200/abonnement',
      successUrl: 'http://localhost:4200/abonnement?email='+this.response.username+'&cleSecretPaiment='+this.cleSecretPaiment+'&typeAbonnement='+this.typeAbonnement,
    };
  
    const stripe = await this.stripePromise;
    // this is a normal http calls for a backend api
    this.paymentServices.paymentAbonnement(payment)
    
      .subscribe((data: any) => {
        // I use stripe to redirect To Checkout page of Stripe platform
        stripe.redirectToCheckout({
          sessionId: data.id,
        });
      });
  }
   //Payment
}
