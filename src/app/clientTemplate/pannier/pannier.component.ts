import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router, RouterStateSnapshot } from '@angular/router';
import { Pannier_Produit } from 'src/app/models/pannier';
import { PannierProductResponse } from 'src/app/models/pannierProductResponse';
import { ProductRequest } from 'src/app/models/ProductRequest';
import { ResponseLogin } from 'src/app/models/responseLogin';
import { PannierServices } from 'src/app/services/Pannier';
import { ProductServices } from 'src/app/services/ProductServices';
import { SharedServices } from 'src/app/services/sharedServices';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-pannier',
  templateUrl: './pannier.component.html',
  styleUrls: ['./pannier.component.css']
})
export class PannierComponent implements OnInit {
  response:ResponseLogin;
  token:any;
  pannier:Pannier_Produit[];
  quantite:number=1;
  totalPrix:number;
  grandTotal:number;
  constructor(private pannierServices:PannierServices,private route:Router,private sharedServices:SharedServices) {
    this.sharedServices.getClickEvent().subscribe(data=>this.ngOnInit());
   }

  ngOnInit(): void {
    window.scroll(0,0);
   if(localStorage.getItem('response')!=null){
     this.response=JSON.parse(localStorage.getItem('response'));
   this.token=this.response.jwttoken;
    this.pannierServices.getPannier(this.response.id,this.token).subscribe(data=>{this.pannier=data;
    console.log(data);
     if(localStorage.getItem('pannier')!=null){
       localStorage.removeItem('pannier');
     }
     localStorage.setItem('pannier',JSON.stringify(data));
      if(this.pannier!=null){
        this.grandTotal=0;
      for(let pp of this.pannier){
        this.grandTotal=this.grandTotal+pp.prix*pp.quantite;
        console.log(this.grandTotal);
      }}
  });
  }
  else if(localStorage.getItem('pannier')!=null){
    this.pannier=JSON.parse(localStorage.getItem('pannier'));
    console.log(this.pannier);
    this.grandTotal=0;
    for(let pp of this.pannier){
      this.grandTotal=this.grandTotal+pp.prix*pp.quantite;
      console.log(this.grandTotal);
    }
  }
  else{
  this.pannier=[];
  }
  console.log(this.quantite);
  }
  minimiserQuantite(id:any,prixUnitaire:any){
    var valuestr=(<HTMLInputElement>document.getElementById('quantite_'.concat(id))).value;
    var prixTotal=(<HTMLInputElement>document.getElementById('prixTotal_'.concat(id))).value;
    var valeur=parseInt(valuestr,10);
    var VprixTotal=parseInt(prixTotal,10);
    if(valeur>1){
    valeur=valeur-1;
    this.sharedServices.sendClickEvent3();
    VprixTotal=VprixTotal-prixUnitaire;
    this.grandTotal=this.grandTotal-prixUnitaire;
    let valeurstr:string=valeur.toString(10);
    let VprixTotalstr:string=VprixTotal.toString(10);
    if(localStorage.getItem('response')==null){
    let pannier:PannierProductResponse[]=JSON.parse(localStorage.getItem('pannier'));
    for(let p of pannier){
      if(p.id==id){
        p.quantite=p.quantite-1;
      }
    }
    console.log(pannier);
    localStorage.setItem('pannier',JSON.stringify(pannier));
  }
   
    (<HTMLInputElement>document.getElementById('quantite_'.concat(id))).value=valeurstr;
    (<HTMLInputElement>document.getElementById('prixTotal_'.concat(id))).value=VprixTotalstr;
    //block ajout quantité au pannier// 
  if(localStorage.getItem('response')!=null){
    if(localStorage.getItem('pannier')!=null){
      let pannier:Pannier_Produit[]=JSON.parse(localStorage.getItem('pannier'));
      for(let p of pannier){
        if(p.id==id){
          p.quantite=p.quantite-1;
          this.pannierServices.updateQuantiteMoins(this.token,p.idPannierProduit).subscribe(data=>console.log(data));
        }
      }
      console.log(pannier);
      localStorage.setItem('pannier',JSON.stringify(pannier));
    }
  }
  //fin de block ajout quantité au pannier//
  }

  }
  maximiserQuantite(id:any,prixUnitaire:any){
    var prixTotal=(<HTMLInputElement>document.getElementById('prixTotal_'.concat(id))).value;
    var valuestr=(<HTMLInputElement>document.getElementById('quantite_'.concat(id))).value;
  var valeur=parseInt(valuestr,10);
  var VprixTotal=parseInt(prixTotal,10);
  valeur=valeur+1;
  this.sharedServices.sendClickEvent4();
  VprixTotal=VprixTotal+prixUnitaire;
  this.grandTotal=this.grandTotal+prixUnitaire;
  let valeurstr:string=valeur.toString(10);
  let VprixTotalstr:string=VprixTotal.toString(10);
  if(localStorage.getItem('response')==null){
    let pannier:PannierProductResponse[]=JSON.parse(localStorage.getItem('pannier'));
    for(let p of pannier){
      if(p.id==id){
        p.quantite=p.quantite+1;
      }
    }
    console.log(pannier);
    localStorage.setItem('pannier',JSON.stringify(pannier));
  }
  (<HTMLInputElement>document.getElementById('quantite_'.concat(id))).value=valeurstr;
  (<HTMLInputElement>document.getElementById('prixTotal_'.concat(id))).value=VprixTotalstr;
  //block ajout quantité au pannier// 
  if(localStorage.getItem('response')!=null){
    if(localStorage.getItem('pannier')!=null){
      let pannier:Pannier_Produit[]=JSON.parse(localStorage.getItem('pannier'));
      for(let p of pannier){
        if(p.id==id){
          p.quantite=p.quantite+1;
          this.pannierServices.updateQuantitePlus(this.token,p.idPannierProduit).subscribe(data=>console.log(data));
        }
      }
      console.log(pannier);
      localStorage.setItem('pannier',JSON.stringify(pannier));
    }
  }
  //fin de block ajout quantité au pannier//
}
  changeValue(quantite){
    console.log(quantite.value);
  }
  deleteItemPannier(id:any,idPP:any){
    console.log(idPP);
    if(localStorage.getItem('response')==null){
      if(localStorage.getItem('pannier')!=null){
        let pannier:Pannier_Produit[]=JSON.parse(localStorage.getItem('pannier'));
        //let newPannier:Pannier_Produit[]
        
        for(let p of pannier){
          if(p.id==id)
          {
            let index=pannier.indexOf(p);
            Swal.fire({
              title: 'Are you sure?',
              text: 'You will not be able to recover this imaginary file!',
              icon: 'warning',
              showCancelButton: true,
              confirmButtonText: 'Yes, delete it!',
              cancelButtonText: 'No, keep it'
            }).then((result) => {
              if (result.isConfirmed) {
                pannier.splice(index,1);
                      console.log("sendClick");
                      this.sharedServices.sendSucces();
                      console.log("/sendClick");
                console.log(pannier);
                console.log(index);
                localStorage.setItem('pannier',JSON.stringify(pannier));
                this.grandTotal=this.grandTotal-p.prix;
                let elem=document.getElementById('trBlock_'+id);
            elem.parentNode.removeChild(elem);
                this.grandTotal=0;
               for(let p of JSON.parse(localStorage.getItem('pannier'))){
              this.grandTotal=this.grandTotal+p.quantite*p.prix;}
                Swal.fire(
                  'Deleted!',
                  'Your imaginary file has been deleted.',
                  'success'
                )
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
      }
      
    }
    
   else{
     this.response=JSON.parse(localStorage.getItem('response'));
     this.token=this.response.jwttoken;
      let pannier:Pannier_Produit[]=JSON.parse(localStorage.getItem('pannier'));
      Swal.fire({
        title: 'Are you sure?',
        text: 'You will not be able to recover this imaginary file!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'No, keep it'
      }).then((result) => {
        if (result.isConfirmed) 
  {
    console.log('send succes');
    this.sharedServices.sendSucces();
        console.log('/send succes');
    // if(localStorage.getItem('pannier')!=null)
    // {
    //   for(let p of pannier)
    //   {
    //     if(p.id==id)
    //     {
    //       let index=pannier.indexOf(p);
    //       pannier.splice(index,1);
    //       localStorage.setItem('pannier',JSON.stringify(pannier));
    //       this.grandTotal=this.grandTotal-p.prix;
    //     }
    //   }
    // }
      this.pannierServices.deletePannierItem(this.token,idPP).subscribe(data=>console.log(data));
      let elem=document.getElementById('trBlock_'+id);
      elem.parentNode.removeChild(elem);
      for(let p of pannier)
      {
        if(p.id==id)
        {
          let index=pannier.indexOf(p);
          pannier.splice(index,1);
          localStorage.setItem('pannier',JSON.stringify(pannier));
          console.log(this.grandTotal+'avant');
          console.log(p.id+' '+p.prix+' '+p.quantite)
      this.grandTotal=this.grandTotal-p.prix*p.quantite;
      console.log(this.grandTotal+'apres');
    }}
          Swal.fire(
            'Deleted!',
            'Your imaginary file has been deleted.',
            'success'
          )
   } else if (result.dismiss === Swal.DismissReason.cancel) {
          Swal.fire(
            'Cancelled',
            'Your imaginary file is safe :)',
            'error'
          )
        }
      })
    }
    this.sharedServices.sendClickEvent2();
  }
  redirectTo(){
      this.route.navigateByUrl('pannier/checkOut');
  
  }
}
