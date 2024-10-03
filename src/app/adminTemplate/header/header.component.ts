import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { ResponseLogin } from 'src/app/models/responseLogin';
import { ServiceNot } from 'src/app/services/ServiceNot';
import {Stomp} from '@stomp/stompjs';
import * as SockJS from 'sockjs-client';
import{Location} from '@angular/common';
import{Notification} from '../../models/Notification'
import { ContactUsServices } from 'src/app/services/contactUsServices';
import { ContactUs } from 'src/app/models/ContactUs';
import { ResponseContactUs } from 'src/app/models/responseContactUs';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  nom_categorie;
  response:ResponseLogin;
  title = 'grokonez';
  description = 'Angular-WebSocket Demo';
  notifications:Notification[]=[];
  greetings: string[] = [];
  greetings2: string[] = [];
  disabled = true;
  name: string;
  token;
  nbreNotifs=0;
  nbreMessages=0;
  contacts:ResponseContactUs[];
  private stompClient = null;
  role;
  constructor(private route:Router
    ,private authentifServ:ServiceNot,private location:Location,private contact:ContactUsServices) { }
  ngOnInit(): void {
    this.response=JSON.parse(localStorage.getItem('response'));
    this.token=this.response.jwttoken;
    this.role=this.response.autorities[0].authority;
    this.connect();
    this.authentifServ.getNotif(this.token).subscribe(data=>{this.notifications=data
    this.notifications.sort(function (a, b){
      return b.id - a.id;
    })
    });
    this.contact.getContact(this.token).subscribe(data=>{this.contacts=data
    this.contacts.sort(function (a, b) {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    })
    });
  }
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

      _this.stompClient.subscribe('/topic/hi', function (hello) {
        _this.showGreeting(JSON.parse(hello.body).greeting);
      });
      _this.stompClient.subscribe('/topic/messageNotif', function (hello) {
        _this.showGreeting2(JSON.parse(hello.body).greeting);
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

  // sendName() {
  //    this.response=JSON.parse(localStorage.getItem('response'));
  //    let first_name=this.response.first_name;
  //    let last_name=this.response.last_name;
  //   this.stompClient.send(
  //     '/gkz/hello',
  //     {},
  //     JSON.stringify({ 'content': first_name+' '+last_name })
  //   );
  //  this.authentifServ.ajouter().subscribe(data=>console.log(data));
  // }

  showGreeting(message) {
    this.greetings.push(message);
    this.nbreNotifs=this.nbreNotifs +1;
    console.log(this.greetings);
  }
  showGreeting2(message) {
    this.greetings2.push(JSON.parse(message));
    this.nbreMessages=this.nbreMessages+1;
    //this.nbreNotifs=this.nbreNotifs +1;
    console.log(this.greetings2);
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
  rendreNbreMessagesZero(){
    this.nbreMessages=0;
  }
}
