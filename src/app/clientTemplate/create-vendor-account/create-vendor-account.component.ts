import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { UserServices } from 'src/app/services/userServices';
import { loadStripe } from '@stripe/stripe-js';
import { PaymentServices } from 'src/app/services/PaymentServices';
import { environment } from 'src/environments/environment';
import { Abonnement } from 'src/app/models/Abonnement';
import { SecretPaiementServices } from 'src/app/services/SecretPaiementServices';
import { SecretPaiement } from 'src/app/models/SecretPaiement';
@Component({
  selector: 'app-create-vendor-account',
  templateUrl: './create-vendor-account.component.html',
  styleUrls: ['./create-vendor-account.component.css']
})
export class CreateVendorAccountComponent implements OnInit {
  registerForm: FormGroup;
  submitted = false;
  email;
  password;
  address;
  first_name;
  last_name;
  phone_number;
  photo;
  role;
  id;
  selectedfile:File;
  typeAbonnement;
  prix;
  stripePromise = loadStripe(environment.stripe);
  cleSecretPaiment;
  existeUser:boolean=false;
  constructor(private userServices:UserServices,private secPaiementService:SecretPaiementServices,private paymentServices:PaymentServices,private formBuilder:FormBuilder,private route:Router) { }

  ngOnInit(): void {

     this.cleSecretPaiment= Math.floor(100000 + Math.random() * 900000
  
  );
    let numberRegEx = /\-?\d*\.?\d{1,2}/;
     this.registerForm = this.formBuilder.group({
       firstName: ['', Validators.required],
       typeAbonnement:['',Validators.required],
       lastName: ['', Validators.required],
       email: ['', [Validators.required, Validators.email]],
       password: ['', [Validators.required, Validators.minLength(6)]],
       confirmPassword: ['', Validators.required],
       address:['',Validators.required],
       photo:['',Validators.required],
       phoneNumber:['',[Validators.required,Validators.minLength(8),Validators.maxLength(8),Validators.pattern(numberRegEx)]],
       acceptTerms: [false, Validators.requiredTrue]
   },{
     validator: [this.MustMatch('password', 'confirmPassword'),this.existeUser1('email')]
   }
   );
   
   }
   existeUser1(email:string){
   return(formGroup: FormGroup)=>{
    const control = formGroup.controls[email];
    if (control.errors && !control.errors.existeUser1) {
      // return if another validator has already found an error on the matchingControl
      return;
  }
  this.userServices.retrouveUserEmail(control.value).subscribe(data=>{console.log(data);
     if(data.first_name !==null){console.log('true');control.setErrors({existeUser1:true
  })}else{console.log('null');control.setErrors(null);}
});
}
  }
   get f() { return this.registerForm.controls; }
     MustMatch(controlName: string, matchingControlName: string) {
     return (formGroup: FormGroup) => {
         const control = formGroup.controls[controlName];
         const matchingControl = formGroup.controls[matchingControlName];
        
         if (matchingControl.errors && !matchingControl.errors.mustMatch) {
             // return if another validator has already found an error on the matchingControl
             return;
         }
 
         // set error on matchingControl if validation fails
         if (control.value !== matchingControl.value) {
             matchingControl.setErrors({ mustMatch: true });
         } else {
             matchingControl.setErrors(null);
         }
     }
 }
 createVendorAccount(){
   this.submitted=true;
  console.log(this.existeUser);
   if (this.registerForm.invalid) {
     return;
 }
   const formData=new FormData();
     const user=new User(this.email,this.password,this.first_name,
       this.last_name,this.phone_number,this.address,this.photo,'Vendeur',true);
       formData.append('user',JSON.stringify(user));
       formData.append('file',this.selectedfile);
   this.userServices.ajouterUser(formData).subscribe(data=>{console.log(data)
    let abonnement=new Abonnement(this.typeAbonnement,'',data.id);
    localStorage.setItem('abonnement',JSON.stringify(abonnement)); 
    //ajout secret paiement
   this.secPaiementService.ajouterSecretPaiement(new SecretPaiement(this.cleSecretPaiment,this.email,
    data.id)).subscribe(data=>console.log(data));
    this.pay();
     
    })
 }
 //Payment
 async pay(): Promise<void> {
  // here we create a payment object
  const payment = {
    name: 'Abonnement',
    currency: 'usd',
    // amount on cents *10 => to be on dollar
    amount:this.prix*100,
    quantity: '1',
    cancelUrl: 'http://localhost:4200/login?email='+this.email+'&password='+this.password,
    successUrl: 'http://localhost:4200/login?email='+this.email+'&password='+this.password+'&cleSecretPaiment='+this.cleSecretPaiment,
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
 onFileChanged(event){
   this.selectedfile=(<HTMLInputElement>event.target).files[0];
 }
 onSelectChanged(event){
   this.typeAbonnement=(<HTMLInputElement>event.target).value;
   if(this.typeAbonnement=='Annual'){
     this.prix=200;
   }
   else{
     this.prix=20;
   }
 }
 }
 
