export class ModelAjoutProduit{


 marque;
 prix;
 description;
 image;
 nbre_piece;
 email_vendeur;
 idCat;
 nomProduit;
constructor(marque,prix,description,image,nbre_piece,email_vendeur,idCat,nomProduit){
this.marque=marque;
this.prix=prix;
this.description=description;
this.image=image;
this.nbre_piece=nbre_piece;
this.email_vendeur=email_vendeur;
this.idCat=idCat;
this.nomProduit=nomProduit;
}
}