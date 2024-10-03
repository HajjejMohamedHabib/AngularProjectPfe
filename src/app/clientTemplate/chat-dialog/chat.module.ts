import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChatService } from './../../services/chatServices';
import { ChatDialogComponent } from './chat-dialog.component';
@NgModule({
imports: [
CommonModule,
FormsModule
],
declarations: [
ChatDialogComponent
],
exports: [ ChatDialogComponent ], // &lt;-- export here
providers: [ChatService]
})
export class ChatModule { }
