import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Commande } from 'src/app/models/Commande';
import { ResponseLogin } from 'src/app/models/responseLogin';
import { CommandeServices } from 'src/app/services/commandeservices';

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.css']
})
export class OrderHistoryComponent implements OnInit {
  response:ResponseLogin;
  token;
  listCommande:Commande[];
  constructor(private commandeServices:CommandeServices,private router:Router) { }

  ngOnInit(): void {
    this.response=JSON.parse(localStorage.getItem('response'));
  this.commandeServices.getCommandesParClient(this.response.id,this.response.jwttoken).subscribe(data=>this.listCommande=data);
  }
  detailCommande(id){
    this.router.navigateByUrl('orderHistory/orderDetails/'+id);
  }
}
