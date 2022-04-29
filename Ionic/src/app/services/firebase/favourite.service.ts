import { Injectable } from '@angular/core';
import { getDatabase, push, ref, remove } from 'firebase/database';

@Injectable({
  providedIn: 'root'
})
export class FavouriteService {

  constructor() { }

  agregarFav(uid: string, accion: string, id: string, title: string, image: string, extension: string) {
    const db = getDatabase();
    push(ref(db, `users/${uid}/favoritos/${accion}/${id}`), {
      id,
      title,
      image,
      extension
    });
  }

  agregarFav2(uid: string, accion: string, id: string, title: string) {
    const db = getDatabase();
    push(ref(db, `users/${uid}/favoritos/${accion}/${id}`), {
      id,
      title
    });
  }

  quitarFav(uid: string, accion: string, id: string) {
    const db = getDatabase();
    remove(ref(db, `users/${uid}/favoritos/${accion}/${id}`),);

  }
}
