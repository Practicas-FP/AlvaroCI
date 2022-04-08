import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireObject } from '@angular/fire/compat/database';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FavoritosApiService {
  tutorial!: AngularFireObject<any>;
  tutorials!: Observable<any[]>;
  constructor(private db: AngularFireDatabase) { }
  
  agregarFav(){
    this.tutorial= this.db.object('tutorial');
  }
  quitarFac(){
    const tutRef = this.db.object('tutorial');
    tutRef.remove();
  }
}
