export class Response{
token:string;
username:string;
authority:string[];
constructor(token:string,username:string,authority:string[]){
this.token=token;
this.username=username;
this.authority=authority;
}
}