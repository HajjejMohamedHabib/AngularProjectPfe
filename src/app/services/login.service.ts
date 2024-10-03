import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import {RequestLogin} from 'src/app/models/requestLogin';
import {ResponseLogin} from 'src/app/models/responseLogin';
import {map} from "rxjs/operators"
import { Observable } from "rxjs";
const httpOptions={headers:new HttpHeaders({'content':'application/json'})}

@Injectable(
    {
        providedIn:'root'
    }
)
export class LoginService{
    private loginUrl='http://localhost:3600/authenticate';
    private testUrl='http://localhost:3600/test';
    constructor(private http: HttpClient,private router:Router) {
       
    }
  recupereData(request:RequestLogin):Observable<ResponseLogin>
  {
    return this.http.post<ResponseLogin>(this.loginUrl,request,httpOptions).pipe(map(data=>{return data}));
    
  }
  testData():Observable<string>{
    return this.http.post<string>(this.testUrl,null,httpOptions).pipe(map(data=>{return data}));
  }
    
}