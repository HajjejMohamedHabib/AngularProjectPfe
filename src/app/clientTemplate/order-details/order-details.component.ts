import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommandeItem } from 'src/app/models/commandeItem';
import { Interaction } from 'src/app/models/Interaction';
import { ResponseLogin } from 'src/app/models/responseLogin';
import { CommandeServices } from 'src/app/services/commandeservices';
import { InteractionServices } from 'src/app/services/interactionServices';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent implements OnInit {
idCom;
commandeItems:CommandeItem[];
response:ResponseLogin;
token;
  constructor(private route:ActivatedRoute,private interactionServices:InteractionServices,private commandeServ:CommandeServices) { }

  ngOnInit(): void {
    this.idCom=this.route.snapshot.paramMap.get('id');
    console.log(this.idCom);
    this.response=JSON.parse(localStorage.getItem('response'));
    this.token=this.response.jwttoken;
    this.commandeServ.displayCommandeItem(this.idCom,this.token).subscribe(data=>{this.commandeItems=data,console.log(data)});
  }
  saveEtoiles(nbre,id){
  this.interactionServices.ajouterInteraction(new Interaction(this.response.id,id,nbre,new Date()),this.token).subscribe(
    data=>{
      console.log(data);
    }
  )
  }
}
