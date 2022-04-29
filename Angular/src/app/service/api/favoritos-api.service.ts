import { Injectable } from '@angular/core';
import { getDatabase, ref, remove, set } from '@angular/fire/database';
import { push } from 'firebase/database';
import { AuthFirebaseService } from '../firebase/auth-firebase.service';

@Injectable({
  providedIn: 'root'
})
export class FavoritosApiService {
  constructor(private auth: AuthFirebaseService) { }

  agregarFav(uid: string, accion: string, id: string, title: string, image: string, extension: string) {
    const db = getDatabase();
    push(ref(db, `users/${uid}/favoritos/${accion}/${id}`), {
      id: id,
      title: title,
      image: image,
      extension: extension
    });
  }

  agregarFav2(uid: string, accion: string, id: string, title: string) {
    const db = getDatabase();
    push(ref(db, `users/${uid}/favoritos/${accion}/${id}`), {
      id: id,
      title: title
    });
  }

  quitarFav(uid: string, accion: string, id: String) {
    const db = getDatabase();
    remove(ref(db, `users/${uid}/favoritos/${accion}/${id}`),);

  }
}

