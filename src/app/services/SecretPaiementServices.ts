import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { CategoryResponse } from "../models/CategoryResponse";
import { ModelAjoutProduit } from "../models/ModelAjoutProduit";
import { ProductRequest } from "../models/ProductRequest";
import { ProductResponse } from "../models/ProductResponse";
import { ResponseLogin } from "../models/responseLogin";
import { SecretPaiement } from "../models/SecretPaiement";

const httpOptions={headers:new HttpHeaders({'content':'application/json','responseType':'blob'})}

@Injectable(
    {
        providedIn:'root'
    }
)
export class SecretPaiementServices {
    private ajouterSecretPaiementUrl="http://localhost:3600/ajouterSecretPaiement";
    private retriveSecretPaiementUrl="http://localhost:3600/retriveSecretPaiement/";
    private retriveSecretPaiementCleUrl="http://localhost:3600/retriveSecretPaiementCle/";
    constructor(private http: HttpClient) {
    }
public ajouterSecretPaiement(secPaiement):Observable<SecretPaiement>{
return this.http.post<SecretPaiement>(this.ajouterSecretPaiementUrl,secPaiement);
}
public retriveSecretPaiement(email):Observable<SecretPaiement>{
    return this.http.get<SecretPaiement>(this.retriveSecretPaiementUrl.concat(email));
}
public retriveSecretPaiementCle(email,cle):Observable<SecretPaiement>{
    return this.http.get<SecretPaiement>(this.retriveSecretPaiementCleUrl.concat(email).concat('/').concat(cle));
}
}