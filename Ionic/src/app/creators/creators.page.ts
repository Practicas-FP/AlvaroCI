import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActionSheetController, ToastController } from '@ionic/angular';
import { ref, getDatabase, get, child } from 'firebase/database';
import { ApiService } from '../services/api.service';
import { AuthFirebaseService } from '../services/firebase/auth-firebase.service';
import { FavouriteService } from '../services/firebase/favourite.service';
import { ReadService } from '../services/firebase/read.service';

@Component({
  selector: 'app-creators',
  templateUrl: './creators.page.html',
  styleUrls: ['./creators.page.scss'],
})
export class CreatorsPage implements OnInit {

  public creators: Array<any> = [];
  public offset: any = '0';
  public limit: any = '100';
  public cp = 1;

  fav = false;
  read = false;
  public logueado: boolean;
  public usuario: any;
  public uid = 'Invitado';
  public idCreator = 'noID';
  public iconRead: string;
  public iconFav: string;

  constructor(private auth: AuthFirebaseService, private addFav: FavouriteService, private addRead: ReadService,
    private creator: ApiService, private route: Router, private actionSheetController: ActionSheetController,
    private toastCtrl: ToastController) { }

  ngOnInit(): void {
    this.llamadaGeneralCreators();
    this.usuarioLogueado();
  }

  public llamadaGeneralCreators() {
    this.creator.consultaCreatorsMarvel(this.offset, this.limit).subscribe((res) => {
      console.log('Respuesta', res);
      this.creators = res.data.results;
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

  comprobarFav(id: string, title: string, image: string, extension: string) {
    this.idCreator = id;
    const dbRef = ref(getDatabase());
    get(child(dbRef, `users/${this.uid}/favoritos/creator/${this.idCreator}`)).then((snapshot) => {
      if (snapshot.exists()) {
        this.fav = true;
        this.iconFav = 'heart';
        this.comprobarRead(title, image, extension);
      } else {
        console.log('No Fav');
        this.fav = false;
        this.iconFav = 'heart-dislike';
        this.comprobarRead(title, image, extension);
      }
    }).catch((error) => {
      console.error(error);
    });
  }

  comprobarRead(title: string, image: string, extension: string) {
    const dbRef = ref(getDatabase());
    get(child(dbRef, `users/${this.uid}/leido/creator/${this.idCreator}`)).then((snapshot) => {
      if (snapshot.exists()) {
        console.log(snapshot.val());
        this.read = true;
        this.iconRead = 'eye';
        this.presentActionSheet(title, image, extension);
      } else {
        console.log('No read');
        this.read = false;
        this.iconRead = 'eye-off';
        this.presentActionSheet(title, image, extension);
      }
    }).catch((error) => {
      console.error(error);
    });
  }

  agregarFav(title: string, image: string, extension: string) {
    this.addFav.agregarFav(this.uid, 'creator', this.idCreator, title, image, extension);
    this.fav = true;
  }

  eliminarFav() {
    this.addFav.quitarFav(this.uid, 'creator', this.idCreator);
    this.fav = false;
  }

  agregarRead(title: string, image: string, extension: string) {
    this.addRead.agregarRead(this.uid, 'creator', this.idCreator, title, image, extension);
    this.read = true;
  }

  eliminarRead() {
    this.addRead.quitarRead(this.uid, 'creator', this.idCreator);
    this.read = false;
  }

  async presentActionSheet(title: string, image: string, extension: string) {
    const actionSheet = await this.actionSheetController.create({
      header: title,
      cssClass: 'my-custom-class',
      buttons: [{
        text: 'More Details',
        icon: 'add-circle',
        role: 'details',
        data: 0,
        handler: () => {
          this.route.navigate(['details/', this.idCreator], { queryParams: { action: 'creators' } });
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
            this.agregarFav(title, image, extension);
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
            this.agregarRead(title, image, extension);
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
