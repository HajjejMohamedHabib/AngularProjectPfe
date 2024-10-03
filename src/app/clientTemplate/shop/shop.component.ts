import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryResponse } from 'src/app/models/CategoryResponse';
import { Favoris } from 'src/app/models/Favoris';
import { Pannier_Produit } from 'src/app/models/pannier';
import { PannierProductResponse } from 'src/app/models/pannierProductResponse';
import { ProductResponse } from 'src/app/models/ProductResponse';
import { ResponseLogin } from 'src/app/models/responseLogin';
import { CategoryServices } from 'src/app/services/CategoryServices';
import { FavorisServices } from 'src/app/services/favorisServices';
import { PannierServices } from 'src/app/services/Pannier';
import { ProductServices } from 'src/app/services/ProductServices';
import { SharedServices } from 'src/app/services/sharedServices';
import {Location} from '@angular/common'; 
import { AbonnementServices } from 'src/app/services/AbonnementServices';
import { ProductResponseEtoile } from 'src/app/models/ProductResponseEtoile';
import { InteractionServices } from 'src/app/services/interactionServices';
import Swal from 'sweetalert2'
@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {
  products:ProductResponse[];
  productsEtoile:Array<ProductResponseEtoile>=[]
  categorys:CategoryResponse[];
  productsCat:ProductResponse[];
  idCat;
  productsParMarque:ProductResponse[];
  value:string='All';
  brands:Array<ProductResponse> =[];
  totalLength:any;
  page:number=1;
  response:ResponseLogin;
  token;
  productsPannier:Array<PannierProductResponse>=[];
  marque;
  idCategorie
  produits:Array<ProductResponse>=[];
  constructor(private productServices:ProductServices,private interactionServices:InteractionServices,private abonnementServices:AbonnementServices,private activtedRoute:ActivatedRoute,private sharedServices:SharedServices,private pannierServices:PannierServices,private favorisServices:FavorisServices,private location:Location,private categoryServices:CategoryServices,private route:Router) { }

  ngOnInit(): void {
    window.scroll(0,0);
    this.activtedRoute.queryParams.subscribe(
      params=>{
        this.produits=[];
        this.productsEtoile=[];
        this.idCategorie=params.categorie;
        this.marque=params.marque;
        console.log(this.idCategorie);
        if(this.idCategorie!=null && this.marque==null){
        this.productServices.displayProductCat(this.idCategorie).subscribe(data=>{
          //
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
          this.totalLength=this.productsEtoile.length;
          this.products=this.produits;
          console.log(this.products)
          //
          window.scroll(0,0);
        });}
      }
    )
    this.activtedRoute.queryParams
    .subscribe(params => {
      this.produits=[];
      this.productsEtoile=[];
      console.log('produits'+this.produits)
      this.marque = params.marque;
      this.idCategorie=params.categorie;
      if(this.marque!=null && params.categorie!=null){
      let prods:Array<ProductResponse>=[];
      this.productServices.displayProductCat(params.categorie).subscribe(data=>{for(let pcm of data){
        if(pcm.marque==this.marque){
          prods.push(pcm);
        }
       }
       for(let d of prods){
        this.abonnementServices.getAbonnements().subscribe(data1=>{
          for(let d1 of data1){
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
      this.totalLength=this.productsEtoile.length;
      this.products=this.produits;
      console.log(this.products)
        window.scroll(0,0);
      });
    }
      if(this.marque!=null && params.categorie==null){
        this.produits=[];
        this.productsEtoile=[];
        this.productServices.displayProduitParMarque(this.marque).subscribe(data=>{
          //
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
          this.totalLength=this.productsEtoile.length;
          this.products=this.produits;
          console.log(this.products)
          //
        })
      }
    }
  );
  this.productServices.displayAllProducts().subscribe(data=>{
    for(let d of data){
      let existe=false;
      for(let b of this.brands){
      if(d.marque==b.marque){
        existe=true;
      }
    }
    if(existe==false){
      this.brands.push(d);
    }
    }
    //this.totalLength=data.length;
    });
    if(this.marque==null && this.idCategorie==null){
    this.productServices.displayAllProducts().subscribe(data=>{
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
      this.totalLength=this.productsEtoile.length;
      this.products=this.produits;
      console.log(this.products)}
      );}
    this.categoryServices.displayCategories().subscribe(data=>{this.categorys=data;
    console.log(data);
    });
    /////// recupérer l'ancien panier ///////////
    if(localStorage.getItem('response')!=null){
      this.response=JSON.parse(localStorage.getItem('response'));
      this.token=this.response.jwttoken;}
      if(localStorage.getItem('pannier')!=null){
        for(let p of JSON.parse(localStorage.getItem('pannier'))){
        this.productsPannier.push(p);
      }}
      ////// fin recupérer l'ancien panier
  }
  displayProductsCat(id:any){
    this.produits=[];
    this.productsEtoile=[];
    this.idCat=null;
    this.productServices.displayProductCatUnique(id).subscribe(data=>{
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
      this.totalLength=this.productsEtoile.length;
      this.products=this.produits;
      this.productsCat=this.produits;
      this.idCat=id;
      this.location.replaceState('shop?categorie='+id);
    });
  }
  displayProduitCatParMarque(id,marque){
    let prods:Array<ProductResponse>=[];
    this.produits=[];
    this.productsEtoile=[];
    this.productServices.displayProductCat(id).subscribe(data=>{for(let pcm of data){
     if(pcm.marque==marque){
       prods.push(pcm);
     }
    }
    //
    for(let d of prods){
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
    this.totalLength=this.productsEtoile.length;
    this.products=this.produits;
    console.log(this.products)
    //
    this.location.replaceState('shop?categorie='+id+'&marque='+marque);
      });
  }
  displayProduitParMarque(marque:string){
    this.produits=[];
    this.productsEtoile=[];
    this.productServices.displayProduitParMarque(marque).subscribe(data=>{
   //
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
  this.totalLength=this.productsEtoile.length;
  this.products=this.produits;
    this.productsParMarque=this.produits;
    this.location.replaceState('shop?marque='+marque);
    });
  }
  triCroissant(){
    this.productsEtoile.sort(function (a, b) {
      return a.prix - b.prix;
    });
    console.log(this.products);
  }
  triDecroissant(){
    this.productsEtoile.sort(function (a, b) {
      return b.prix - a.prix;
    });
    console.log(this.products);
  }
  onChange(event){
    this.value=(<HTMLInputElement>event.target).value;
    console.log(this.value);
    if(this.value=='LowToHigh'){
      this.triCroissant();
    }
    else if(this.value=='HighToLow'){
      this.triDecroissant();
    }
    else if(this.value=='All'){
      this.ngOnInit();
    }
  }
  detailProduct(id){
    this.route.navigateByUrl('shop/detail/'+id);
  }
  ajouterPannier(product){
    if(product.nbre_piece==0){
      Swal.fire(
        'NOT AVAILABLE IN STOCK!',
        'SumsungA20!',
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
}
