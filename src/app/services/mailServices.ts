import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { ContactUs } from "../models/ContactUs";
const httpOptions={headers:new HttpHeaders({'content':'application/json'})}

@Injectable(
    {
        providedIn:'root'
    }
)
export class MailServices {
    private ajouterMailUrl='http://localhost:3600/send-mail/';
    constructor(private http: HttpClient) {
    }
    public ajouterMail(formData:FormData,email):Observable<string>{
        return this.http.post<string>(this.ajouterMailUrl+email,formData);
    }
}