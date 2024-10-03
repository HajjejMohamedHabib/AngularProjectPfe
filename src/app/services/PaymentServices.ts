import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
@Injectable(
    {
        providedIn:'root'
    }
)
export class PaymentServices {
    private paymentUrl="http://localhost:3600/payment";
    private paymentAbonnementUrl="http://localhost:3600/paymentAbonnement";
    private ajoutPaiementUrl="http://localhost:3600/ajouterPaiement/";
    constructor(private http: HttpClient,private router:Router) {
    }

payment(token,payment):Observable<string>{
    let tokenstr='Bearer '+token;
    console.log(tokenstr);
    const headers=new HttpHeaders().set('Authorization',tokenstr)
    return this.http.post<string>(this.paymentUrl,payment,{headers});
}
paymentAbonnement(payment):Observable<string>{
   
    return this.http.post<string>(this.paymentAbonnementUrl,payment);
}
ajoutPaiement(idCom,token):Observable<any>{
    let tokenstr='Bearer '+token;
    console.log(tokenstr);
    const headers=new HttpHeaders().set('Authorization',tokenstr)
    return this.http.post<any>(this.ajoutPaiementUrl.concat(idCom),null,{headers})
}
}