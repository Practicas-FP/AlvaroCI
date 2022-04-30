import { Injectable } from '@angular/core';
import { AngularFireList, AngularFireDatabase } from '@angular/fire/compat/database';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ToastController } from '@ionic/angular';
import { UserPhoto } from 'src/app/interface/user-photo';

@Injectable({
  providedIn: 'root'
})
export class PhotoFireService {

  public userPhoto: UserPhoto;
  private firebaseUserPhoto: AngularFireList<string>;

  constructor(private db: AngularFireDatabase, public firestore: AngularFirestore,
    public toastCtrl: ToastController) { }

  async presentToast(message: string) {
    const toast = await this.toastCtrl.create({
      message,
      duration: 2000
    });
    toast.present();
  }
  getUserPhoto(uid: any): AngularFireList<string> {
    this.firebaseUserPhoto = this.db.list(`users/${uid}/photo`);
    return this.firebaseUserPhoto;
  }

  addUserPhoto(uid: any, photoBase64: string) {
    this.firebaseUserPhoto = this.getUserPhoto(uid);
    this.firebaseUserPhoto.remove();
    this.firebaseUserPhoto.push(photoBase64)
      .then(() => {
        this.presentToast('Photo updated successfully.');
      })
      .catch((error) => {
        this.presentToast(error.message);
      });
  }

  deleteUserPhoto(uid: any, key: string) {
    this.firebaseUserPhoto = this.getUserPhoto(uid);
    this.firebaseUserPhoto.remove(key)
      .then(() => {
        this.presentToast('Deleted photo');
        location.reload();
      })
      .catch((error) => {
        this.presentToast(`Failed to delete photo: ${error.message}`);
      });
  }
}
