import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActionSheetController, ToastController } from '@ionic/angular';
import { ref, getDatabase, get, child } from 'firebase/database';
import { ApiSearchService } from '../services/api-search.service';
import { AuthFirebaseService } from '../services/firebase/auth-firebase.service';
import { FavouriteService } from '../services/firebase/favourite.service';
import { ReadService } from '../services/firebase/read.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  action = 'empty';
  storiesFilter = false;
  creatorFilter = false;
  characterFilter = false;
  public searchArray: Array<any> = [];
  public cp = 0;

  fav = false;
  read = false;
  public logueado: boolean;
  public usuario: any;
  public uid = 'Invitado';
  public idSearch = 'noID';
  public iconRead: string;
  public iconFav: string;

  constructor(private auth: AuthFirebaseService, private addFav: FavouriteService, private addRead: ReadService,
    private actionSheetController: ActionSheetController, private searchApi: ApiSearchService,
    private toastCtrl: ToastController, private route: Router) { }

  ngOnInit() {
    this.usuarioLogueado();
  }

  public llamadaGeneral(key: string) {
    this.searchApi.consultaMarvel(this.action, key).subscribe((res) => {
      console.log('Respuesta', res);
      this.searchArray = res.data.results;
    });
  }

  async presentToast(message: string) {
    const toast = await this.toastCtrl.create({
      message,
      duration: 2000
    });
    toast.present();
  }

  onKeyup(key2: string) {
    if (this.action === 'empty') {
      this.presentToast('Select filter before search something...');
    } else {
      this.llamadaGeneral(key2);
      console.log(key2);
    }
  }

  filtro(event: Event) {
    // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
    this.action = (<HTMLInputElement>event.target).value;
    console.log(this.action);
    if (this.action === 'Stories') {
      this.searchArray = [];
      this.storiesFilter = true;
      this.characterFilter = false;
      this.creatorFilter = false;
      this.llamadaGeneral('a');
    }
    else if (this.action === 'Creators') {
      this.creatorFilter = true;
      this.searchArray = [];
      this.storiesFilter = false;
      this.characterFilter = false;
    }
    else if (this.action === 'Characters') {
      this.characterFilter = true;
      this.creatorFilter = false;
      this.searchArray = [];
      this.storiesFilter = false;
    }
    else {
      this.storiesFilter = false;
      this.searchArray = [];
      this.creatorFilter = false;
      this.characterFilter = false;
    }
  }

  detallesSearch(id: string) {
    let newAccion: string;
    console.log(this.action);
    switch (this.action) {
      case 'Series':
        newAccion = 'serie';
        break;
      case 'Comics':
        newAccion = 'comic';
        break;
      case 'Characters':
        newAccion = 'character';
        break;
      case 'Events':
        newAccion = 'events';
        break;
      case 'Stories':
        newAccion = 'stories';
        break;
      case 'Creators':
        newAccion = 'creator';
        break;
    }
    this.route.navigate(['details/', id], { queryParams: { action: newAccion } });
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
    this.idSearch = id;
    this.ionicSearchToFirebase();
    const dbRef = ref(getDatabase());
    get(child(dbRef, `users/${this.uid}/favoritos/${this.action}/${this.idSearch}`)).then((snapshot) => {
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
    get(child(dbRef, `users/${this.uid}/leido/${this.action}/${this.idSearch}`)).then((snapshot) => {
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

  comprobarFav2(id: string, title: string) {
    this.idSearch = id;
    this.ionicSearchToFirebase();
    const dbRef = ref(getDatabase());
    get(child(dbRef, `users/${this.uid}/favoritos/${this.action}/${this.idSearch}`)).then((snapshot) => {
      if (snapshot.exists()) {
        this.fav = true;
        this.iconFav = 'heart';
        this.comprobarRead2(title);
      } else {
        console.log('No Fav');
        this.fav = false;
        this.iconFav = 'heart-dislike';
        this.comprobarRead2(title);
      }
    }).catch((error) => {
      console.error(error);
    });
  }

  comprobarRead2(title: string) {
    const dbRef = ref(getDatabase());
    get(child(dbRef, `users/${this.uid}/leido/${this.action}/${this.idSearch}`)).then((snapshot) => {
      if (snapshot.exists()) {
        console.log(snapshot.val());
        this.read = true;
        this.iconRead = 'eye';
        this.presentActionSheet2(title);
      } else {
        console.log('No read');
        this.read = false;
        this.iconRead = 'eye-off';
        this.presentActionSheet2(title);
      }
    }).catch((error) => {
      console.error(error);
    });
  }

  agregarFav(title: string, image: string, extension: string) {
    this.addFav.agregarFav(this.uid, this.action, this.idSearch, title, image, extension);
    this.fav = true;
  }

  agregarFav2(title: string) {
    this.addFav.agregarFav2(this.uid, this.action, this.idSearch, title);
    this.fav = true;
  }

  eliminarFav() {
    this.addFav.quitarFav(this.uid, this.action, this.idSearch);
    this.fav = false;
  }

  agregarRead(title: string, image: string, extension: string) {
    this.addRead.agregarRead(this.uid, this.action, this.idSearch, title, image, extension);
    this.read = true;
  }

  agregarRead2(title: string) {
    this.addRead.agregarRead2(this.uid, this.action, this.idSearch, title);
    this.read = true;
  }

  eliminarRead() {
    this.addRead.quitarRead(this.uid, this.action, this.idSearch);
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
          this.firebaseToIonicSearch();
          this.detallesSearch(this.idSearch);
        }
      }, {
        text: 'Favorite',
        icon: this.iconFav,
        role: 'Favorite',
        data: 0,
        handler: () => {
          if (this.fav) {
            this.eliminarFav();
            this.presentToast('Favourite Deleted');
          } else {
            this.agregarFav(title, image, extension);
            this.presentToast('Favourite Added');
          }
          this.firebaseToIonicSearch();
        }
      }, {
        text: 'Read',
        icon: this.iconRead,
        role: 'Read',
        data: 0,
        handler: () => {
          if (this.read) {
            this.eliminarRead();
            this.presentToast('Read Deleted');
          } else {
            this.agregarRead(title, image, extension);
            this.presentToast('Read Added');
          }
          this.firebaseToIonicSearch();
        }
      }, {
        text: 'Cancel',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          this.firebaseToIonicSearch();
          console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();

    const { role, data } = await actionSheet.onDidDismiss();
    console.log('onDidDismiss resolved with role and data =>... ', role, data);
  }

  async presentActionSheet2(title: string) {
    const actionSheet = await this.actionSheetController.create({
      header: title,
      cssClass: 'my-custom-class',
      buttons: [{
        text: 'More Details',
        icon: 'add-circle',
        role: 'details',
        data: 0,
        handler: () => {
          this.firebaseToIonicSearch();
          this.detallesSearch(this.idSearch);
        }
      }, {
        text: 'Favorite',
        icon: this.iconFav,
        role: 'Favorite',
        data: 0,
        handler: () => {
          if (this.fav) {
            this.eliminarFav();
            this.presentToast('Favourite Deleted');
          } else {
            this.agregarFav2(title);
            this.presentToast('Favourite Added');
          }
          this.firebaseToIonicSearch();
        }
      }, {
        text: 'Read',
        icon: this.iconRead,
        role: 'Read',
        data: 0,
        handler: () => {
          if (this.read) {
            this.eliminarRead();
            this.presentToast('Read Deleted');
          } else {
            this.agregarRead2(title);
            this.presentToast('Read Added');
          }
          this.firebaseToIonicSearch();
        }
      }, {
        text: 'Cancel',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          this.firebaseToIonicSearch();
          console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();

    const { role, data } = await actionSheet.onDidDismiss();
    console.log('onDidDismiss resolved with role and data =>... ', role, data);
  }

  ionicSearchToFirebase(){
    switch (this.action) {
      case 'Characters':
        this.action = 'character';
        break;
      case 'Comics':
        this.action = 'comic';
        break;
      case 'Creators':
        this.action = 'creator';
        break;
      case 'Series':
        this.action = 'serie';
        break;
      case 'Events':
        this.action = 'events';
        break;
      case 'Stories':
        this.action = 'stories';
        break;
    }
  }

  firebaseToIonicSearch(){
    switch (this.action) {
      case 'character':
        this.action = 'Characters';
        break;
      case 'comic':
        this.action = 'Comics';
        break;
      case 'creator':
        this.action = 'Creators';
        break;
      case 'serie':
        this.action = 'Series';
        break;
      case 'events':
        this.action = 'Events';
        break;
      case 'stories':
        this.action = 'Stories';
        break;
    }
  }
}
