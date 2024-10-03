import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductRequest } from 'src/app/models/ProductRequest';
import { ResponseLogin } from 'src/app/models/responseLogin';
import { ProductServices } from 'src/app/services/ProductServices';
import Swal from 'sweetalert2'
@Component({
  selector: 'app-display-produits-cat',
  templateUrl: './display-produits-cat.component.html',
  styleUrls: ['./display-produits-cat.component.css']
})
export class DisplayProduitsCatComponent implements OnInit {
 id:any;
 searchInput;
 products:any;
 response:ResponseLogin;
 token;
  constructor(private productServices:ProductServices,private router:Router,private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.response=JSON.parse(localStorage.getItem('response'));
    this.token=this.response.jwttoken;
    this.id = this.route.snapshot.paramMap.get("id");
    if(this.response.autorities[0].authority=='Admin'){
    this.productServices.displayProductCat(this.id).subscribe(data=>{console.log(data);this.products=data;});
  }else{
    this.productServices.displayProduitParCatParVendeur(this.response.id,this.id,this.token).subscribe(data=>{
      this.products=data;
    })
  }

}
  modifProduit(id:any){
    this.router.navigateByUrl('contentProduit/modifProduit/'.concat(id));
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
