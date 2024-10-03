export class Abonnement{
    typeAbonnement;
    id;
    dateFinAbonnement;
    vendeur;
    constructor(typeAbonnement,
        dateFinAbonnement,
        vendeur){
this.typeAbonnement=typeAbonnement;
this.dateFinAbonnement=dateFinAbonnement;
this.vendeur=vendeur;
    }
}