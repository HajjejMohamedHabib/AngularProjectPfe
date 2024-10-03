import { Injectable } from "@angular/core";
import { Observable,Subject } from "rxjs";
@Injectable(
    {
        providedIn:'root'
    }
)
export class SharedServicesPannier {
    private subjet=new Subject<any>();
    sendClickEvent(){
       this.subjet.next();
    }
    getClickEvent():Observable<any>{
       return this.subjet.asObservable();
    }
}