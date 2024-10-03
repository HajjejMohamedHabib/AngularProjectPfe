// import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Favoris } from "../models/Favoris";
import { Interaction } from "../models/Interaction";
@Injectable(
    {
        providedIn:'root'
    }
)
export class InteractionServices {
   
    private ajoutInteractionUrl="http://localhost:3600/ajouterInteraction";
    private getInteractionByProduitUrl="http://localhost:3600/getInteraction/";
    constructor(private http: HttpClient) {
    }
    public ajouterInteraction(interaction:Interaction,token:any):Observable<Interaction>{
          let tokenstr='Bearer '+token;
          console.log(tokenstr);
          const headers=new HttpHeaders().set('Authorization',tokenstr);
    return this.http.post<Interaction>(this.ajoutInteractionUrl,interaction,{headers});
    }
    public getInteractionByProduit(idProduit:any):Observable<Interaction[]>{
       
        return this.http.get<Interaction[]>(this.getInteractionByProduitUrl+idProduit);
    }
}