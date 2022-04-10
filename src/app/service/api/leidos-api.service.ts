import { Injectable } from '@angular/core';
import { getDatabase, push, ref, remove } from 'firebase/database';

@Injectable({
  providedIn: 'root'
})
export class LeidosApiService {

  constructor(){}


  agregarRead(uid: string, accion: string,id: string, title: string, image: string, extension: string){
    const db = getDatabase();
    push(ref(db, `users/${uid}/leido/${accion}/${id}`), {
      id: id,
      title: title,
      image : image,
      extension: extension
    });
  }

  agregarRead2(uid: string, accion: string,id: string, title: string){
    const db = getDatabase();
    push(ref(db, `users/${uid}/leido/${accion}/${id}`), {
      id: id,
      title: title
    });
  }

  quitarRead(uid: string, accion: string,id: String){
    const db = getDatabase();
    remove(ref(db, `users/${uid}/leido/${accion}/${id}`),);
  }
}
