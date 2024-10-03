import { Component, OnChanges, OnInit } from '@angular/core';
import * as _ from 'lodash';
import {
  Chart,
  ArcElement,
  LineElement,
  BarElement,
  PointElement,
  BarController,
  BubbleController,
  DoughnutController,
  LineController,
  PieController,
  PolarAreaController,
  RadarController,
  ScatterController,
  CategoryScale,
  LinearScale,
  LogarithmicScale,
  RadialLinearScale,
  TimeScale,
  TimeSeriesScale,
  Decimation,
  Filler,
  Legend,
  Title,
  Tooltip
} from 'chart.js';
import { CommandeItem } from 'src/app/models/commandeItem';
import { ResponseLogin } from 'src/app/models/responseLogin';
import { StatistiqueAdminServices } from 'src/app/services/statistiqueAdmin';
import { ModelVendeurPlusVentes } from 'src/app/models/vendeurPlusVentes';
import { StatistiqueVendeurServices } from 'src/app/services/statiqtiqueVendeur';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
    totalSalesVendeurMonth:number;
    qtv;
    psm;
    tsp:number;
  mychartProduitVendeur;
  mychartProduitVendeurMois;
  myChartMois;
  myChartMoisProduit;
  ppv:CommandeItem[];
  response:ResponseLogin;
  token;
  productMax;
  nomProductMax;
  totalSales;
  totalSalesMonth;
  totalSalesMonthP;
  nomVendeurMax;
  venteMaxVendeur
  vpv:ModelVendeurPlusVentes[];
  vpvm:ModelVendeurPlusVentes[];
  mois:string='9';
  labels;
  d;
  moisP:string='9';
  role;
  constructor(private statistiqueAdmin:StatistiqueAdminServices,private statistiqueVendeur:StatistiqueVendeurServices) { }
  
  ngOnInit(): void {
    Chart.register(
      ArcElement,
      LineElement,
      BarElement,
      PointElement,
      BarController,
      BubbleController,
      DoughnutController,
      LineController,
      PieController,
      PolarAreaController,
      RadarController,
      ScatterController,
      CategoryScale,
      LinearScale,
      LogarithmicScale,
      RadialLinearScale,
      TimeScale,
      TimeSeriesScale,
      Decimation,
      Filler,
      Legend,
      Title,
      Tooltip
    );    
  this.response=JSON.parse(localStorage.getItem('response'));
  this.token=this.response.jwttoken;
this.role=this.response.autorities[0].authority;

    this.statistiqueAdmin.produitsPlusVentes(this.token).subscribe(data=>{this.ppv=data
      let labels= _.map(data,'nomProduit');
      let d=_.map(data,'quantite');
      this.totalSales=0;
      this.statistiqueAdmin.prixTV(this.token).subscribe(data=>{this.totalSales=data;
      console.log(this.totalSales);
      })
      this.productMax=data[0].quantite;
      this.nomProductMax=data[0].nomProduit;
      for (let d of data)
    {
        if (d.quantite > this.productMax)
           {
            this.productMax = d.quantite;
            this.nomProductMax=d.nomProduit;

           }
    }
    console.log(this.nomProductMax);
    console.log(this.productMax);
      console.log(labels);
      var myChart = new Chart('myChart1', {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'percentage of sales',
                data:d,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
    }) 
    this.statistiqueAdmin.vendeurPlusVentes(this.token).subscribe(data2=>{this.vpv=data2
      let labels=_.map(data2,'nomVendeur');
      console.log(this.vpv+'vpv');
      let d=_.map(data2,'quantite');
      this.nomVendeurMax=data2[0].nomVendeur;
      this.venteMaxVendeur=data2[0].quantite;
      for (let d of data2)
    {
        if (d.quantite > this.productMax)
           {
            this.venteMaxVendeur = d.quantite;
            this.nomVendeurMax=d.nomVendeur;

           }
    }
      var myChart2 = new Chart('myChart', {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'percentage of sales per seller',
                data:d,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
    })
    this.myChart2();
    this.myChart3();
    this.myChartVendeurP();
    this.myChartVendeurPV();
    
  }
  onChange(event){
    this.mois=(<HTMLInputElement>event.target).value;
    this.myChartMois.destroy();
    this.myChart2();

  }
myChart2(){
  this.statistiqueAdmin.vendeurPlusVentesMois(this.token,parseInt(this.mois)).subscribe(data=>{
   this.statistiqueAdmin.prixTVM(this.token,this.mois).subscribe(data=>this.totalSalesMonth=data);
    this.vpvm=data
    this.labels=_.map(this.vpvm,'nomVendeur')
    this.d=_.map(this.vpvm,'quantite')
    console.log(this.vpvm)
     this.myChartMois = new Chart('myChart2', {
       type: 'pie',
       data: {
           labels: this.labels,
           datasets: [{
               label: 'percentage of sales per seller',
               data:this.d,
               backgroundColor: [
                   'rgba(255, 99, 132, 0.2)',
                   'rgba(54, 162, 235, 0.2)',
                   'rgba(255, 206, 86, 0.2)',
                   'rgba(75, 192, 192, 0.2)',
                   'rgba(153, 102, 255, 0.2)',
                   'rgba(255, 159, 64, 0.2)'
               ],
               borderColor: [
                   'rgba(255, 99, 132, 1)',
                   'rgba(54, 162, 235, 1)',
                   'rgba(255, 206, 86, 1)',
                   'rgba(75, 192, 192, 1)',
                   'rgba(153, 102, 255, 1)',
                   'rgba(255, 159, 64, 1)'
               ],
               borderWidth: 1
           }]
       },
       options: {
           scales: {
               y: {
                   beginAtZero: true
               }
           }
       }
   });
   })
}
myChart3(){
  this.statistiqueAdmin.produitsPlusVentesMois(this.token,parseInt(this.moisP)).subscribe(data=>{
    this.statistiqueAdmin.prixTVM(this.token,this.moisP).subscribe(data=>this.totalSalesMonthP=data);
    let labels=_.map(data,'nomProduit')
    let d=_.map(data,'quantite')
     this.myChartMoisProduit = new Chart('myChart3', {
       type: 'pie',
       data: {
           labels:labels,
           datasets: [{
               label: 'percentage of sales per seller',
               data:d,
               backgroundColor: [
                   'rgba(255, 99, 132, 0.2)',
                   'rgba(54, 162, 235, 0.2)',
                   'rgba(255, 206, 86, 0.2)',
                   'rgba(75, 192, 192, 0.2)',
                   'rgba(153, 102, 255, 0.2)',
                   'rgba(255, 159, 64, 0.2)'
               ],
               borderColor: [
                   'rgba(255, 99, 132, 1)',
                   'rgba(54, 162, 235, 1)',
                   'rgba(255, 206, 86, 1)',
                   'rgba(75, 192, 192, 1)',
                   'rgba(153, 102, 255, 1)',
                   'rgba(255, 159, 64, 1)'
               ],
               borderWidth: 1
           }]
       },
       options: {
           scales: {
               y: {
                   beginAtZero: true
               }
           }
       }
   });
   })
}
onChange2(event){
    this.moisP=(<HTMLInputElement>event.target).value;
    this.myChartMoisProduit.destroy();
    this.myChart3();

  }
  onChange3(event){
    this.moisP=(<HTMLInputElement>event.target).value;
    this.mychartProduitVendeurMois.destroy();
    this.myChartVendeurPV();

  }
  myChartVendeurP(){
      this.tsp=0;
      this.qtv=0;
    this.statistiqueVendeur.produitsPlusVentes(this.token,this.response.id).subscribe(data=>{
        console.log(data);
        this.psm=data[0];
        for(let d of data){
            this.tsp=this.tsp+d.prix*d.quantite;
            this.qtv=this.qtv+d.quantite;
            if(this.psm.quantite<d.quantite){
                this.psm=d
            }
        }
      let labels=_.map(data,'nomProduit')
      let d=_.map(data,'quantite')
       this.mychartProduitVendeur = new Chart('myChart1Vendeur', {
         type: 'pie',
         data: {
             labels:labels,
             datasets: [{
                 label: 'percentage of sales',
                 data:d,
                 backgroundColor: [
                     'rgba(255, 99, 132, 0.2)',
                     'rgba(54, 162, 235, 0.2)',
                     'rgba(255, 206, 86, 0.2)',
                     'rgba(75, 192, 192, 0.2)',
                     'rgba(153, 102, 255, 0.2)',
                     'rgba(255, 159, 64, 0.2)'
                 ],
                 borderColor: [
                     'rgba(255, 99, 132, 1)',
                     'rgba(54, 162, 235, 1)',
                     'rgba(255, 206, 86, 1)',
                     'rgba(75, 192, 192, 1)',
                     'rgba(153, 102, 255, 1)',
                     'rgba(255, 159, 64, 1)'
                 ],
                 borderWidth: 1
             }]
         },
         options: {
             scales: {
                 y: {
                     beginAtZero: true
                 }
             }
         }
     });
     })
  }
  myChartVendeurPV(){
    this.statistiqueVendeur.produitsPlusVentesMois(this.token,this.response.id,parseInt(this.moisP)).subscribe(data=>{
          this.totalSalesVendeurMonth=0;
          for(let d of data){
              this.totalSalesVendeurMonth=this.totalSalesVendeurMonth+d.quantite*d.prix;
          }
        let labels=_.map(data,'nomProduit')
        let d=_.map(data,'quantite')
         this.mychartProduitVendeurMois = new Chart('myChartVP', {
           type: 'pie',
           data: {
               labels:labels,
               datasets: [{
                   label: 'percentage of sales per seller',
                   data:d,
                   backgroundColor: [
                       'rgba(255, 99, 132, 0.2)',
                       'rgba(54, 162, 235, 0.2)',
                       'rgba(255, 206, 86, 0.2)',
                       'rgba(75, 192, 192, 0.2)',
                       'rgba(153, 102, 255, 0.2)',
                       'rgba(255, 159, 64, 0.2)'
                   ],
                   borderColor: [
                       'rgba(255, 99, 132, 1)',
                       'rgba(54, 162, 235, 1)',
                       'rgba(255, 206, 86, 1)',
                       'rgba(75, 192, 192, 1)',
                       'rgba(153, 102, 255, 1)',
                       'rgba(255, 159, 64, 1)'
                   ],
                   borderWidth: 1
               }]
           },
           options: {
               scales: {
                   y: {
                       beginAtZero: true
                   }
               }
           }
       });
       })
  }
}
