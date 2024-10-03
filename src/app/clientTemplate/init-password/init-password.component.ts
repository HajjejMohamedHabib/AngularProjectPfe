import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CleForgotPasswordServices } from 'src/app/services/CleForgotPasswordServices';
import { UserServices } from 'src/app/services/userServices';
@Component({
  selector: 'app-init-password',
  templateUrl: './init-password.component.html',
  styleUrls: ['./init-password.component.css']
})
export class InitPasswordComponent implements OnInit {
  registerForm: FormGroup;
  submitted = false;
  password;
  ConfirmPassword;
  id;
  cle;
  constructor(private formBuilder:FormBuilder,private router:Router,private userServices:UserServices,private cleForgotPasswordServices:CleForgotPasswordServices,private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.route.queryParams
      .subscribe(params => {
        console.log(params); 
        this.id = params.id;
        this.cle=params.cle;
      }
    );
    console.log(this.cle);
    console.log(this.id);
    this.registerForm = this.formBuilder.group({
      
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
  },{
    validator: [this.MustMatch('password', 'confirmPassword')]
  }
  );
  
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
  InitPassword(){
    this.submitted=true;
   if (this.registerForm.invalid) {
     return;
 }
   this.cleForgotPasswordServices.getCleForgotPassword(parseInt(this.id)).subscribe(data=>{
    console.log(data);
    if(data.cleSecret==this.cle){
      console.log(data.cleSecret);
       const formData=new FormData();
       formData.append('password',this.password);
       this.userServices.initPassword(data.email,formData).subscribe(data1=>{
         console.log(data1);

       },error=>{this.router.navigateByUrl('login?email='+data.email+'&password='+this.password)}  
   );
  }
});
}
}
