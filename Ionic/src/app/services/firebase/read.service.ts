import { Injectable } from '@angular/core';
import { getDatabase, push, ref, remove } from 'firebase/database';

@Injectable({
  providedIn: 'root'
})
export class ReadService {

  constructor() { }

  agregarRead(uid: string, accion: string,id: string, title: string, image: string, extension: string){
    const db = getDatabase();
    push(ref(db, `users/${uid}/leido/${accion}/${id}`), {
      id,
      title,
      image,
      extension
    });
  }

  agregarRead2(uid: string, accion: string,id: string, title: string){
    const db = getDatabase();
    push(ref(db, `users/${uid}/leido/${accion}/${id}`), {
      id,
      title
    });
  }

  quitarRead(uid: string, accion: string,id: string){
    const db = getDatabase();
    remove(ref(db, `users/${uid}/leido/${accion}/${id}`),);
  }
}
