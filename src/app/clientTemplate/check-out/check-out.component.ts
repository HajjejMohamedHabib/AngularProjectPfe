import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { loadStripe } from '@stripe/stripe-js';
import { Commande } from 'src/app/models/Commande';
import { CommandeItem } from 'src/app/models/commandeItem';
import { Pannier_Produit } from 'src/app/models/pannier';
import { ResponseLogin } from 'src/app/models/responseLogin';
import { CommandeServices } from 'src/app/services/commandeservices';
import { PaymentServices } from 'src/app/services/PaymentServices';
import { SharedServices } from 'src/app/services/sharedServices';
import { environment } from 'src/environments/environment';
import {Stomp} from '@stomp/stompjs';
import * as SockJS from 'sockjs-client';
import { ServiceNot } from 'src/app/services/ServiceNot';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css']
})
export class CheckOutComponent implements OnInit {
  registerForm: FormGroup;
  submitted = false;
  pannier:Pannier_Produit[];
  totalPrix:number=0;
  first_name;
  last_name;
  email;
  phone_number;
  address;
  company_name;
  city;
  country;
  post_code;
  reponse:ResponseLogin;
  token;
  commande:Commande;
  stripePromise = loadStripe(environment.stripe);
  etatButton=true;
  //webSocket
  title = 'grokonez';
  description = 'Angular-WebSocket Demo';
  notifications:Notification[]=[];
  greetings: string[] = [];
  disabled = true;
  name: string;
  nbreNotifs=0;
  private stompClient = null;
  // fin webSocket
  constructor(private commandeServices:CommandeServices,private formBuilder:FormBuilder,private authentifServ:ServiceNot,private route:Router,private paymentServices:PaymentServices,private sharedServ:SharedServices) {
    this.sharedServ.getClickEvent().subscribe(data=>this.ngOnInit());
   
  }
   
  ngOnInit(): void {
    this.connect();
    let numberRegEx = /\-?\d*\.?\d{1,2}/;
    this.registerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      address:['',Validators.required],
      city:['',Validators.required],
      country:['',Validators.required],
      postCode:['',[Validators.required,Validators.minLength(4),Validators.maxLength(4),Validators.pattern(numberRegEx)]],
      phoneNumber:['',[Validators.required,Validators.minLength(8),Validators.maxLength(8),Validators.pattern(numberRegEx)]],
  }
  );
    if(localStorage.getItem('response')!=null){
    this.pannier=JSON.parse(localStorage.getItem('pannier'));
    for(let p of this.pannier){
        this.totalPrix=this.totalPrix+p.prix*p.quantite;
      }
    }

  }
  get f() { return this.registerForm.controls; }
  //Web Socket
   //messageNotification
   setConnected(connected: boolean) {
    this.disabled = !connected;

    if (connected) {
      this.greetings = [];
    }
  }

  connect() {
   // this.response=JSON.parse(localStorage.getItem('response'));
//let token=this.response.jwttoken;
//let tokenstr='Bearer '+token;
  //  console.log(tokenstr);
   // const headers=new HttpHeaders().set('Authorization',tokenstr);
    let url='http://localhost:3600/gkz-stomp-endpoint/';
    //url = this.location.prepareExternalUrl(url);
    //url += '?access_token=' + token;
    console.log(url);
    const socket = new SockJS(url);
    this.stompClient = Stomp.over(socket);
    const _this = this;
    this.stompClient.connect({}, function (frame) {
      _this.setConnected(true);
      console.log('Connected: ' + frame);

      _this.stompClient.subscribe('/topic/messageNotif', function (hello) {
        _this.showGreeting(JSON.parse(hello.body).greeting);
      });
    });
  }

  disconnect() {
    if (this.stompClient != null) {
      this.stompClient.disconnect();
    }

    this.setConnected(false);
    console.log('Disconnected!');
  }
  showGreeting(message) {
    this.greetings.push(JSON.parse(message));
    this.nbreNotifs=this.nbreNotifs +1;
    console.log(this.greetings);
  }
  // fin Web Socket
  ajouterCommande(){
    this.submitted=true;
    if (this.registerForm.invalid) {
      return;
  }
    this.reponse=JSON.parse(localStorage.getItem('response'));
    this.token=this.reponse.jwttoken;
    let pannier:Pannier_Produit[]=JSON.parse(localStorage.getItem('pannier'));
   this.commandeServices.ajouterCommande(this.token,new Commande(this.first_name,this.last_name,
    this.city,this.country,this.post_code,this.email,this.address,this.phone_number
    ,this.company_name,this.reponse.id)).subscribe(data=>{this.commande=data;
    console.log(data);
    this.stompClient.send(
      '/gkz/hello',
      {},
      JSON.stringify({'content': this.first_name+' '+this.last_name})
    );
   this.authentifServ.ajouter(this.token).subscribe(data=>console.log(data));
      for(let p of pannier){
        console.log(p.produit);
        let quantite=p.quantite;
        let produit=p.produit
        this.commandeServices.ajouterCommandeItem(new CommandeItem(quantite,produit),data.id,this.token).subscribe(data=>{console.log(data);
          localStorage.setItem('commande',JSON.stringify(data));  
          this.route.navigateByUrl('succesCheckOut');
        });
      }
    });
  }
  async pay(): Promise<void> {
    // here we create a payment object
    const payment = {
      name: 'Iphone',
      currency: 'usd',
      // amount on cents *10 => to be on dollar
      amount:this.totalPrix*100,
      quantity: '1',
      cancelUrl: 'http://localhost:4200/pannier',
      successUrl: 'http://localhost:4200/succes',
    };

    const stripe = await this.stripePromise;
    let response:ResponseLogin=JSON.parse(localStorage.getItem('response'));
    let token=response.jwttoken;
    // this is a normal http calls for a backend api
    this.paymentServices.payment(token,payment)
    
      .subscribe((data: any) => {
        // I use stripe to redirect To Checkout page of Stripe platform
        stripe.redirectToCheckout({
          sessionId: data.id,
        });
      });
  }
}
