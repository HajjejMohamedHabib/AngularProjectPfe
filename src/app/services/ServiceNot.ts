// import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import{Notification} from "src/app/models/Notification"
import {map} from "rxjs/operators"
import { HttpClient, HttpHeaders } from "@angular/common/http";
@Injectable(
    {
        providedIn:'root'
    }
)
export class ServiceNot {
   
    private ajoutUrl="http://localhost:3600/ajouterNotification";
    private getUrl="http://localhost:3600/getNotification";
    constructor(private http: HttpClient) {
    }
    public ajouter(token):Observable<string>{
      let tokenstr='Bearer '+token;
      console.log(tokenstr);
      const headers=new HttpHeaders().set('Authorization',tokenstr)
      return  this.http.post<string>(this.ajoutUrl,null,{headers});
    }
    public getNotif(token:any):Observable<Notification[]>{
      let tokenstr='Bearer '+token;
    console.log(tokenstr);
    const headers=new HttpHeaders().set('Authorization',tokenstr)
        return  this.http.get<Notification[]>(this.getUrl,{headers}).pipe(map(data=>{return data}));
      }
}