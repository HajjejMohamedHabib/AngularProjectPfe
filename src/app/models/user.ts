import { Role } from "./role";

 export  class User {
      mail:string;
      password:string;
      first_name:string;
      last_name:string;
      phone_number:string;
      address:string;
      photo:string;
      role:string;
      actif:boolean;
     constructor(mail:string,password:string,first_name:string,last_name:string,phone_number:string,address:string,photo:string,role:string,actif:boolean){
        this.address=address;
        this.mail=mail;
        this.password=password;
        this.first_name=first_name;
        this.last_name=last_name;
        this.phone_number=phone_number;
        this.photo=photo;
        this.role=role;
        this.actif=actif;
     }
 } 