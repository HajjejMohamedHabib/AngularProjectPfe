import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryResponse } from 'src/app/models/CategoryResponse';
import { ResponseLogin } from 'src/app/models/responseLogin';
import { CategoryServices } from 'src/app/services/CategoryServices';

@Component({
  selector: 'app-modif-categorie',
  templateUrl: './modif-categorie.component.html',
  styleUrls: ['./modif-categorie.component.css']
})
export class ModifCategorieComponent implements OnInit {
  registerForm:FormGroup;
  submitted=false;
id;
categorie:CategoryResponse;
response:ResponseLogin;
token;
  constructor(private categorieServices:CategoryServices,private formBuilder:FormBuilder,private router:ActivatedRoute,private route:Router) { }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      nom_categorie: ['', Validators.required],
  }
  );
    this.response=JSON.parse(localStorage.getItem('response'));
    this.token=this.response.jwttoken;
this.id=this.router.snapshot.paramMap.get('id');
console.log(this.id);
this.categorieServices.retrouveCat(this.id,this.token).subscribe(data=>this.categorie=data);
  }
  get f() { return this.registerForm.controls; }
  ModifierCategorie(){
    this.submitted=true
    if(this.registerForm.invalid){
      return;
    }
  this.categorieServices.updateCat(this.categorie,this.id,this.token).subscribe(data=>{
  this.route.navigateByUrl('contentCategorie');});
  }
}
