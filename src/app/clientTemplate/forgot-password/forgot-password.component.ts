import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CleForgotPassword } from 'src/app/models/CleForgotPassword';
import { CleForgotPasswordServices } from 'src/app/services/CleForgotPasswordServices';
import { MailServices } from 'src/app/services/mailServices';
import { UserServices } from 'src/app/services/userServices';
@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  registerForm: FormGroup;
  submitted = false;
  email;
  cle;
  cleForgotPassword;
  constructor(private formBuilder:FormBuilder,private cleForgotPasswordServices:CleForgotPasswordServices,private router:Router,private mailServices:MailServices,private userServices:UserServices) { }

  ngOnInit(): void {
    this.cle= Math.floor(100000 + Math.random() * 900000
  
    );
       this.registerForm = this.formBuilder.group({
         email: ['', [Validators.required, Validators.email]],
     },{
       validator: [this.existeUser1('email')]
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
      if(data.first_name ==null){console.log('true');control.setErrors({existeUser1:true
   })}else{console.log('null');control.setErrors(null);}
 });
 }
   }
    get f() { return this.registerForm.controls; }
    envoyerMail(){
     this.submitted=true
     if(this.registerForm.invalid){
       return;
     }
     
     this.cleForgotPasswordServices.ajouterCleForgotPassword(new CleForgotPassword(this.cle,this.email))
     .subscribe(data=>{console.log(data);this.cleForgotPassword=data
     const formData=new FormData();
     formData.append('lienInit','http://localhost:4200/login/forgotPassword/InitPassword?cle='+this.cle+'&id='+this.cleForgotPassword.id);
     this.mailServices.ajouterMail(formData,this.email).subscribe(data=>{
       console.log('open the email and init your password ');
      });
    });
    }
}
