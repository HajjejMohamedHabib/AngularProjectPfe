// import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import{Notification} from "src/app/models/Notification"
import {map} from "rxjs/operators"
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Favoris } from "../models/Favoris";
import { Pannier_Produit } from "../models/pannier";
@Injectable(
    {
        providedIn:'root'
    }
)
export class PannierServices {
   
    private ajoutPannierUrl="http://localhost:3600/ajouterPannier";
    private getPannierUrl="http://localhost:3600/getPannier/";
    private deleteItemPannierUrl="http://localhost:3600/deletePannierItem/";
    private updateQuantitePlusUrl="http://localhost:3600/updateQuantitePlus/";
    private updateQuantiteMoinsUrl="http://localhost:3600/updateQuantiteMoins/";
    constructor(private http: HttpClient) {
    }
    public ajouterPannier(token:any,pp:Pannier_Produit):Observable<Pannier_Produit>{
          let tokenstr='Bearer '+token;
          console.log(tokenstr);
          const headers=new HttpHeaders().set('Authorization',tokenstr);
    return this.http.post<Pannier_Produit>(this.ajoutPannierUrl,pp,{headers});
    }
    public getPannier(idClient:any,token):Observable<Pannier_Produit[]>{
        let tokenstr='Bearer '+token;
          console.log(tokenstr);
          const headers=new HttpHeaders().set('Authorization',tokenstr);
        return this.http.get<Pannier_Produit[]>(this.getPannierUrl.concat(idClient),{headers});
    }
    public deletePannierItem(token:any,id:any):Observable<string>{
        let tokenstr='Bearer '+token;
          console.log(tokenstr);
          const headers=new HttpHeaders().set('Authorization',tokenstr);
          return this.http.delete<string>(this.deleteItemPannierUrl.concat(id),{headers});
    }
    public updateQuantitePlus(token,id):Observable<string>{
        let tokenstr='Bearer '+token;
          console.log(tokenstr);
          const headers=new HttpHeaders().set('Authorization',tokenstr);
        return this.http.put<string>(this.updateQuantitePlusUrl.concat(id),null,{headers});
    }
    public updateQuantiteMoins(token,id):Observable<string>{
        let tokenstr='Bearer '+token;
          console.log(tokenstr);
          const headers=new HttpHeaders().set('Authorization',tokenstr);
        return this.http.put<string>(this.updateQuantiteMoinsUrl.concat(id),null,{headers});
    }
}