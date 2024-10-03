import { Authority } from "./authority";

export class ResponseLogin{
jwttoken:string;
username:string;
autorities:Authority[];
first_name:string;
last_name:string;
phone_number:string;
address:string;
id:any;
constructor(jwttoken:string,username:string,autorities:Authority[],first_name:string,last_name:string,
    phone_number:string,address:string,id:any){
this.jwttoken=jwttoken;
this.username=username;
this.autorities=autorities;
this.first_name=first_name;
this.last_name=last_name;
this.phone_number=phone_number;
this.address=address;
this.id=id;
}
}