export class Interaction{
id;
nbreEtoile;
date_interaction;
client;
produit;
constructor(client,produit,nbreEtoile,date_interaction){
    this.client=client;
    this.produit=produit;
    this.nbreEtoile=nbreEtoile;
    this.date_interaction=date_interaction;
}
}