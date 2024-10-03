import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { CategoryResponse } from "../models/CategoryResponse";
import { ModelAjoutProduit } from "../models/ModelAjoutProduit";
import { ProductRequest } from "../models/ProductRequest";
import { ProductResponse } from "../models/ProductResponse";
import { ResponseLogin } from "../models/responseLogin";

const httpOptions={headers:new HttpHeaders({'content':'application/json','responseType':'blob'})}

@Injectable(
    {
        providedIn:'root'
    }
)
export class ProductServices {
    private displayPoductsCatUrl='http://localhost:3600/produitsSeuleCat/';
    private displayAllProductsUrl='http://localhost:3600/displayProduit/';
    private addProductUrl='http://localhost:3600/addProduit';
    private deleteProduitUrl="http://localhost:3600/deleteProduit/";
    private modifProduitUrl="http://localhost:3600/updateProduit/";
    private displayProductUrl="http://localhost:3600/retrouveProduit/";
    private retriveImageUrl="http://localhost:3600/retriveImage/";
    private displayProduitParMarqueUrl="http://localhost:3600/displayProduitParMarque/";
    private displayProduitParVendeurUrl="http://localhost:3600/displayProduitParVendeur/";
    private displayProduitParCatParVendeurUrl="http://localhost:3600/produitsParCatParVendeur/";
    private displayProduitsParCatUniqueUrl="http://localhost:3600/produitParCateg/";
    private displayListProdPlusVendusUrl="http://localhost:3600/listProduitsPlusVendus";
    constructor(private http: HttpClient,private router:Router) {
    }
displayProductCat(idCat:any):Observable<ProductResponse[]>{
    return this.http.get<ProductResponse[]>(this.displayPoductsCatUrl.concat(idCat));
} 
displayProductCatUnique(idCat:any):Observable<ProductResponse[]>{
    return this.http.get<ProductResponse[]>(this.displayProduitsParCatUniqueUrl.concat(idCat));
}  
displayAllProducts():Observable<ProductResponse[]>{
    return this.http.get<ProductResponse[]>(this.displayAllProductsUrl);
}  
displayListProdPlusVendus():Observable<ProductResponse[]>{
    return this.http.get<ProductResponse[]>(this.displayListProdPlusVendusUrl);
}  
ajouterProduit(formData:FormData,token):Observable<ProductResponse>{
     let tokenstr='Bearer '+token;
    console.log(tokenstr);
    const headers=new HttpHeaders().set('Authorization',tokenstr)
    return this.http.post<ProductResponse>(this.addProductUrl,formData,{headers});
}
deleteProduit(id:any,token):Observable<any>{
    let tokenstr='Bearer '+token;
    console.log(tokenstr);
    const headers=new HttpHeaders().set('Authorization',tokenstr)
return this.http.delete<any>(this.deleteProduitUrl.concat(id),{headers});
}
modifProduit(id:any,formData,token):Observable<ProductResponse>{
    let tokenstr='Bearer '+token;
    console.log(tokenstr);
    const headers=new HttpHeaders().set('Authorization',tokenstr)
return this.http.put<ProductResponse>(this.modifProduitUrl.concat(id),formData,{headers});
}
retrouveProduit(id:any):Observable<ProductResponse>
{
    return this.http.get<ProductResponse>(this.displayProductUrl.concat(id));
}
retriveImage(id:any,token){
    let tokenstr='Bearer '+token;
    console.log(tokenstr);
    const headers=new HttpHeaders().set('Authorization',tokenstr)
return this.http.get<any>(this.retriveImageUrl.concat(id),httpOptions);
}
displayProduitParMarque(marque:string):Observable<ProductResponse[]>{
    return this.http.get<ProductResponse[]>(this.displayProduitParMarqueUrl.concat(marque));
}
displayProduitParVendeur(idVend,token):Observable<ProductResponse[]>{
    let tokenstr='Bearer '+token;
    console.log(tokenstr);
    const headers=new HttpHeaders().set('Authorization',tokenstr)
    return this.http.get<ProductResponse[]>(this.displayProduitParVendeurUrl.concat(idVend),{headers});
}
displayProduitParCatParVendeur(idVend,idCat,token):Observable<ProductResponse[]>{
    let tokenstr='Bearer '+token;
    console.log(tokenstr);
    const headers=new HttpHeaders().set('Authorization',tokenstr)
    return this.http.get<ProductResponse[]>(this.displayProduitParCatParVendeurUrl.concat(idCat).concat('/').concat(idVend),{headers});
}
}