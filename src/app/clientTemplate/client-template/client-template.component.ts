import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-client-template',
  templateUrl: './client-template.component.html',
  styleUrls: ['./client-template.component.css']
})
export class ClientTemplateComponent implements OnInit {
 etat=true;
 etatadmin;
  constructor(private router:Router) { }

  ngOnInit(): void {
    if(localStorage.getItem('etatadmin')=='true'){
      this.etatadmin=true;
    }else{
      this.etatadmin=false
    }

  }
  recupererEtat(event){
    this.etat=false
    console.log(this.etat)
  }
  recupererEtatAdmin(event){
this.etatadmin=true;
  } 
}
