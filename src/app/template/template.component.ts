import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ResponseLogin } from '../models/responseLogin';
import { MyVarService } from '../services/myVarServices';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.css']
})
export class TemplateComponent implements OnInit,OnDestroy {
 etatadmin;
 response:ResponseLogin;
 role;
 myVar: any;
 destroyer$: Subject<void> = new Subject();
 myVar2: any;
 destroyer2$: Subject<void> = new Subject();
  constructor(private myVarServices:MyVarService,private router:Router) { }

  ngOnInit(): void {
    this.myVarServices.myVar2.pipe(takeUntil(this.destroyer2$)).subscribe(myVar2 =>{ this.myVar2 = myVar2;console.log(myVar2)
    this.myVarServices.myVar.pipe(takeUntil(this.destroyer$)).subscribe(myVar =>{ this.myVar = myVar;console.log(myVar)
    
     if(this.myVar2==true && this.myVar=='Admin'){
       this.etatadmin=true;
       this.router.navigateByUrl('dashboard');
       //this.router.navigateByUrl('dashboard');
     }
     else{
       this.etatadmin=false;
     }});
    });
    this.response=JSON.parse(localStorage.getItem('response'));
//     this.role=this.response.autorities[0].authority;
//  console.log(this.role);
    if(localStorage.getItem('etatadmin')=='true' && (this.response.autorities[0].authority=='Admin' || this.response.autorities[0].authority=='Vendeur')){
      this.etatadmin=true;
    }else{
      this.etatadmin=false
    }
    
  }
ngOnDestroy(){
  this.destroyer$.next();
  this.destroyer$.complete();
}
}
