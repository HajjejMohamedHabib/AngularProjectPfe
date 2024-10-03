import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommandeItem } from 'src/app/models/commandeItem';
import { ResponseLogin } from 'src/app/models/responseLogin';
import { CommandeServices } from 'src/app/services/commandeservices';

@Component({
  selector: 'app-detail-commande',
  templateUrl: './detail-commande.component.html',
  styleUrls: ['./detail-commande.component.css']
})
export class DetailCommandeComponent implements OnInit {
idCom;
searchInput;
commandeItems:CommandeItem[];
  constructor(private route:ActivatedRoute,private commandeServ:CommandeServices) { }

  ngOnInit(): void {
    this.idCom=this.route.snapshot.paramMap.get('id');
    console.log(this.idCom);
    let response:ResponseLogin=JSON.parse(localStorage.getItem('response'));
    let token=response.jwttoken;
    this.commandeServ.displayCommandeItem(this.idCom,token).subscribe(data=>{this.commandeItems=data,console.log(data)});

  }

}
