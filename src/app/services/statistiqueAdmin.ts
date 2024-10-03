import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { CommandeItem } from "../models/commandeItem";
import { ResponseUser } from "../models/response";
import { User } from "../models/user";
import { ModelVendeurPlusVentes } from "../models/vendeurPlusVentes";

const httpOptions={headers:new HttpHeaders({'content':'application/json'})}

@Injectable(
    {
        providedIn:'root'
    }
)
export class StatistiqueAdminServices {
    private produitsPlusVentesUrl='http://localhost:3600/produitsPlusVendus';
    private prixTVUrl='http://localhost:3600/totalVendus';
    private prixTVMUrl='http://localhost:3600/totalVendus/';
    private vendeurPlusVentesUrl='http://localhost:3600/vendeurPlusVentes';
    private vendeurPlusVentesMoisUrl='http://localhost:3600/vendeurPlusVentesMois/';
    private produitsPlusVendusMoisUrl='http://localhost:3600/produitsPlusVendusMois/'
    constructor(private http: HttpClient,private router:Router) {
       
    }
    produitsPlusVentes(token):Observable<CommandeItem[]>{
        let tokenstr='Bearer '+token;
        console.log(tokenstr);
        const headers=new HttpHeaders().set('Authorization',tokenstr)
       return this.http.get<CommandeItem[]>(this.produitsPlusVentesUrl,{headers});
    
    }
    prixTV(token):Observable<number>{
        let tokenstr='Bearer '+token;
        console.log(tokenstr);
        const headers=new HttpHeaders().set('Authorization',tokenstr)
       return this.http.get<number>(this.prixTVUrl,{headers});
    
    }
    vendeurPlusVentes(token):Observable<ModelVendeurPlusVentes[]>{
        let tokenstr='Bearer '+token;
        console.log(tokenstr);
        const headers=new HttpHeaders().set('Authorization',tokenstr)
       return this.http.get<ModelVendeurPlusVentes[]>(this.vendeurPlusVentesUrl,{headers});
    
    }
    vendeurPlusVentesMois(token,mois):Observable<ModelVendeurPlusVentes[]>{
        let tokenstr='Bearer '+token;
        console.log(tokenstr);
        const headers=new HttpHeaders().set('Authorization',tokenstr)
       return this.http.get<ModelVendeurPlusVentes[]>(this.vendeurPlusVentesMoisUrl.concat(mois),{headers});
    
    }
    produitsPlusVentesMois(token,mois):Observable<CommandeItem[]>{
        let tokenstr='Bearer '+token;
        console.log(tokenstr);
        const headers=new HttpHeaders().set('Authorization',tokenstr)
       return this.http.get<CommandeItem[]>(this.produitsPlusVendusMoisUrl.concat(mois),{headers});
    
    }
    prixTVM(token,mois):Observable<number>{
        let tokenstr='Bearer '+token;
        console.log(tokenstr);
        const headers=new HttpHeaders().set('Authorization',tokenstr)
       return this.http.get<number>(this.prixTVMUrl.concat(mois),{headers});
    
    }
}