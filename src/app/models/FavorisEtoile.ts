export class FavorisEtoile{
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
    nbreEtoile;
    constructor(id:any,libellé:any,client:any,produit:any,description:any,prix:any,
       marque:any,image:any,nbreEtoile,nomProduit,nbre_piece){
    this.id=id;
    this.libellé=libellé;
    this.client=client;
    this.produit=produit;
    this.description=description;
    this.prix=prix;
    this.marque=marque;
    this.image=image;
    this.nbreEtoile=nbreEtoile;
    this.nomProduit=nomProduit;
    this.nbre_piece=nbre_piece;
    }
}