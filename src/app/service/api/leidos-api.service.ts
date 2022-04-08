import { Injectable } from '@angular/core';
import { getDatabase, push, ref, remove } from 'firebase/database';

@Injectable({
  providedIn: 'root'
})
export class LeidosApiService {

  constructor() { }

  agregarRead(accion: string,id: string, title: string, image: string, extension: string){
    const db = getDatabase();
    push(ref(db, `users/leido/${accion}/${id}`), {
      id: id,
      title: title,
      image : image,
      extension: extension
    });
  }

  agregarRead2(accion: string,id: string, title: string){
    const db = getDatabase();
    push(ref(db, `users/leido/${accion}/${id}`), {
      id: id,
      title: title
    });
  }

  quitarRead(accion: string,id: String){
    const db = getDatabase();
    remove(ref(db, `users/leido/${accion}/${id}`),);
  }
}
