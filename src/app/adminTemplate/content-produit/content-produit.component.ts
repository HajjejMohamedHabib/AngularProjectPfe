import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductServices } from 'src/app/services/ProductServices';
import { ProductRequest } from 'src/app/models/ProductRequest';
import Swal from 'sweetalert2'
import { ResponseLogin } from 'src/app/models/responseLogin';
//import { WebSocket } from 'src/app/services/webSoket';
@Component({
  selector: 'app-content-produit',
  templateUrl: './content-produit.component.html',
  styleUrls: ['./content-produit.component.css']
})
export class ContentProduitComponent implements OnInit {
products:ProductRequest[];
searchInput;
response:ResponseLogin;
image:any;
currentMeeting;
token;
  constructor(private productServices:ProductServices,private route:Router) { }

  ngOnInit(): void {
   this.response=JSON.parse(localStorage.getItem('response'));
   this.token=this.response.jwttoken;
   if(this.response.autorities[0].authority=='Admin'){
   this.productServices.displayAllProducts().subscribe(data=>{this.products=data;});
   }else{
     this.productServices.displayProduitParVendeur(this.response.id,this.token).subscribe(
       data=>{this.products=data}
     )
   }
//this.initWebSocket();
//console.log(this.currentMeeting);
  }
  //initWebSocket(){
    //this.websocketService.initWebSocket().then(() => {
      //this.websocketService.subscribe('socket/meetingStarts', (event) => { 
        // this.currentMeeting = event.body;
         
      //});
    //});
  
  //}
modifProduit(id:any){
this.route.navigateByUrl('contentProduit/modifProduit/'.concat(id));
  }
  retriveImage(id:any){
  
    this.productServices.retriveImage(id,this.token).subscribe(data=>this.image=data)
    console.log(this.image)
    return this.image;
    
  }
deleteProduit(id:any){
  Swal.fire({
    title: 'Are you sure?',
    text: 'You will not be able to recover this imaginary file!',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Yes, delete it!',
    cancelButtonText: 'No, keep it'
  }).then((result) => {
    if (result.isConfirmed) {
      this.productServices.deleteProduit(id,this.token).subscribe(data=>{
  let elem=document.getElementById('trBlock_'+id);
  elem.parentNode.removeChild(elem);}
  ,error=>{if(error.status==200){
    let elem=document.getElementById('trBlock_'+id);
  elem.parentNode.removeChild(elem);
  }}
  );
      Swal.fire(
        'Deleted!',
        'Your imaginary file has been deleted.',
        'success'
      )
    // For more information about handling dismissals please visit
    // https://sweetalert2.github.io/#handling-dismissals
    } else if (result.dismiss === Swal.DismissReason.cancel) {
      Swal.fire(
        'Cancelled',
        'Your imaginary file is safe :)',
        'error'
      )
      }
  })
 
}

}
