import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { UserServices } from 'src/app/services/userServices';

@Component({
  selector: 'app-create-customer-account',
  templateUrl: './create-customer-account.component.html',
  styleUrls: ['./create-customer-account.component.css']
})
export class CreateCustomerAccountComponent implements OnInit {
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
  constructor(private userServices:UserServices,private formBuilder:FormBuilder,private route:Router) { }

  ngOnInit(): void {
   let numberRegEx = /\-?\d*\.?\d{1,2}/;
    this.registerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
      address:['',Validators.required],
      photo:['',Validators.required],
      phoneNumber:['',[Validators.required,Validators.minLength(8),Validators.maxLength(8),Validators.pattern(numberRegEx)]],
      acceptTerms: [false, Validators.requiredTrue]
  }, {
      validator: [this.MustMatch('password', 'confirmPassword'),this.existeUser1('email')]
  });
  
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
createCustomerAccount(){
  this.submitted=true;
  if (this.registerForm.invalid) {
    return;
}
  const formData=new FormData();
    const user=new User(this.email,this.password,this.first_name,
      this.last_name,this.phone_number,this.address,this.photo,'Client',true);
      formData.append('user',JSON.stringify(user));
      formData.append('file',this.selectedfile);
  this.userServices.ajouterUser(formData).subscribe(data=>{console.log(data)
    this.route.navigate(['/login'], { queryParams: { email: this.email,password: this.password } });
  })
}
onFileChanged(event){
  this.selectedfile=(<HTMLInputElement>event.target).files[0];
}
}
