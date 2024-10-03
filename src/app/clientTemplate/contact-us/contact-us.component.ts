import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ContactUs } from 'src/app/models/ContactUs';
import { ResponseLogin } from 'src/app/models/responseLogin';
import { ContactUsServices } from 'src/app/services/contactUsServices';
import {Stomp} from '@stomp/stompjs';
import * as SockJS from 'sockjs-client';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2'
@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent implements OnInit {
  registerForm: FormGroup;
  submitted = false;
  contact:ContactUs;
  first_name;
  last_name;
  phone_number;
  email;
  message;
  //variables notification
  nom_categorie;
  response:ResponseLogin;
  title = 'grokonez';
  description = 'Angular-WebSocket Demo';
  notifications:Notification[]=[];
  greetings: string[] = [];
  disabled = true;
  name: string;
  token;
  nbreNotifs=0;
  private stompClient = null;
  constructor(private contactServ:ContactUsServices,private formBuilder:FormBuilder,private route:Router) { }

  ngOnInit(): void {
    window.scroll(0,0);
    this.connect();
    //////
    let numberRegEx = /\-?\d*\.?\d{1,2}/;
    this.registerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      message:['',Validators.required],
      phoneNumber:['',[Validators.required,Validators.minLength(8),Validators.maxLength(8),Validators.pattern(numberRegEx)]],
  }
  );
  }
  get f() { return this.registerForm.controls; }
  //messageNotification
  setConnected(connected: boolean) {
    this.disabled = !connected;

    if (connected) {
      this.greetings = [];
    }
  }

  connect() {
   // this.response=JSON.parse(localStorage.getItem('response'));
//let token=this.response.jwttoken;
//let tokenstr='Bearer '+token;
  //  console.log(tokenstr);
   // const headers=new HttpHeaders().set('Authorization',tokenstr);
    let url='http://localhost:3600/gkz-stomp-endpoint/';
    //url = this.location.prepareExternalUrl(url);
    //url += '?access_token=' + token;
    console.log(url);
    const socket = new SockJS(url);
    this.stompClient = Stomp.over(socket);
    const _this = this;
    this.stompClient.connect({}, function (frame) {
      _this.setConnected(true);
      console.log('Connected: ' + frame);

      _this.stompClient.subscribe('/topic/messageNotif', function (hello) {
        _this.showGreeting(JSON.parse(hello.body).greeting);
      });
    });
  }

  disconnect() {
    if (this.stompClient != null) {
      this.stompClient.disconnect();
    }

    this.setConnected(false);
    console.log('Disconnected!');
  }
  ajouterContact(){
    this.submitted=true;
     if (this.registerForm.invalid) {
       return;
   }
    this.contactServ.ajouterContact(new ContactUs(this.first_name,this.last_name,this.phone_number,
      this.email,this.message)).subscribe(data=>{console.log(data);
        Swal.fire(
          'message sent!',
          'success!',
          'success'
        )
      });
     this.stompClient.send(
       '/gkz/messageNotif',
       {},
       JSON.stringify({'first_name':this.first_name,'last_name':this.last_name,
      'phone_number':this.phone_number,'email':this.email,'message':this.message})
     );
   // this.authentifServ.ajouter().subscribe(data=>console.log(data));
   }
  showGreeting(message) {
    this.greetings.push(JSON.parse(message));
    this.nbreNotifs=this.nbreNotifs +1;
    console.log(this.greetings);
  }
  addEventHandler(){
    let element = document.getElementsByClassName('ps__rail-y')[0] as HTMLElement;
    if(element){  
    element.addEventListener('click', this.scroll, true);
  }}
  
  scroll(e:Event){
    e.stopPropagation();
  }
  rendreNbreNotifZero(){
    this.nbreNotifs=0;
  }
}

