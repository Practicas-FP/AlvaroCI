import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActionSheetController, ToastController } from '@ionic/angular';
import { ref, getDatabase, get, child } from 'firebase/database';
import { ApiService } from '../services/api.service';
import { AuthFirebaseService } from '../services/firebase/auth-firebase.service';
import { FavouriteService } from '../services/firebase/favourite.service';
import { ReadService } from '../services/firebase/read.service';

@Component({
  selector: 'app-stories',
  templateUrl: './stories.page.html',
  styleUrls: ['./stories.page.scss'],
})
export class StoriesPage implements OnInit {

  public stories: Array<any> = [];
  public offset: any = '0';
  public limit: any = '100';
  public cp = 1;

  fav = false;
  read = false;
  public logueado: boolean;
  public usuario: any;
  public uid = 'Invitado';
  public idStorie = 'noID';
  public iconRead: string;
  public iconFav: string;

  constructor(private auth: AuthFirebaseService, private addFav: FavouriteService, private addRead: ReadService,
    private storie: ApiService, private route: Router, private actionSheetController: ActionSheetController,
    private toastCtrl: ToastController) { }

  ngOnInit(): void {
    this.llamadaGeneralStories();
    this.usuarioLogueado();
  }

  public llamadaGeneralStories() {
    this.storie.consultaStoriesMarvel(this.offset, this.limit).subscribe((res) => {
      console.log('Respuesta', res);
      this.stories = res.data.results;
    });
  }

  async presentToast( message: string) {
    const toast = await this.toastCtrl.create({
    message,
    duration: 2000
    });
    toast.present();
  }

  usuarioLogueado() {
    this.auth.getInfoUsuarioLoggeado().subscribe((res) => {
      if (res != null) {
        this.logueado = true;
        this.usuario = res;
        this.uid = res.uid;
      } else {
        this.logueado = false;
      }
    });
  }

  comprobarFav(id: string, title: string) {
    this.idStorie = id;
    const dbRef = ref(getDatabase());
    get(child(dbRef, `users/${this.uid}/favoritos/stories/${this.idStorie}`)).then((snapshot) => {
      if (snapshot.exists()) {
        this.fav = true;
        this.iconFav = 'heart';
        this.comprobarRead(title);
      } else {
        console.log('No Fav');
        this.fav = false;
        this.iconFav = 'heart-dislike';
        this.comprobarRead(title);
      }
    }).catch((error) => {
      console.error(error);
    });
  }

  comprobarRead(title: string) {
    const dbRef = ref(getDatabase());
    get(child(dbRef, `users/${this.uid}/leido/stories/${this.idStorie}`)).then((snapshot) => {
      if (snapshot.exists()) {
        console.log(snapshot.val());
        this.read = true;
        this.iconRead = 'eye';
        this.presentActionSheet(title);
      } else {
        console.log('No read');
        this.read = false;
        this.iconRead = 'eye-off';
        this.presentActionSheet(title);
      }
    }).catch((error) => {
      console.error(error);
    });
  }

  agregarFav(title: string) {
    this.addFav.agregarFav2(this.uid, 'stories', this.idStorie, title);
    this.fav = true;
  }

  eliminarFav() {
    this.addFav.quitarFav(this.uid, 'stories', this.idStorie);
    this.fav = false;
  }

  agregarRead(title: string) {
    this.addRead.agregarRead2(this.uid, 'stories', this.idStorie, title);
    this.read = true;
  }

  eliminarRead() {
    this.addRead.quitarRead(this.uid, 'stories', this.idStorie);
    this.read = false;
  }

  async presentActionSheet(title: string) {
    const actionSheet = await this.actionSheetController.create({
      header: title,
      cssClass: 'my-custom-class',
      buttons: [{
        text: 'More Details',
        icon: 'add-circle',
        role: 'details',
        data: 0,
        handler: () => {
          this.route.navigate(['details/', this.idStorie], { queryParams: { action: 'stories' } });
        }
      },{
        text: 'Favorite',
        icon: this.iconFav,
        role: 'Favorite',
        data: 0,
        handler: () => {
          if(this.fav){
            this.eliminarFav();
            this.presentToast('Favourite Deleted');
          }else{
            this.agregarFav(title);
            this.presentToast('Favourite Added');
          }
        }
      }, {
        text: 'Read',
        icon: this.iconRead,
        role: 'Read',
        data: 0,
        handler: () => {
          if(this.read){
            this.eliminarRead();
            this.presentToast('Read Deleted');
          }else{
            this.agregarRead(title);
            this.presentToast('Read Added');
          }
        }
      }, {
        text: 'Cancel',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();

    const { role, data } = await actionSheet.onDidDismiss();
    console.log('onDidDismiss resolved with role and data =>... ', role, data);
  }
}
