import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ResponseLogin } from 'src/app/models/responseLogin';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models/user';
import { UserServices } from 'src/app/services/userServices';
@Component({
  selector: 'app-detail-account-admin',
  templateUrl: './detail-account-admin.component.html',
  styleUrls: ['./detail-account-admin.component.css']
})
export class DetailAccountAdminComponent implements OnInit {
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
 role;
  constructor(private formBuilder:FormBuilder,private userServices:UserServices) { }

  ngOnInit(): void {
  this.response=JSON.parse(localStorage.getItem('response'));
  this.token=this.response.jwttoken;
  this.role=this.response.autorities[0].authority;
  this.username=this.response.username;
  this.userServices.retrouveUser(this.response.id,this.token).subscribe(data=>{this.photo=data.photo;console.log(this.photo)});  
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
    if(this.username!==data.email && data.email!==null){console.log('true');control.setErrors({existeUser1:true
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
  detailCommande(id){

  }
  modifierClient(){
    this.submitted=true;
    if (this.registerForm.invalid) {
      return;
  }
    const formData=new FormData();
    const user=new User(this.response.username,this.password,this.response.first_name,
      this.response.last_name,this.response.phone_number,this.response.address,this.photo,this.response.autorities[0].authority,true);
      console.log(this.photo +' photo');
      formData.append('user',JSON.stringify(user));
      if(this.existeFile==true){
      formData.append('file',this.selectedfile);
      }else{
        formData.append('file',new File([],''));
      
      }
      this.userServices.updateClient(this.response.id,formData,this.token).subscribe(data=>{
       let responseUser=new ResponseLogin(this.token,this.response.username,this.response.autorities,data.first_name
          ,data.last_name,data.phone_number,data.address,this.response.id);
          localStorage.setItem('response',JSON.stringify(responseUser));
      });
  }
  onFileChanged(event){
    this.selectedfile=(<HTMLInputElement>event.target).files[0];
    this.existeFile=true;
  }
}