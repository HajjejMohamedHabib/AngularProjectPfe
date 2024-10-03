import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-choice-account-create',
  templateUrl: './choice-account-create.component.html',
  styleUrls: ['./choice-account-create.component.css']
})
export class ChoiceAccountCreateComponent implements OnInit {

  constructor(private route:Router) { }

  ngOnInit(): void {
  }
  goToCreateCustomerAccount(){
   this.route.navigateByUrl('login/compte/createCustomerAccount');
  }
  goToCreateVendorAccount(){
    this.route.navigateByUrl('login/compte/createVendorAccount');
  }
}
