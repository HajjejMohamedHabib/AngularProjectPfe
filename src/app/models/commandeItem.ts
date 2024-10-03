export class CommandeItem{
    id:any;
    quantite:number;
	commande:any;
    produit:number;
    nomProduit;
    description;
    marque;
    prix;
    constructor(quantite:number,produit:number){
    this.quantite=quantite;
    this.produit=produit;
    }
}