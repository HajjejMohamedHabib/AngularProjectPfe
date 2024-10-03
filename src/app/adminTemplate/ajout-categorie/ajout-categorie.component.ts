import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CategoryRequest } from 'src/app/models/CategoryRequest';
import { ResponseLogin } from 'src/app/models/responseLogin';
import { CategoryServices } from 'src/app/services/CategoryServices';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-ajout-categorie',
  templateUrl: './ajout-categorie.component.html',
  styleUrls: ['./ajout-categorie.component.css']
})
export class AjoutCategorieComponent implements OnInit {
  registerForm: FormGroup;
  submitted = false;
  nom_categorie;
  response:ResponseLogin;
  disabled = true;
  name: string;
  constructor(private categorieServices:CategoryServices,private route:Router,private formBuilder:FormBuilder) { }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      nom_categorie: ['', Validators.required],
  }
  );
  }
  get f() { return this.registerForm.controls; }
  AjouterCategorie(){
this.response=JSON.parse(localStorage.getItem('response'));
let token=this.response.jwttoken;
    this.submitted=true;
    if(this.registerForm.invalid){
      return ;
    }
    this.categorieServices.ajouterCategorie(new CategoryRequest(this.nom_categorie,null),token)
    .subscribe(data=>{console.log(data)
    this.route.navigateByUrl('contentCategorie')
    });
  }
}
