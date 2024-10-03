export class CategoryResponse{
    id:any;
    nom_categorie:string;
    nbre_piece:any;
    constructor(id:any,nom_categorie:string,nbre_piece:any){
       this.id=id;
       this.nom_categorie=nom_categorie;
       this.nbre_piece=nbre_piece;
    }
}