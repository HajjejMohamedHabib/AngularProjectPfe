import { Component, OnInit } from '@angular/core';
import { ResponseLogin } from 'src/app/models/responseLogin';
import { ContactUsServices } from 'src/app/services/contactUsServices';

@Component({
  selector: 'app-recommandation',
  templateUrl: './recommandation.component.html',
  styleUrls: ['./recommandation.component.css']
})
export class RecommandationComponent implements OnInit {
response:ResponseLogin;
token;
contacts;
searchInput;
  constructor(private contactServices:ContactUsServices) { }

  ngOnInit(): void {
    this.response=JSON.parse(localStorage.getItem('response'));
    this.token=this.response.jwttoken;
    this.contactServices.getContact(this.token).subscribe(data=>this.contacts=data);
  }

}
