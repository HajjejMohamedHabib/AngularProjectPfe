import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CategoryServices } from 'src/app/services/CategoryServices';
import { UserServices } from 'src/app/services/userServices';

@Component({
  selector: 'app-client-footer',
  templateUrl: './client-footer.component.html',
  styleUrls: ['./client-footer.component.css']
})
export class ClientFooterComponent implements OnInit {
categories;
admin;
  constructor(private categorieServices:CategoryServices,private router:Router,private userServices:UserServices) { }

  ngOnInit(): void {
this.categorieServices.displayCategories().subscribe(data=>this.categories=data)
this.userServices.retrouveAdmin().subscribe(data=>this.admin=data)
  }
  afficheProductParCat(id){
  this.router.navigateByUrl('shop?categorie='+id);
  }
}
