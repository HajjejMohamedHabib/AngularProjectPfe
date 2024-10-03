import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ResponseUser } from 'src/app/models/response';
import { ResponseLogin } from 'src/app/models/responseLogin';
import { User } from 'src/app/models/user';
import { UserServices } from 'src/app/services/userServices';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit {
  users:any;
  user:ResponseUser;
  searchInput;
  response:ResponseLogin;
  token;
  constructor(private rote:Router,private userService:UserServices) { }

  ngOnInit(): void {
  this.response=JSON.parse(localStorage.getItem('response'));
  this.token=this.response.jwttoken;
  this.userService.displayUser(this.token).subscribe(data=>{this.users=data;console.log(data);});
  }
  modifier(id){
    this.rote.navigateByUrl('content/modif/'.concat(id));
  }
  bannir(id){
    this.userService.bannirUser(id,this.token).subscribe(data=>{console.log(data);
    this.ngOnInit();
    },error=>{
      if(error.status==200){
        this.ngOnInit();
       }
    });
      
    }
    activer(id:any){
     this.userService.activerUser(id,this.token).subscribe(data=>{console.log(data);
    this.ngOnInit();
    },error=>{
     if(error.status==200){
      this.ngOnInit();
     }
    });
    }
    deleteUser(id:any){
      if(confirm("Are you sure to delete user "+id)){
      this.userService.deleteUser(id).subscribe(data=>console.log(data));
    }
    }
}
