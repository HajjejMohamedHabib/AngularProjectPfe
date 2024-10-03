import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { CategoryResponse } from "../models/CategoryResponse";
import { CleForgotPassword } from "../models/CleForgotPassword";
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
export class CleForgotPasswordServices {
    private ajouterCleForgotPasswordUrl="http://localhost:3600/ajouterCleForgotPassword";
    private getCleForgotPasswordUrl="http://localhost:3600/getCleForgotPassword/";
    constructor(private http: HttpClient) {
    }
public ajouterCleForgotPassword(CleForgotPassword):Observable<CleForgotPassword>{
return this.http.post<CleForgotPassword>(this.ajouterCleForgotPasswordUrl,CleForgotPassword);
}
public getCleForgotPassword(id):Observable<CleForgotPassword>{
    return this.http.get<CleForgotPassword>(this.getCleForgotPasswordUrl.concat(id));
}
}