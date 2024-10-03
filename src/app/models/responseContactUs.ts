export class ResponseContactUs{
    id:any
    first_name:string;
    last_name:string;
    phone_number:string;
    email:string;
    message:string;
    date:string
    constructor(id:any,first_name:string,last_name:string,phone_number:string,email:string,message:string,date:string){
      this.id=id;     
      this.first_name=first_name;
      this.last_name=last_name;
      this.phone_number=phone_number;
      this.email=email;
      this.message=message;
      this.date=date;
    }
}