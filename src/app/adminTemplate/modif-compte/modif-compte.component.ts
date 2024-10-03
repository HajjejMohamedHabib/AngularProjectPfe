import { Component, OnInit } from '@angular/core';
import {  ActivatedRoute, Router } from '@angular/router';
import { ResponseUser } from 'src/app/models/response';
import { User } from 'src/app/models/user';
import { UserServices } from 'src/app/services/userServices';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ResponseLogin } from 'src/app/models/responseLogin';

@Component({
  selector: 'app-modif-compte',
  templateUrl: './modif-compte.component.html',
  styleUrls: ['./modif-compte.component.css']
})
export class ModifCompteComponent implements OnInit {
  registerForm: FormGroup;
  submitted = false;
  response:ResponseLogin;
 token;
 password;
 confirmPassword
 etatModifier=false;
 photo;
 selectedfile:File;
 existeFile=false;
 username:string;
 id;
 user:ResponseUser;
 email;
  constructor(private route:ActivatedRoute,private router:Router,private formBuilder:FormBuilder,private userServices:UserServices) { }

  ngOnInit(): void {
  this.id=parseInt(this.route.snapshot.paramMap.get('id'));
  this.response=JSON.parse(localStorage.getItem('response'));
  this.token=this.response.jwttoken;
  this.username=this.response.username;
  this.userServices.retrouveUser(this.id,this.token).subscribe(data=>{this.email=data.mail;});
  this.userServices.retrouveUser(this.id,this.token).subscribe(data=>{this.photo=data.photo;
    this.user=data;
    console.log(this.photo)});  
//Validation Form
  let numberRegEx = /\-?\d*\.?\d{1,2}/;
   this.registerForm = this.formBuilder.group({
     firstName: ['', Validators.required],
     lastName: ['', Validators.required],
     email: ['', [Validators.required, Validators.email]],
     password: ['', [Validators.required, Validators.minLength(6)]],
     confirmPassword: ['', Validators.required],
     address:['',Validators.required],
     phoneNumber:['',[Validators.required,Validators.minLength(8),Validators.maxLength(8),Validators.pattern(numberRegEx)]],
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
    if(data.id!=0 && this.email!=control.value ){console.log('true');control.setErrors({existeUser1:true
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
  modifier(){
this.etatModifier=true
  }
  modifierClient(){
    this.submitted=true;
    if (this.registerForm.invalid) {
      return;
  }
    const formData=new FormData();
    const user=new User(this.user.mail,this.password,this.user.first_name,
      this.user.last_name,this.user.phone_number,this.user.address,this.photo,this.user.role,true);
      console.log(this.photo +' photo');
      formData.append('user',JSON.stringify(user));
      if(this.existeFile==true){
      formData.append('file',this.selectedfile);
      }else{
        formData.append('file',new File([],''));
      
      }
      this.userServices.updateClient(this.id,formData,this.token).subscribe(data=>{
       this.router.navigateByUrl('content');
      });
  }
  onFileChanged(event){
    this.selectedfile=(<HTMLInputElement>event.target).files[0];
    this.existeFile=true;
  }
}