import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CategoryResponse } from 'src/app/models/CategoryResponse';
import { ResponseLogin } from 'src/app/models/responseLogin';
import { CategoryServices } from 'src/app/services/CategoryServices';
import Swal from 'sweetalert2'
@Component({
  selector: 'app-content-categorie',
  templateUrl: './content-categorie.component.html',
  styleUrls: ['./content-categorie.component.css']
})
export class ContentCategorieComponent implements OnInit {
  searchInput;
  categories:CategoryResponse[];
  response:ResponseLogin;
  token;
  role;
  constructor(private categoryServices:CategoryServices ,private route:Router) { }

  ngOnInit(): void {
    this.response=JSON.parse(localStorage.getItem('response'));
    this.token=this.response.jwttoken;
    this.role=this.response.autorities[0].authority;
    if(this.role=='Admin'){
    this.categoryServices.displayCategories().subscribe(data=>{this.categories=data;console.log(data)});
  }
 else{
   this.categoryServices.displayCategoriesParVendeur(this.response.id,this.token).subscribe(data=>{
     this.categories=data;
   })
 }
}
  modifCategorie(id:any){
this.route.navigateByUrl('contentCategorie/modifCategorie/'.concat(id));
  }
  deleteCategorie(id:any){
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this imaginary file!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.isConfirmed) {
        this.categoryServices.deleteCategorie(id,this.token).subscribe(data=>{
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
  afficheProduits(id:any){
    this.route.navigateByUrl("contentCategorie/produits/".concat(id));
  }
}
