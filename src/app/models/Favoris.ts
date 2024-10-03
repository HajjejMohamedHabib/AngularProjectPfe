import { THIS_EXPR } from "@angular/compiler/src/output/output_ast";

export class Favoris{
     id:any;
	 libellé:any;
	 client:any;
	 produit:any;
     description:any;
     prix:any;
     marque:any;
     image:any;
     nomProduit;
     nbre_piece;
     constructor(id:any,libellé:any,client:any,produit:any,description:any,prix:any,
        marque:any,image:any){
     this.id=id;
     this.libellé=libellé;
     this.client=client;
     this.produit=produit;
     this.description=description;
     this.prix=prix;
     this.marque=marque;
     this.image=image;
     }
}