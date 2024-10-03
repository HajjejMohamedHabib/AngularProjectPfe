import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharedServices } from 'src/app/services/sharedServices';

@Component({
  selector: 'app-admin-template',
  templateUrl: './admin-template.component.html',
  styleUrls: ['./admin-template.component.css']
})
export class AdminTemplateComponent implements OnInit {
   etat='client';
  constructor(private sharedServices:SharedServices,private router:Router) {
   // this.sharedServices.getClickEvent6().subscribe(data=>window.location.reload());
   }
   
  ngOnInit(): void {
   
  }
initStorage(){
  localStorage.setItem('etat','client');
}
}
