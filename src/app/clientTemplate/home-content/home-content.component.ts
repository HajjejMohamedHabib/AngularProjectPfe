import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommandeItem } from 'src/app/models/commandeItem';
import { Favoris } from 'src/app/models/Favoris';
import { Pannier_Produit } from 'src/app/models/pannier';
import { ProductResponse } from 'src/app/models/ProductResponse';
import { ResponseLogin } from 'src/app/models/responseLogin';
import { CommandeServices } from 'src/app/services/commandeservices';
import { FavorisServices } from 'src/app/services/favorisServices';
import { PannierServices } from 'src/app/services/Pannier';
import { ProductServices } from 'src/app/services/ProductServices';
import { SharedServices } from 'src/app/services/sharedServices';
import { SharedServicesPannier } from 'src/app/services/sharedServicesPannier';
import {PannierProductResponse} from 'src/app/models/pannierProductResponse';
import { AbonnementServices } from 'src/app/services/AbonnementServices';
import { InteractionServices } from 'src/app/services/interactionServices';
import { ProductResponseEtoile } from 'src/app/models/ProductResponseEtoile';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-home-content',
  templateUrl: './home-content.component.html',
  styleUrls: ['./home-content.component.css']
})
export class HomeContentComponent implements OnInit {
   response:ResponseLogin=null;
   token;
  products:ProductResponse[];
  productsEtoile:Array<ProductResponseEtoile>=[]
  productsPannier:Array<PannierProductResponse>=[];
  produits:Array<ProductResponse>=[];
  constructor(private productServices:ProductServices
    ,private favorisServices:FavorisServices,private interactionServices:InteractionServices
    ,private route:Router,private sharedServices:SharedServices,
    private sharedPannier:SharedServicesPannier,private abonnementServices:AbonnementServices,private pannierServices:PannierServices) {
    //   let response:ResponseLogin=JSON.parse(localStorage.getItem('response'));
    //   let token =response.jwttoken
    //   this.sharedPannier.getClickEvent().subscribe(data=>{if(localStorage.getItem('pannier')!=null){
    //     for(let p of JSON.parse(localStorage.getItem('pannier')))
    //     {
    //       this.pannierServices.ajouterPannier(token,new Pannier_Produit(p.id,response.id))
    //    .subscribe(data=>console.log(data));
    //  }}});
     }

  ngOnInit(): void {
    window.scroll(0,0);
    this.productServices.displayListProdPlusVendus().subscribe(data=>{
      for(let d of data){
        this.abonnementServices.getAbonnements().subscribe(data1=>{
          for(let d1 of data1){
            console.log(d1.vendeur);
            console.log(d.idVend);
            let dateFin=new Date(d1.dateFinAbonnement);
            if(((d1.vendeur==d.idVend && dateFin.getTime()>=new Date().getTime())|| d.idVend==2) && this.produits.indexOf(d)==-1){
              console.log('idvend'+d.idVend);
              this.produits.push(d);
              
              this.interactionServices.getInteractionByProduit(d.id).subscribe(inter=>{
                if(inter===null){
                  this.productsEtoile.push(new ProductResponseEtoile(d.id,d.marque,d.prix,d.description,d.image,
                    d.nbre_piece,d.nom_vendeur,d.nom_category,d.idVend,d.cat,d.nomProduit,0));
                }else
                {
                  let nbreEtoile:number=0;
                  let size=inter.length;
                  for(let i of inter){
                    nbreEtoile=nbreEtoile+i.nbreEtoile;
                  }
                  if(nbreEtoile!=0){
                  this.productsEtoile.push(new ProductResponseEtoile(d.id,d.marque,d.prix,d.description,d.image,
                    d.nbre_piece,d.nom_vendeur,d.nom_category,d.idVend,d.cat,d.nomProduit,Math.trunc(nbreEtoile/size)));
                }
                else{
                  this.productsEtoile.push(new ProductResponseEtoile(d.id,d.marque,d.prix,d.description,d.image,
                    d.nbre_piece,d.nom_vendeur,d.nom_category,d.idVend,d.cat,d.nomProduit,0));
                }
              }
      
              })
            }
          }
        });
      }

      this.products=this.produits;
      console.log(this.productsEtoile);
      console.log(this.products)});
    //////////////////////////
    //////////////////////////
    if(localStorage.getItem('response')!=null){
    this.response=JSON.parse(localStorage.getItem('response'));
    this.token=this.response.jwttoken;}
    if(localStorage.getItem('pannier')!=null){
      for(let p of JSON.parse(localStorage.getItem('pannier'))){
      this.productsPannier.push(p);
    }}
  }
  ajoutFavoris(idProduit:any){
     this.response=JSON.parse(localStorage.getItem('response'));
     if(this.response!=null){
     this.token=this.response.jwttoken;
     let idClient=this.response.id;
     this.favorisServices.ajouterFavoris
     (new Favoris(null,"",null,null,null,null,null,null),this.token,idClient,idProduit).subscribe(data=>{
      Swal.fire(
        'product added to wishList!',
        'succes!',
        'success'
      )    
    });
     }
     else{
       this.route.navigateByUrl('login');
     }
    }
    ajouterPannier(product:ProductResponse){
      if(product.nbre_piece==0){
        Swal.fire(
          'NOT AVAILABLE IN STOCK!',
          'oops!',
          'error'
        )
        return;
      }
      let productPannier:PannierProductResponse;
      let existe:boolean=false;
      productPannier=new PannierProductResponse(product.id,product.marque,product.prix,1
        ,product.description,product.image,product.nbre_piece
        ,product.nom_vendeur,product.nom_category,product.idVend,product.cat,product.nomProduit);
         //tester l'existence de produit dans le pannier
        let pannierPR:PannierProductResponse[]; 
        if(localStorage.getItem('pannier')!=null){
          pannierPR=JSON.parse(localStorage.getItem('pannier')) ;
        for(let p of pannierPR){
          if(p.id==product.id){
            existe=true;}
          }
        }
        //fin de test d'existence de produit dans le pannier
        if(existe==false){
        this.productsPannier.push(productPannier);
      localStorage.setItem('pannier',JSON.stringify(this.productsPannier));}
        else{
         let pannier:PannierProductResponse[]=JSON.parse(localStorage.getItem('pannier'));
         console.log(pannier);
          for(let p of pannier){
            if(p.id==product.id){
            p.quantite=p.quantite+1;  
            }
            }
            localStorage.setItem('pannier',JSON.stringify(pannier));
          }
      if(localStorage.getItem('response')!=null){
       let response:ResponseLogin=JSON.parse(localStorage.getItem('response'));
       //let pannier:ProductResponse[]=JSON.parse(localStorage.getItem('pannier'));
       let token=response.jwttoken;
        if(existe==false){
        this.pannierServices.ajouterPannier(token,new Pannier_Produit(product.id,response.id))
        .subscribe(data=>{console.log(data);
        });
        }else {
        let pan=JSON.parse(localStorage.getItem('pannier'));
        console.log(pan);
         for(let p of pan){
           if(p.id==product.id){
             console.log('egal');
             p.quantite=p.quantite+1; 
             this.pannierServices.getPannier(this.response.id,this.token).subscribe((data:Pannier_Produit[])=>{
               for(let pp of data){
                 if(pp.id==product.id)
                 {
                   this.pannierServices.updateQuantitePlus(this.token,pp.idPannierProduit).subscribe(data=>console.log(data));
                 }
               }
             }); 
             localStorage.setItem('pannier',JSON.stringify(pan));
             console.log(pan);
           }
           }
           
         }
    
    }
    this.sharedServices.sendClickEvent(); 
    Swal.fire(
      'product added to card!',
      'succes!',
      'success'
    )    
    }
    afficheProductParCat(id){
      this.route.navigateByUrl('shop?categorie='+id);
    }
}
