import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { Commande } from "../models/Commande";
import { CommandeItem } from "../models/commandeItem";
import { ContactUs } from "../models/ContactUs";
import { ResponseContactUs } from "../models/responseContactUs";

const httpOptions={headers:new HttpHeaders({'content':'application/json'})}

@Injectable(
    {
        providedIn:'root'
    }
)
export class CommandeServices {
    private displayCommandeUrl='http://localhost:3600/dispalyCommande';
    private approveCommandeUrl='http://localhost:3600/approveCommande/';
    private ajouterCommandeUrl='http://localhost:3600/ajoutCommande';
    private displayCommandeItemUrl='http://localhost:3600/displayCommandeItem/';
    private ajouterCommandeItemUrl='http://localhost:3600/ajouterCommandeItem/';
    private displayCommandeParClientUrl='http://localhost:3600/getCommandesParClient/';
    constructor(private http: HttpClient,private router:Router) {
    }
    public getCommandes(token:any):Observable<Commande[]>{
         let tokenstr='Bearer '+token;
     console.log(tokenstr);
     const headers=new HttpHeaders().set('Authorization',tokenstr)
        return this.http.get<Commande[]>(this.displayCommandeUrl,{headers});
    }
    public ajouterCommande(token,commande):Observable<Commande>{
        let tokenstr='Bearer '+token;
        console.log(tokenstr);
        const headers=new HttpHeaders().set('Authorization',tokenstr)
      return this.http.post<Commande>(this.ajouterCommandeUrl,commande,{headers});
    }
    public aprroveCommande(id:any,token:any):Observable<Commande>{
        let tokenstr='Bearer '+token;
        console.log(tokenstr);
        const headers=new HttpHeaders().set('Authorization',tokenstr)
        return this.http.put<Commande>(this.approveCommandeUrl.concat(id),null,{headers});
    }
    public displayCommandeItem(idCom,token):Observable<CommandeItem[]>{
        let tokenstr='Bearer '+token;
        console.log(tokenstr);
        const headers=new HttpHeaders().set('Authorization',tokenstr)
        return this.http.get<CommandeItem[]>(this.displayCommandeItemUrl.concat(idCom),{headers})
    }
    public ajouterCommandeItem(commandeItem:CommandeItem,idCom,token):Observable<CommandeItem>{
        let tokenstr='Bearer '+token;
        console.log(tokenstr);
        const headers=new HttpHeaders().set('Authorization',tokenstr)
        return this.http.post<CommandeItem>(this.ajouterCommandeItemUrl.concat(idCom),commandeItem,{headers});
    }
    public getCommandesParClient(id,token:any):Observable<Commande[]>{
        let tokenstr='Bearer '+token;
    console.log(tokenstr);
    const headers=new HttpHeaders().set('Authorization',tokenstr)
       return this.http.get<Commande[]>(this.displayCommandeParClientUrl.concat(id),{headers});
   }
}