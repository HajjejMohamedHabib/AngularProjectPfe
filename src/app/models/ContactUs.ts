export class ContactUs{
    first_name:string;
    last_name:string;
    phone_number:string;
    email:string;
    message:string;
    date;
    constructor(first_name:string,last_name:string,phone_number:string,email:string,message:string){
      this.first_name=first_name;
      this.last_name=last_name;
      this.phone_number=phone_number;
      this.email=email;
      this.message=message;
    }
}