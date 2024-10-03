import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Commande } from 'src/app/models/Commande';
import { ResponseLogin } from 'src/app/models/responseLogin';
import { CommandeServices } from 'src/app/services/commandeservices';

@Component({
  selector: 'app-liste-commande',
  templateUrl: './liste-commande.component.html',
  styleUrls: ['./liste-commande.component.css']
})
export class ListeCommandeComponent implements OnInit {
  listCommande:Commande[];
  searchInput;
  constructor(private commandeServ:CommandeServices,private route:Router) { }

  ngOnInit(): void {
    this.displayCommande()
  }
  displayCommande(){
    let response:ResponseLogin=JSON.parse(localStorage.getItem('response'));
    let token=response.jwttoken;
    this.commandeServ.getCommandes(token).subscribe(data=>{this.listCommande=data,console.log(data)});
  }
  activer(id:any){
    let response:ResponseLogin=JSON.parse(localStorage.getItem('response'));
    let token=response.jwttoken;
    this.commandeServ.aprroveCommande(id,token).subscribe(data=>{console.log(data);
    this.ngOnInit();
    },error=>{
      if(error.status==200){
        this.ngOnInit();
      }
    });
    this.displayCommande();
  }
  detailCommande(id:any){
    this.route.navigateByUrl('listeCommandes/detail/'.concat(id));
  }
}
