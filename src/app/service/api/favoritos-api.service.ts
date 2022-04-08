import { Injectable } from '@angular/core';
import { getDatabase, ref, remove, set } from '@angular/fire/database';
import { push } from 'firebase/database';
import { Comic } from 'src/app/interface/comicInterface.interface';

@Injectable({
  providedIn: 'root'
})
export class FavoritosApiService {

  constructor() { }

  agregarFav(accion: string,id: string, title: string, image: string, extension: string){
    const db = getDatabase();
    push(ref(db, `users/favoritos/${accion}/${id}`), {
      id: id,
      title: title,
      image : image,
      extension: extension
    });
  }

  agregarFav2(accion: string,id: string, title: string){
    const db = getDatabase();
    push(ref(db, `users/favoritos/${accion}/${id}`), {
      id: id,
      title: title
    });
  }

  quitarFav(accion: string, id: String){
    const db = getDatabase();
    remove(ref(db, `users/favoritos/${accion}/${id}`),);

  }
}

