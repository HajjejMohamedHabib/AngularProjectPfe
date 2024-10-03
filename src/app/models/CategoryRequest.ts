export class CategoryRequest{
    nom_categorie:string;
    nbre_piece:number;
    constructor(nom_categorie:string,nbre_piece:any){
       this.nom_categorie=nom_categorie;
       this.nbre_piece=nbre_piece;
    }
}