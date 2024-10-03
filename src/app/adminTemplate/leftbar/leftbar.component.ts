import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ResponseLogin } from 'src/app/models/responseLogin';
import { ProductServices } from 'src/app/services/ProductServices';

@Component({
  selector: 'app-leftbar',
  templateUrl: './leftbar.component.html',
  styleUrls: ['./leftbar.component.css']
})
export class LeftbarComponent implements OnInit {
image:any;
response:ResponseLogin;
role;
  constructor(private route:Router,private productServices:ProductServices) { }

  ngOnInit(): void {
    this.response=JSON.parse(localStorage.getItem('response'))
    this.role=this.response.autorities[0].authority;
  }
  reloadPage(){
    window.location.reload();
  }
  displayComptes(){
    this.route.navigateByUrl('content');
  }
  displayCategories(){
    this.route.navigateByUrl('contentCategorie');
  }
  displayProducts(){
    this.route.navigateByUrl('contentProduit');
  }
  logout(){
    localStorage.removeItem('response');
    localStorage.removeItem('etatadmin');
    window.location.reload();
  }
  detailAdmin(){
    this.route.navigateByUrl('detailAccountAdmin');
  }
}
