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
    private subjet3=new Subject<any>();
    private subjet4=new Subject<any>();
    private subjet5=new Subject<any>();
    private subjet6=new Subject<any>();
    private event:string=null;
    private event2:string=null;
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
     sendSucces2(){
        this.event2='succes';
     }
    getSucces2():string{
        return this.event2;
     }
     sendClickEvent2(){
        this.subjet2.next();
     }
     
     getClickEvent2():Observable<any>{
        return this.subjet2.asObservable();
     }
     sendClickEvent3(){
        this.subjet3.next();
     }
     
     getClickEvent3():Observable<any>{
        return this.subjet3.asObservable();
     }
     sendClickEvent4(){
        this.subjet4.next();
     }
     
     getClickEvent4():Observable<any>{
        return this.subjet4.asObservable();
     }
     sendClickEvent5(){
        this.subjet5.next();
     }
     
     getClickEvent5():Observable<any>{
        return this.subjet5.asObservable();
     }
     sendClickEvent6(){
        this.subjet6.next();
     }
     
     getClickEvent6():Observable<any>{
        return this.subjet6.asObservable();
     }
}