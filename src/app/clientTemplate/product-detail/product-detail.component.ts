import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Pannier_Produit } from 'src/app/models/pannier';
import { PannierProductResponse } from 'src/app/models/pannierProductResponse';
import { ProductResponse } from 'src/app/models/ProductResponse';
import { ProductResponseEtoile } from 'src/app/models/ProductResponseEtoile';
import { ResponseLogin } from 'src/app/models/responseLogin';
import { Slider } from 'src/app/models/slider';
import { InteractionServices } from 'src/app/services/interactionServices';
import { PannierServices } from 'src/app/services/Pannier';
import { ProductServices } from 'src/app/services/ProductServices';
import { SharedServices } from 'src/app/services/sharedServices';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
id;
product:ProductResponse;
productEtoile:ProductResponseEtoile;
isShowingSlideshow :boolean=true;
response:ResponseLogin;
token;
productsPannier:Array<PannierProductResponse>=[];
imageObject = [
  {
    image: 'https://sanjayv.github.io/ng-image-slider/contents/assets/img/slider/5.jpg',
    thumbImage: 'https://sanjayv.github.io/ng-image-slider/contents/assets/img/slider/5.jpg',
    title: 'Hummingbirds are amazing creatures'
  },
  {
  image: 'https://sanjayv.github.io/ng-image-slider/contents/assets/img/slider/5.jpg',
  thumbImage: 'https://sanjayv.github.io/ng-image-slider/contents/assets/img/slider/5.jpg',
  title: 'Hummingbirds are amazing creatures'
}, {
  image: 'https://sanjayv.github.io/ng-image-slider/contents/assets/img/slider/9.jpg',
  thumbImage: 'https://sanjayv.github.io/ng-image-slider/contents/assets/img/slider/9.jpg'
}, {
  image: 'https://sanjayv.github.io/ng-image-slider/contents/assets/img/slider/4.jpg',
  thumbImage: 'https://sanjayv.github.io/ng-image-slider/contents/assets/img/slider/4.jpg',
  title: 'Example with title.'
},{
  image: 'https://sanjayv.github.io/ng-image-slider/contents/assets/img/slider/7.jpg',
  thumbImage: 'https://sanjayv.github.io/ng-image-slider/contents/assets/img/slider/7.jpg',
  title: 'Hummingbirds are amazing creatures'
}, {
  image: 'https://sanjayv.github.io/ng-image-slider/contents/assets/img/slider/1.jpg',
  thumbImage: 'https://sanjayv.github.io/ng-image-slider/contents/assets/img/slider/1.jpg'
}, {
  image: 'https://sanjayv.github.io/ng-image-slider/contents/assets/img/slider/2.jpg',
  thumbImage: 'https://sanjayv.github.io/ng-image-slider/contents/assets/img/slider/2.jpg',
  title: 'Example two with title.'
}];
products:ProductResponse[];
images:Array<Slider>=[];
imageObj:Slider;
  constructor(private route:ActivatedRoute,private interactionServices:InteractionServices,private pannierServices:PannierServices,private sharedServices:SharedServices,private location:Location,private productServices:ProductServices) { }

  ngOnInit(): void {
    this.id=this.route.snapshot.paramMap.get('id');
    this.productServices.retrouveProduit(this.id).subscribe(data=>{this.product=data;
      this.interactionServices.getInteractionByProduit(data.id).subscribe(inter=>{
        if(inter===null){
          this.productEtoile=new ProductResponseEtoile(data.id,data.marque,data.prix,data.description,data.image,
            data.nbre_piece,data.nom_vendeur,data.nom_category,data.idVend,data.cat,data.nomProduit,0);
        }
        else
        {
          let nbreEtoile:number=0;
          let size=inter.length;
          for(let i of inter){
            nbreEtoile=nbreEtoile+i.nbreEtoile;
          }
          if(nbreEtoile!=0){
          this.productEtoile=new ProductResponseEtoile(data.id,data.marque,data.prix,data.description,data.image,
            data.nbre_piece,data.nom_vendeur,data.nom_category,data.idVend,data.cat,data.nomProduit,Math.trunc(nbreEtoile/size));
        }
        else{
          this.productEtoile=new ProductResponseEtoile(data.id,data.marque,data.prix,data.description,data.image,
            data.nbre_piece,data.nom_vendeur,data.nom_category,data.idVend,data.cat,data.nomProduit,0);
        }
      }
      });
    console.log(data);
    this.productServices.displayProductCat(data.cat).subscribe(data=>{this.products=data;
    for(let product of data){
     this.imageObj=new Slider('http://localhost:3600/retriveImage/'+product.id
     ,'http://localhost:3600/retriveImage/'+product.id,
     product.nomProduit+'\n'+product.prix);
     this.images.push(this.imageObj);
     console.log(this.imageObj);
    }
    });
    });
   
  }
  yourfunctionName(event){
    let i=0;
    let id_produit;
    for(let p of this.products){
    if(event==i){
      id_produit=p.id;
      break;
    }
    else{
      i=i+1;
    }
    }
    this.productServices.retrouveProduit(id_produit).subscribe(data=>{this.product=data;
      this.interactionServices.getInteractionByProduit(data.id).subscribe(inter=>{
        if(inter===null){
          this.productEtoile=new ProductResponseEtoile(data.id,data.marque,data.prix,data.description,data.image,
            data.nbre_piece,data.nom_vendeur,data.nom_category,data.idVend,data.cat,data.nomProduit,0);
        }
        else
        {
          let nbreEtoile:number=0;
          let size=inter.length;
          for(let i of inter){
            nbreEtoile=nbreEtoile+i.nbreEtoile;
          }
          if(nbreEtoile!=0){
          this.productEtoile=new ProductResponseEtoile(data.id,data.marque,data.prix,data.description,data.image,
            data.nbre_piece,data.nom_vendeur,data.nom_category,data.idVend,data.cat,data.nomProduit,Math.trunc(nbreEtoile/size));
        }
        else{
          this.productEtoile=new ProductResponseEtoile(data.id,data.marque,data.prix,data.description,data.image,
            data.nbre_piece,data.nom_vendeur,data.nom_category,data.idVend,data.cat,data.nomProduit,0);
        }
      }
      });
    this.location.replaceState('shop/detail/'+id_produit);
    window.scroll(0,0);
    });

  }
  ajouterPannier(product){
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

}
