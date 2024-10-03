import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ChatService, Message } from 'src/app/services/chatServices';
import { scan} from 'rxjs/operators';
@Component({
  selector: 'app-chat-dialog',
  templateUrl: './chat-dialog.component.html',
  styleUrls: ['./chat-dialog.component.css']
})
export class ChatDialogComponent implements OnInit {
formValue:string;
messages:Observable<Message[]>


  constructor(private chatServices:ChatService) { }

  ngOnInit(): void {
    this.messages = this.chatServices.conversation.asObservable().pipe(
    scan((acc, val) => acc.concat(val) ));
  }
  sendMessage() {
    this.chatServices.converse(this.formValue);
    this.formValue = '';
    }
}
