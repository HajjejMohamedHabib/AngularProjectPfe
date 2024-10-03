import { Component, OnInit } from '@angular/core';
import { Pannier_Produit } from 'src/app/models/pannier';
import { ResponseLogin } from 'src/app/models/responseLogin';
import { loadStripe } from '@stripe/stripe-js';
import { PaymentServices } from 'src/app/services/PaymentServices';
import { environment } from 'src/environments/environment';
import { SecretPaiementServices } from 'src/app/services/SecretPaiementServices';
import { SecretPaiement } from 'src/app/models/SecretPaiement';
@Component({
  selector: 'app-succes-checkout',
  templateUrl: './succes-checkout.component.html',
  styleUrls: ['./succes-checkout.component.css']
})
export class SuccesCheckoutComponent implements OnInit {
  pannier:Pannier_Produit[];
  totalPrix:number=0;
  stripePromise = loadStripe(environment.stripe);
  cleSecretPaiment;
  response:ResponseLogin;
  token;
  constructor(private paymentServices:PaymentServices,private secPaiementService:SecretPaiementServices) { }

  ngOnInit(): void {
    this.cleSecretPaiment= Math.floor(100000 + Math.random() * 900000
      );
    this.pannier=JSON.parse(localStorage.getItem('pannier'));
    for(let p of this.pannier){
        this.totalPrix=this.totalPrix+p.prix*p.quantite;
    }
    this.response=JSON.parse(localStorage.getItem('response'));
    this.token=this.response.jwttoken;
  }
  async pay(): Promise<void> {
    // here we create a payment object
    this.secPaiementService.ajouterSecretPaiement(new SecretPaiement(this.cleSecretPaiment,this.response.username,
      this.response.id)).subscribe(data=>console.log(data));
    const payment = {
      name: 'Iphone',
      currency: 'usd',
      // amount on cents *10 => to be on dollar
      amount:this.totalPrix*100,
      quantity: '1',
      cancelUrl: 'http://localhost:4200/pannier',
      successUrl: 'http://localhost:4200/succes?email='+this.response.username+'&cle='+this.cleSecretPaiment,
    };

    const stripe = await this.stripePromise;
    // this is a normal http calls for a backend api
    this.paymentServices.payment(this.token,payment)
    
      .subscribe((data: any) => {
        // I use stripe to redirect To Checkout page of Stripe platform
        stripe.redirectToCheckout({
          sessionId: data.id,
        });
      });
  }
}
