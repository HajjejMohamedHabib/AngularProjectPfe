import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { ContactUs } from "../models/ContactUs";
import { ResponseContactUs } from "../models/responseContactUs";

const httpOptions={headers:new HttpHeaders({'content':'application/json'})}

@Injectable(
    {
        providedIn:'root'
    }
)
export class ContactUsServices {
    private displayContactUrl='http://localhost:3600/getContact';
    private ajouterContactUrl='http://localhost:3600/ajoutContact';
    constructor(private http: HttpClient,private router:Router) {
    }
    public ajouterContact(contact:ContactUs):Observable<ContactUs>{
       
        return this.http.post<ContactUs>(this.ajouterContactUrl,contact);
    }
    public getContact(token:any):Observable<ResponseContactUs[]>{
         let tokenstr='Bearer '+token;
     console.log(tokenstr);
     const headers=new HttpHeaders().set('Authorization',tokenstr)
        return this.http.get<ResponseContactUs[]>(this.displayContactUrl,{headers});
    }
}