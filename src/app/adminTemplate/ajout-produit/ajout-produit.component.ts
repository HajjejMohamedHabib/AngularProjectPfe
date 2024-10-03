import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CategoryResponse } from 'src/app/models/CategoryResponse';
import { ModelAjoutProduit } from 'src/app/models/ModelAjoutProduit';
import { ResponseLogin } from 'src/app/models/responseLogin';
import { CategoryServices } from 'src/app/services/CategoryServices';
import { ProductServices } from 'src/app/services/ProductServices';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UserServices } from 'src/app/services/userServices';
@Component({
  selector: 'app-ajout-produit',
  templateUrl: './ajout-produit.component.html',
  styleUrls: ['./ajout-produit.component.css']
})
export class AjoutProduitComponent implements OnInit {
  marque;
  prix;
  description;
  nbre_piece;
  EmailVend;
  image;
  categories:CategoryResponse[];
  idCat;
  selectedfile:File;
  imagename;
  nomProduit;
  response:ResponseLogin;
  token;
  registerForm: FormGroup;
  submitted = false;
  categorie;
  role;
  constructor(private productServices:ProductServices,private userServices:UserServices,private formBuilder:FormBuilder,private categoryServices:CategoryServices,private route:Router) { }

  ngOnInit(): void {
    this.response=JSON.parse(localStorage.getItem('response'));
this.token=this.response.jwttoken;
this.role=this.response.autorities[0].authority;
this.categoryServices.displayCategories().subscribe(data=>this.categories=data);
//
let numberRegEx = /\-?\d*\.?\d{1,2}/;
if(this.response.autorities[0].authority=='Admin'){
this.registerForm = this.formBuilder.group({
  marque: ['', Validators.required],
  nomProduit:['',Validators.required],
  prix: ['', [Validators.required,Validators.pattern(numberRegEx)]],
  description: ['', [Validators.required]],
  nbre_piece: ['', [Validators.required,Validators.pattern(numberRegEx)]],
  email: ['', [Validators.required,Validators.email]],
  image:['',Validators.required],
  categorie:['',Validators.required],
},{
validator: [this.existeUser1('email')]
}
);
}else{
  this.registerForm = this.formBuilder.group({
    marque: ['', Validators.required],
    nomProduit:['',Validators.required],
    prix: ['', [Validators.required,Validators.pattern(numberRegEx)]],
    description: ['', [Validators.required]],
    nbre_piece: ['', [Validators.required,Validators.pattern(numberRegEx)]],
    image:['',Validators.required],
    categorie:['',Validators.required],
  }
  );
}
//

  }
  existeUser1(email:string){
    return(formGroup: FormGroup)=>{
     const control = formGroup.controls[email];
     if (control.errors && !control.errors.existeUser1) {
       // return if another validator has already found an error on the matchingControl
       return;
   }
   this.userServices.retrouveUserEmail(control.value).subscribe(data=>{console.log(data);
      if(data.role =='Vendeur'){
        console.log('null');control.setErrors(null);
      }
      else{
        console.log('true');control.setErrors({existeUser1:true})
      }
 });
 }
   }
    get f() { return this.registerForm.controls; }
  AjouterProduit(){
    this.submitted=true
    if(this.registerForm.invalid){
      return ;
    }
    const formData=new FormData();
    let emailV;
    if(this.response.autorities[0].authority=='Admin'){
     emailV=this.EmailVend;
    }
    else{
      emailV=this.response.username
    }
    const modelAjoutP=new ModelAjoutProduit(this.marque
      ,this.prix,this.description,this.image,this.nbre_piece,emailV
      ,this.idCat,this.nomProduit);
      formData.append('MAproduitt',JSON.stringify(modelAjoutP));
      formData.append('file',this.selectedfile);
   //console.log(this.idCat);
   this.productServices.ajouterProduit(formData,this.token).subscribe(data=>{console.log(data);this.route.navigateByUrl('contentProduit')});
  
}
  onSelectChanged(event){
    this.idCat=parseInt((<HTMLInputElement>event.target).value);
    console.log(this.idCat)
  }
  onFileChanged(event){
this.selectedfile=(<HTMLInputElement>event.target).files[0];
this.imagename=this.selectedfile.name;
console.log(this.imagename);
  }
}
