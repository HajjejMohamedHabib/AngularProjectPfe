export class Pannier_Produit{
     id:any;
	 produit:any;
	 pannier:any;
	 idClient:any;
	 description:any;
	 marque:any;
	 prix:any;
	 image:any;
	 vendeur:any;
     idPannierProduit:any;
     quantite:any;
     constructor(produit:any,idClient:any){
         this.produit=produit;
         this.idClient=idClient;
     }
}