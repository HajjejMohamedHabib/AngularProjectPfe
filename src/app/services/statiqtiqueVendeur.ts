import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { CommandeItem } from "../models/commandeItem";
import { ModelVendeurPlusVentes } from "../models/vendeurPlusVentes";

const httpOptions={headers:new HttpHeaders({'content':'application/json'})}

@Injectable(
    {
        providedIn:'root'
    }
)
export class StatistiqueVendeurServices {
    private produitsPlusVentesUrl='http://localhost:3600/produitsPlusVendusVendeur/';
    private produitsPlusVendusMoisUrl="http://localhost:3600/produitsPlusVendusMois/"
    constructor(private http: HttpClient,private router:Router) {
       
    }
    produitsPlusVentes(token,id):Observable<CommandeItem[]>{
        let tokenstr='Bearer '+token;
        console.log(tokenstr);
        const headers=new HttpHeaders().set('Authorization',tokenstr)
       return this.http.get<CommandeItem[]>(this.produitsPlusVentesUrl+id,{headers});
    
    }
    produitsPlusVentesMois(token,id,mois):Observable<CommandeItem[]>{
        let tokenstr='Bearer '+token;
        console.log(tokenstr);
        const headers=new HttpHeaders().set('Authorization',tokenstr)
       return this.http.get<CommandeItem[]>(this.produitsPlusVendusMoisUrl+id+'/'+mois,{headers});
    
    }
    
}