import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { ref, getDatabase, get, child } from 'firebase/database';
import { ApiService } from '../services/api.service';
import { AuthFirebaseService } from '../services/firebase/auth-firebase.service';
import { FavouriteService } from '../services/firebase/favourite.service';
import { ReadService } from '../services/firebase/read.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {
  id: any = this.route.snapshot.params.id;
  action: any = this.route.snapshot.queryParams.action;
  fav = false;
  read = false;
  public marvel: Array<any> = [];

  public logueado: boolean;
  public usuario: any;
  public uid = 'Invitado';
  public iconRead: string;
  public iconFav: string;

  constructor(private auth: AuthFirebaseService, private addFav: FavouriteService, private addRead: ReadService,
    private route: ActivatedRoute, private details: ApiService, private toastCtrl: ToastController) { }

  ngOnInit() {
    this.usuarioLogueado();
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
        this.comprobarFav();
      } else {
        this.logueado = false;
        this.comprobarFav();
      }
    });
    this.consultaApi();
  }

  comprobarFav() {
    const dbRef = ref(getDatabase());
    switch (this.action) {
      case 'characters':
        this.action = 'character';
        break;
      case 'comics':
        this.action = 'comic';
        break;
      case 'creators':
        this.action = 'creator';
        break;
      case 'series':
        this.action = 'serie';
        break;
    }
    get(child(dbRef, `users/${this.uid}/favoritos/${this.action}/${this.id}`)).then((snapshot) => {
      if (snapshot.exists()) {
        this.fav = true;
        this.iconFav = 'heart';
        this.comprobarRead();
      } else {
        console.log('No Fav');
        this.fav = false;
        this.iconFav = 'heart-dislike';
        this.comprobarRead();
      }
    }).catch((error) => {
      console.error(error);
    });
  }

  comprobarRead() {
    const dbRef = ref(getDatabase());
    get(child(dbRef, `users/${this.uid}/leido/${this.action}/${this.id}`)).then((snapshot) => {
      if (snapshot.exists()) {
        console.log(snapshot.val());
        this.read = true;
        this.iconRead = 'eye';
      } else {
        console.log('No read');
        this.read = false;
        this.iconRead = 'eye-off';
      }

    }).catch((error) => {
      console.error(error);
    });
  }

  agregarFav(title: string, image: string, extension: string) {
    this.addFav.agregarFav(this.uid, this.action, this.id, title, image, extension);
    this.fav = true;
  }

  agregarFav2(title: string) {
    this.addFav.agregarFav2(this.uid, this.action, this.id, title);
    this.fav = true;
  }

  eliminarFav() {
    this.addFav.quitarFav(this.uid, this.action, this.id);
    this.fav = false;
  }

  agregarRead(title: string, image: string, extension: string) {
    this.addRead.agregarRead(this.uid, this.action, this.id, title, image, extension);
    this.read = true;
  }

  agregarRead2(title: string) {
    this.addRead.agregarRead2(this.uid, this.action, this.id, title);
    this.read = true;
  }

  eliminarRead() {
    this.addRead.quitarRead(this.uid, this.action, this.id);
    this.read = false;
  }

  addFavBtn(title: string, image: string, extension: string) {
    if (this.fav) {
      this.eliminarFav();
      this.presentToast('Favourite Deleted');
    } else {
      this.agregarFav(title, image, extension);
      this.presentToast('Favourite Added');
    }
    this.comprobarFav();
  }

  addReadBtn(title: string, image: string, extension: string) {
    if (this.read) {
      this.eliminarRead();
      this.presentToast('Read Deleted');
    } else {
      this.agregarRead(title, image, extension);
      this.presentToast('Read Added');
    }
    this.comprobarFav();
  }

  addFavBtn2(title: string) {
    if (this.fav) {
      this.eliminarFav();
      this.presentToast('Favourite Deleted');
    } else {
      this.agregarFav2(title);
      this.presentToast('Favourite Added');
    }
    this.comprobarFav();
  }

  addReadBtn2(title: string) {
    if (this.read) {
      this.eliminarRead();
      this.presentToast('Read Deleted');
    } else {
      this.agregarRead2(title);
      this.presentToast('Read Added');
    }
    this.comprobarFav();
  }

  consultaApi() {
    switch (this.action) {
      case 'character':
        this.action = 'characters';
        break;
      case 'comic':
        this.action = 'comics';
        break;
      case 'creator':
        this.action = 'creators';
        break;
      case 'serie':
        this.action = 'series';
        break;
    }
    this.details.consultaDetailsMarvel(this.action, this.id).subscribe((res) => {
      this.marvel = res.data.results;
    });
  }

}
