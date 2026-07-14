import { AfterViewInit, ChangeDetectorRef, Component, inject, OnInit, OnDestroy} from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatFormField } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { ChatMessagePipe } from '../pipe/chat-message.pipe';
import { RandomColorPipe } from '../pipe/random-color.pipe';
import { MessageService } from '../services/http/message.service';
import { ConfigurationService } from '../services/configuration.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-chat',
  standalone: true,
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
  imports:[  
    CommonModule,
    FormsModule, 
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    RandomColorPipe,
    ChatMessagePipe
  ] 
})
export class ChatComponent implements OnInit , AfterViewInit, OnDestroy{

  num = 0;
  open = false;
  input = '';
  messages = [{ text: 'שלום! איך אפשר לעזור לך?', sender: '' }];
  private messagService = inject(MessageService);
  private configService = inject(ConfigurationService);
  private msgSub!: Subscription;
  private importantSub!: Subscription;
  private importantMessageDate = '';

  ngOnInit(): void {
    this.num = Math.random();
    this.msgSub = this.configService.messageEvent.subscribe(data => {
      try {
        const msg = JSON.parse(data);
        this.addMessage(msg.userName || msg.sender || '', msg.text || msg.message || data);
      } catch {
        this.addMessage('', data);
      }
    });
    this.importantSub = this.configService.importantEvent.subscribe(data => {
      try {
        const msg = JSON.parse(data);
        if (msg.date !== this.importantMessageDate) {
          this.importantMessageDate = msg.date;
        }
        this.addMessage('מנהל המשימות', `💥משימה &&${msg.name}&& חייבת להסתיים היום!`);
      } catch {}
    });
  }

  ngOnDestroy(): void {
    this.msgSub?.unsubscribe();
    this.importantSub?.unsubscribe();
  }

   ngAfterViewInit(): void {

  }

  send() {
    if (!this.input.trim()) return;
    const details = localStorage.getItem('user');
    let userName = '';
    if(details){
      userName = JSON.parse(details).userName;
    }
    this.messagService.sendMessage$(userName,this.input ).subscribe(); 
    this.input = '';
  }
  addMessage(userName:string, message: string){
     this.messages.push({ text: message, sender: userName });
     this.updateStyle();
  }

  updateStyle(){
     let elements = document.getElementsByClassName("chat-message"); 
     for(let  el of elements){
          el.innerHTML = (el.textContent || '').replace(/&&\s*(.*?)\s*&&/, '<span class="bold">$1</span>');
     }
  }
  openChat(){
     this.num =    Math.random();
     this.open= true;
  }
  closeChat(){
     this.open= false;
  }

  

}
