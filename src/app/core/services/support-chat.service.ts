import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SupportChatService {
  constructor(private socket: Socket) {
  }

  onConnect(): void {
    this.socket.on('connect', () => {
      console.log('support chat socket is connected');
    });
  }

  getAllMessages(): Observable<string[]> {
    this.socket.emit('messages');
    return this.socket.fromEvent('messages');
  }

  sendMessage(message: string): void {
    this.socket.emit('message', message);
  }

  listenMessage(): Observable<string> {
    return this.socket.fromEvent('message');
  }

  reset(): void {
    this.socket.removeAllListeners('message');
  }
}
