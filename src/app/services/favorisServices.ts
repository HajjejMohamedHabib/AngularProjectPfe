// import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import{Notification} from "src/app/models/Notification"
import {map} from "rxjs/operators"
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Favoris } from "../models/Favoris";
@Injectable(
    {
        providedIn:'root'
    }
)
export class FavorisServices {
   
    private ajoutFavorisUrl="http://localhost:3600/ajouterFavoris/";
    private getFavorisUrl="http://localhost:3600/dispalyFavoris/";
    private deleteFavorisUrl="http://localhost:3600/deleteFavoris/"
    constructor(private http: HttpClient) {
    }
    public ajouterFavoris(favoris:Favoris,token:any,idClient:any,idProduit:any):Observable<Favoris>{
          let tokenstr='Bearer '+token;
          console.log(tokenstr);
          const headers=new HttpHeaders().set('Authorization',tokenstr);
    return this.http.post<Favoris>(this.ajoutFavorisUrl.concat(idClient).concat("/").concat(idProduit),favoris,{headers});
    }
    public getFavoris(id:any,token):Observable<Favoris[]>{
        let tokenstr='Bearer '+token;
          console.log(tokenstr);
          const headers=new HttpHeaders().set('Authorization',tokenstr);
        return this.http.get<Favoris[]>(this.getFavorisUrl.concat(id),{headers});
    }
    public deleteFavoris(id:any,token):Observable<string>{
        let tokenstr='Bearer '+token;
          console.log(tokenstr);
          const headers=new HttpHeaders().set('Authorization',tokenstr);
        return this.http.delete<string>(this.deleteFavorisUrl.concat(id),{headers});
    }    
}