import { Component, OnInit, Output ,EventEmitter, Injectable} from '@angular/core';
import { Router } from '@angular/router';
import { ResponseLogin } from 'src/app/models/responseLogin';
import { ServiceNot } from 'src/app/services/ServiceNot';
import{Location} from '@angular/common'
import { SharedServices } from 'src/app/services/sharedServices';
import { PannierServices } from 'src/app/services/Pannier';
import { Pannier_Produit } from 'src/app/models/pannier';
import { SharedServicesPannier } from 'src/app/services/sharedServicesPannier';
import { CategoryServices } from 'src/app/services/CategoryServices';
import { ProductServices } from 'src/app/services/ProductServices';
import { ProductResponse } from 'src/app/models/ProductResponse';
import { AbonnementServices } from 'src/app/services/AbonnementServices';
@Component({
  selector: 'app-client-header',
  templateUrl: './client-header.component.html',
  styleUrls: ['./client-header.component.css']
})
export class ClientHeaderComponent implements OnInit {
@Output() display = new EventEmitter();
nom_categorie;
  response:ResponseLogin=null;
  categories;
  produits;
  ps:Array<ProductResponse>=[];
  produitsM;
  title = 'grokonez';
  description = 'Angular-WebSocket Demo';
  public notifications:Notification[]=[];
  greetings: string[] = [];
  disabled = true;
  name: string;
  private stompClient = null;
  first_name;
  last_name;
  nbreItemPannier:number;
  responseStr;
  constructor(private router:Router,private abonnementServices:AbonnementServices,private productServices:ProductServices,private authentifServ:ServiceNot,private categorieServices:CategoryServices,private location:Location,private sharedServices:SharedServices,private pannierServices:PannierServices) {
  this.sharedServices.getClickEvent().subscribe(data=>this.nbreItemPannier++);
  this.sharedServices.getClickEvent2().subscribe(data=>{this.decrement()});
  this.sharedServices.getClickEvent3().subscribe(data=>this.nbreItemPannier--);
  this.sharedServices.getClickEvent4().subscribe(data=>this.nbreItemPannier++);
  this.sharedServices.getClickEvent5().subscribe(data=>this.ngOnInit());
  }
  etat="true";
  nbreNotifs=0;
  ngOnInit(): void {
    this.first_name="";
    this.last_name="";
    this.nbreItemPannier=0;
    if(localStorage.getItem('response')==null){
    if(localStorage.getItem('pannier')!=null){
    for(let p of JSON.parse(localStorage.getItem('pannier'))){
      console.log(p.quantite);
      this.nbreItemPannier=this.nbreItemPannier+p.quantite;
    }
   
  }}
    else {
      this.response=JSON.parse(localStorage.getItem('response'))
      this.pannierServices.getPannier(this.response.id,this.response.jwttoken).subscribe(
        data=>{
            for(let p of data ){
              this.nbreItemPannier=this.nbreItemPannier+p.quantite;
            }
          
        }
      );
    }
    this.responseStr=localStorage.getItem('response');
    if(localStorage.getItem('response')!=null){
    this.response=JSON.parse(localStorage.getItem('response'));
    this.first_name=this.response.first_name;
    this.last_name=this.response.last_name;}
    this.categorieServices.displayCategories().subscribe(data=>{this.categories=data
    });
  }
  delay(n){
    return new Promise(function(resolve){
        setTimeout(resolve,n*1000);
    });
}
  async decrement(){
    await this.delay(5);
    console.log('hello decrement');
    if(this.sharedServices.getSucces()=='succes'){
      if(localStorage.getItem('pannier')!=null){
        let pannier=JSON.parse(localStorage.getItem('pannier'));
        console.log(pannier);
         this.nbreItemPannier=0;
        for(let pa of pannier){
          this.nbreItemPannier=this.nbreItemPannier+pa.quantite;
        }
      }
    }
  }
  login(){
    this.etat="false";
    this.display.emit(this.etat);
    this.router.navigateByUrl('/login');
    }
    deconnexion(){
      let response:ResponseLogin=null;
     // localStorage.setItem('response',JSON.stringify(response));
     localStorage.removeItem('response');
    localStorage.removeItem('etatadmin');
    if(localStorage.getItem('pannier')!=null){
    localStorage.removeItem('pannier');}
    //localStorage.setItem('etatadmin',null);
     this.ngOnInit();
     this.router.navigateByUrl('');
    }
    orderhistory(){
      this.router.navigateByUrl('orderHistory');
    }
    afficheProduct(id){
      console.log(id);
     this.productServices.displayProductCatUnique(id).subscribe(data=>{this.produits=data
      console.log(data);
    });
   
    }
    afficheProductM(marque,cat){
      this.ps=[];
      let prods:Array<ProductResponse>=[];
      this.productServices.displayProductCat(cat).subscribe(data=>{
        for(let pcm of data){
          if(pcm.marque==marque){
            prods.push(pcm);
          }
         }
            //
            for(let d of prods){
              this.abonnementServices.getAbonnements().subscribe(data1=>{
                for(let d1 of data1){
                  let dateFin=new Date(d1.dateFinAbonnement);
                  if(((d1.vendeur==d.idVend && dateFin.getTime()>=new Date().getTime())|| d.idVend==2) && this.ps.indexOf(d)==-1){
                    console.log('idvend'+d.idVend);
                    this.ps.push(d);
                  }
                }
              });
            }
            //
         this.produitsM=this.ps;
      })
    }
    afficheProduitsParMarque(marque,id){
     this.router.navigateByUrl('shop?categorie='+id+'&marque='.concat(marque));
    }
    detailProduct(id){
      this.router.navigateByUrl('shop/detail/'+id);
    }
  }
