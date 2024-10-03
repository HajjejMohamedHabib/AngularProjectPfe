import { Injectable } from "@angular/core";
import { Observable,Subject } from "rxjs";
@Injectable(
    {
        providedIn:'root'
    }
)
export class SharedServices {
    private subjet=new Subject<any>();
    private subjet2=new Subject<any>();
    private event:string=null;
    sendClickEvent(){
       this.subjet.next();
    }
    
    getClickEvent():Observable<any>{
       return this.subjet.asObservable();
    }
    sendSucces(){
        this.event='succes';
     }
    getSucces():string{
        return this.event;
     }
     sendClickEvent2(){
        this.subjet.next();
     }
     
     getClickEvent2():Observable<any>{
        return this.subjet.asObservable();
     }
}