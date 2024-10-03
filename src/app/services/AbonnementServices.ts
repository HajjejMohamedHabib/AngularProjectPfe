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
export class AbonnementServices {
    private ajouterAbonnementUrl='http://localhost:3600/ajouterAbonnement';
    private getAbonnementVendeurUrl='http://localhost:3600/retriveAbonnement/';
    private getAbonnementsUrl="http://localhost:3600/getAbonnements";
    constructor(private http: HttpClient) {
    }
   public getAbonnements():Observable<any>{
       return this.http.get<any>(this.getAbonnementsUrl);
   }
    public ajouterAbonnement(abonnement):Observable<any>{
      return this.http.post<any>(this.ajouterAbonnementUrl,abonnement);
    }
   public getAbonnementVendeur(idVend,token):Observable<any>{
    let tokenstr='Bearer '+token;
    console.log(tokenstr);
    const headers=new HttpHeaders().set('Authorization',tokenstr)
       return this.http.get<any>(this.getAbonnementVendeurUrl.concat(idVend),{headers})
   }

}