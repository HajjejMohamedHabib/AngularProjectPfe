import { Component, OnInit } from '@angular/core';
import { Favoris } from 'src/app/models/Favoris';
import { FavorisEtoile } from 'src/app/models/FavorisEtoile';
import { Pannier_Produit } from 'src/app/models/pannier';
import { PannierProductResponse } from 'src/app/models/pannierProductResponse';
import { ProductResponse } from 'src/app/models/ProductResponse';
import { ProductResponseEtoile } from 'src/app/models/ProductResponseEtoile';
import { ResponseLogin } from 'src/app/models/responseLogin';
import { FavorisServices } from 'src/app/services/favorisServices';
import { InteractionServices } from 'src/app/services/interactionServices';
import { PannierServices } from 'src/app/services/Pannier';
import { ProductServices } from 'src/app/services/ProductServices';
import { SharedServices } from 'src/app/services/sharedServices';
import Swal from 'sweetalert2'
@Component({
  selector: 'app-list-favoris',
  templateUrl: './list-favoris.component.html',
  styleUrls: ['./list-favoris.component.css']
})
export class ListFavorisComponent implements OnInit {
  response:ResponseLogin=null;
  token;
  listFavoris:Favoris[];
  product:ProductResponse;
  productsPannier:Array<PannierProductResponse>=[];
  favorissEtoile:Array<FavorisEtoile>=[]
  constructor(private favorisServices:FavorisServices,private interactionServices:InteractionServices,private sharedServices:SharedServices,private pannierServices:PannierServices,private productServices:ProductServices) { }

  ngOnInit(): void {
    this.response=JSON.parse(localStorage.getItem('response'));
    this.token=this.response.jwttoken;
    let id=this.response.id;
    this.favorisServices.getFavoris(id,this.token).subscribe(data=>{this.listFavoris=data;
      console.log(data);
      for(let d of data){
        this.interactionServices.getInteractionByProduit(d.produit).subscribe(inter=>{
          if(inter===null){
            this.favorissEtoile.push(new FavorisEtoile(d.id,d.libellé,d.client,
              d.produit,d.description,d.prix,d.marque,d.image,0,d.nomProduit,d.nbre_piece));
          }else
          {
            let nbreEtoile:number=0;
            let size=inter.length;
            for(let i of inter){
              nbreEtoile=nbreEtoile+i.nbreEtoile;
            }
            if(nbreEtoile!=0){
              this.favorissEtoile.push(new FavorisEtoile(d.id,d.libellé,d.client,
                d.produit,d.description,d.prix,d.marque,d.image,Math.trunc(nbreEtoile/size),d.nomProduit,d.nbre_piece));
          }
          else{
            this.favorissEtoile.push(new FavorisEtoile(d.id,d.libellé,d.client,
              d.produit,d.description,d.prix,d.marque,d.image,0,d.nomProduit,d.nbre_piece));
          }
        }

        })
      }
    });
  }
  ajouterPannier(favoris){
    if(favoris.nbre_piece==0){
      Swal.fire(
        'NOT AVAILABLE IN STOCK!',
        'oops!',
        'error'
      )
      return;
    }
   this.productServices.retrouveProduit(favoris.produit).subscribe(data=>{
  this.product=data;
  let productPannier:PannierProductResponse;
      let existe:boolean=false;
      productPannier=new PannierProductResponse(favoris.produit,this.product.marque,this.product.prix,1
        ,this.product.description,this.product.image,this.product.nbre_piece
        ,this.product.nom_vendeur,this.product.nom_category,this.product.idVend,this.product.cat,this.product.nomProduit);
         //tester l'existence de produit dans le pannier
        let pannierPR:PannierProductResponse[]; 
        if(localStorage.getItem('pannier')!=null){
          pannierPR=JSON.parse(localStorage.getItem('pannier')) ;
        for(let p of pannierPR){
          if(p.id==favoris.produit){
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
            if(p.id==favoris.produit){
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
        this.pannierServices.ajouterPannier(token,new Pannier_Produit(favoris.produit,response.id))
        .subscribe(data=>{console.log(data);
        });
        }else {
        let pan=JSON.parse(localStorage.getItem('pannier'));
        console.log(pan);
         for(let p of pan){
           if(p.id==favoris.produit){
             console.log('egal');
             p.quantite=p.quantite+1; 
             this.pannierServices.getPannier(this.response.id,this.token).subscribe((data:Pannier_Produit[])=>{
               for(let pp of data){
                 if(pp.id==favoris.produit)
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
   })
  }
  supprimerFavoris(id){
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this imaginary file!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.isConfirmed) {
        this.favorisServices.deleteFavoris(id,this.token).subscribe(data=>{
    let elem=document.getElementById('divBlock_'+id);
    elem.parentNode.removeChild(elem);}
    ,error=>{if(error.status==200){
      let elem=document.getElementById('divBlock_'+id);
    elem.parentNode.removeChild(elem);
    }}
    );
        Swal.fire(
          'Deleted!',
          'Your imaginary file has been deleted.',
          'success'
        )
      // For more information about handling dismissals please visit
      // https://sweetalert2.github.io/#handling-dismissals
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelled',
          'Your imaginary file is safe :)',
          'error'
        )
      }
    })
  }
}
