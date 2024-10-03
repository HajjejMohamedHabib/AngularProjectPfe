import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { CategoryRequest } from "../models/CategoryRequest";
import { CategoryResponse } from "../models/CategoryResponse";

const httpOptions={headers:new HttpHeaders({'content':'application/json'})}

@Injectable(
    {
        providedIn:'root'
    }
)
export class CategoryServices {
    private displayCatUrl='http://localhost:3600/displayCat';
    private ajouterCategorieUrl='http://localhost:3600/addCat';
    private deleteCatUrl="http://localhost:3600/deleteCat/";
    private retrouveCatUrl="http://localhost:3600/retrouveCat/";
    private updateCatUrl="http://localhost:3600/modifCat/";
    private paymentUrl="http://localhost:3600/payment";
    private displayCatParVendeurUrl='http://localhost:3600/displayCatParVendeur/';
    constructor(private http: HttpClient,private router:Router) {
    }
displayCategories():Observable<CategoryResponse[]>{
    return this.http.get<CategoryResponse[]>(this.displayCatUrl);
} 
ajouterCategorie(cat:CategoryRequest,token):Observable<CategoryResponse>{
    let tokenstr='Bearer '+token;
    console.log(tokenstr);
    const headers=new HttpHeaders().set('Authorization',tokenstr)
    return this.http.post<CategoryResponse>(this.ajouterCategorieUrl,cat,{headers});
}   
deleteCategorie(id:any,token):Observable<string>{
    let tokenstr='Bearer '+token;
    console.log(tokenstr);
    const headers=new HttpHeaders().set('Authorization',tokenstr)
    return this.http.delete<string>(this.deleteCatUrl.concat(id),{headers});
}
retrouveCat(id:any,token):Observable<CategoryResponse>{
    let tokenstr='Bearer '+token;
    console.log(tokenstr);
    const headers=new HttpHeaders().set('Authorization',tokenstr)
    return this.http.get<CategoryResponse>(this.retrouveCatUrl.concat(id),{headers});
}
updateCat(categorie:CategoryRequest,id:any,token):Observable<CategoryResponse>{
    let tokenstr='Bearer '+token;
    console.log(tokenstr);
    const headers=new HttpHeaders().set('Authorization',tokenstr)
    return this.http.put<CategoryResponse>(this.updateCatUrl.concat(id),categorie,{headers});
}
displayCategoriesParVendeur(idVend,token):Observable<CategoryResponse[]>{
    let tokenstr='Bearer '+token;
    console.log(tokenstr);
    const headers=new HttpHeaders().set('Authorization',tokenstr)
    return this.http.get<CategoryResponse[]>(this.displayCatParVendeurUrl.concat(idVend),{headers});
} 
}