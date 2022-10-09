import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  constructor(private socket: Socket) { }

  emit(evento: string, payload?: any, callback?: Function) {
    console.log('Emitiendo mensaje', evento);
    this.socket.emit(evento, payload, callback);
  }
  // escuchar los sockets por medio de un evento
  listen(evento: string) {
    return this.socket.fromEvent(evento);
  }
}
