export class CleForgotPassword{
    id;
	cleSecret;
	email;
    constructor(cleSecret:any,email:any){
        this.email=email;
        this.cleSecret=cleSecret;

    }
}