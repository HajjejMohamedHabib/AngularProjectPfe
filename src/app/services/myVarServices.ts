import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";

@Injectable({providedIn: 'root'})
export class MyVarService {
  private myVar$ = new BehaviorSubject<any>(null);
  myVar: Observable<any> = this.myVar$.asObservable();

  private myVar2$ = new BehaviorSubject<any>(null);
  myVar2: Observable<any> = this.myVar2$.asObservable();

  setMyVar(newValue: any) {
    this.myVar$.next(newValue);
  }
  setMyVar2(newValue: any) {
    this.myVar2$.next(newValue);
  }
}