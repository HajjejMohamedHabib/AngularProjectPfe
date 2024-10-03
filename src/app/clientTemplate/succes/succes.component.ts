import { Component, OnInit } from '@angular/core';
import pdfMake from 'pdfmake/build/pdfmake';
import {map} from 'rxjs/operators';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { CommandeServices } from 'src/app/services/commandeservices';
import { Commande } from 'src/app/models/Commande';
import { CommandeItem } from 'src/app/models/commandeItem';
import { ResponseLogin } from 'src/app/models/responseLogin';
import { ActivatedRoute } from '@angular/router';
import { SecretPaiementServices } from 'src/app/services/SecretPaiementServices';
import { PaymentServices } from 'src/app/services/PaymentServices';
pdfMake.vfs=pdfFonts.pdfMake.vfs;
@Component({
  selector: 'app-succes',
  templateUrl: './succes.component.html',
  styleUrls: ['./succes.component.css']
})
export class SuccesComponent implements OnInit {
  commande:Commande;
  commandeItems:CommandeItem[];
  response:ResponseLogin;
  token;
  grandtotal;
  date_commande:Date;
  dd;
  email:string;
  cleSecretPaiement;
  constructor(private commandeServices:CommandeServices,private paymentServices:PaymentServices,private route:ActivatedRoute,private secPaiementService:SecretPaiementServices) { }

  ngOnInit(): void {
    let idCommande=JSON.parse(localStorage.getItem('commande')).commande;
    console.log(idCommande);
    this.response=JSON.parse(localStorage.getItem('response'));
    this.token=this.response.jwttoken;
    this.commandeServices.getCommandesParClient(this.response.id,this.token).subscribe((data:Commande[])=>{
      for(let d of data){
        if(d.id==idCommande){
          this.commande=d;
          this.grandtotal=d.prix;
          this.date_commande=d.date_com;
          this.commandeServices.displayCommandeItem(idCommande,this.token).subscribe(data=>{
            this.commandeItems=data;
          })
        }
      }
    })
    ///////////////
    this.route.queryParams
      .subscribe(params => {
        console.log(params); // { order: "popular" }
        this.email = params.email;
        this.cleSecretPaiement=params.cle;
      }
    );
    if(this.email!=null){
      this.secPaiementService.retriveSecretPaiementCle(this.email,this.cleSecretPaiement).subscribe(data=>{
        if(this.cleSecretPaiement==data.cleSecret){
           this.paymentServices.ajoutPaiement(idCommande,this.token).subscribe(
             data=>{console.log(data);}
           ) 
        }
      });
    }
  }
  generatePdf(){
    const document=this.getDocument();
    pdfMake.createPdf(document).open();
  }
  getDocument(){
   return {
    content: [  
      // Previous configuration  
      {  
          columns: [  
             [
                  {  
                      text: this.commande.email  
                       
                 },  
                  { text: this.commande.phone_number, fontWeight: "bold" },  
                  { text: this.commande.first_name+' '+this.commande.last_name },  
                  { text: this.commande.address },
                  {text: this.commande.post_code+' '+this.commande.city}  
               ],  
              [  
                {  
                  text: 'Invoice',  
                  alignment: 'right'  
              } ,
                  {  
                      text:'F'+this.commande.id +'    '+'of  '+this.date_commande,  
                      alignment: 'right'  
                  } 
                   
              ]  
          ]  
      },
      {  
        text: 'Order Details',  
        style: 'sectionHeader',
        margin:[0,30,0,5]  
    },  
    {  
        table: {  
            headerRows: 1,  
            widths: ['*', 'auto', 'auto', 'auto','auto','auto'],
            heights:100,  
            body: [  
                ['Ref', 'Marque', 'Description', 'Price','Quantity','total'],  
                ...this.commandeItems.map(p => ([p.nomProduit,p.marque,p.description,p.prix,p.quantite,p.prix*p.quantite])),  
                [{ text: 'Grand Total'},{text:this.grandtotal, colSpan: 5 } ]  
            ]  
        }  
    }   
  ],
   }
  }
}
