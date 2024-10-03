import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { ResponseUser } from "../models/response";
import { User } from "../models/user";

const httpOptions={headers:new HttpHeaders({'content':'application/json'})}

@Injectable(
    {
        providedIn:'root'
    }
)
export class UserServices {
    private ajoutUrl='http://localhost:3600/ajouter';
    private testUrl='http://localhost:3600/ajouter';
    private displayUrl='http://localhost:3600/displayUser';
    private updateUrl='http://localhost:3600/modifUser/';
    private retrouveUrl="http://localhost:3600/retrouveUser/";
    private bannirUrl="http://localhost:3600/bannirUser/";
    private activerUrl="http://localhost:3600/activerUser/";
    private deleteUrl="http://localhost:3600/deleteUser/";
    private retriveUserEmailUrl="http://localhost:3600/retrouveUserEmail/";
    private initPasswordUrl="http://localhost:3600/initPassword/";
    private getAdminUrl="http://localhost:3600/retrouveAdmin"
    constructor(private http: HttpClient,private router:Router) {
       
    }
    test():Observable<string>{
        return this.http.post<string>(this.testUrl,'');
    }
    ajouterUser(formData:FormData):Observable<any>{
       return this.http.post<any>(this.ajoutUrl,formData);
    
    }
    displayUser(token):Observable<ResponseUser[]>{
        let tokenstr='Bearer '+token;
        const headers=new HttpHeaders().set('Authorization',tokenstr)
      return this.http.get<ResponseUser[]>(this.displayUrl,{headers});
    }
    updateUser(id:any,user:User):Observable<ResponseUser>
    {
    return  this.http.put<ResponseUser>(this.updateUrl.concat(id),user);

    }
    updateClient(id:any,formData:FormData,token):Observable<User>
    {
        let tokenstr='Bearer '+token;
        console.log(formData.get('user'));
        const headers=new HttpHeaders().set('Authorization',tokenstr)
    return this.http.put<User>(this.updateUrl.concat(id),formData,{headers});

    }
    retrouveUser(id:any,token:any):Observable<ResponseUser>
    {
        let tokenstr='Bearer '+token;
    console.log(tokenstr);
    const headers=new HttpHeaders().set('Authorization',tokenstr)
        console.log(this.retrouveUrl.concat(id));
        return this.http.get<ResponseUser>(this.retrouveUrl.concat(id),{headers});
    }
    retrouveAdmin():Observable<ResponseUser>
    {
        
        return this.http.get<ResponseUser>(this.getAdminUrl);
    }
    retrouveUserEmail(email:any):Observable<any>
    {
        return this.http.get<any>(this.retriveUserEmailUrl.concat(email));
    }
    bannirUser(id:any,token):Observable<ResponseUser>{
        let tokenstr='Bearer '+token;
    console.log(tokenstr);
    const headers=new HttpHeaders().set('Authorization',tokenstr)
        console.log(this.retrouveUrl.concat(id));
       return  this.http.put<ResponseUser>(this.bannirUrl.concat(id),null,{headers});
    }
    activerUser(id:any,token):Observable<ResponseUser>{
        let tokenstr='Bearer '+token;
        console.log(tokenstr);
        const headers=new HttpHeaders().set('Authorization',tokenstr)
            console.log(this.retrouveUrl.concat(id));
        return  this.http.put<ResponseUser>(this.activerUrl.concat(id),null,{headers});
     }
     deleteUser(id:any):Observable<string>{
        return this.http.delete<string>(this.deleteUrl.concat(id));
     }
     initPassword(email,formData:FormData):Observable<string>{
         return this.http.put<string>(this.initPasswordUrl+email,formData);
     }
    
}