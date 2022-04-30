/* eslint-disable no-var */
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActionSheetController, ToastController } from '@ionic/angular';
import { child, get, getDatabase, ref } from 'firebase/database';
import { ApiService } from '../services/api.service';
import { AuthFirebaseService } from '../services/firebase/auth-firebase.service';
import { FavouriteService } from '../services/firebase/favourite.service';

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.page.html',
  styleUrls: ['./favourites.page.scss'],
})
export class FavouritesPage implements OnInit {

  public logueado: boolean;
  public usuario: any;
  public uid = 'invitado';

  public action: Array<any> = ['character', 'comic', 'creator', 'events', 'serie', 'stories'];

  public viewFavCh: Array<any> = [];
  public viewFavCo: Array<any> = [];
  public viewFavCr: Array<any> = [];
  public viewFavEv: Array<any> = [];
  public viewFavSe: Array<any> = [];
  public viewFavSt: Array<any> = [];
  public cp = 0;

  fav = true;
  public idSearch = 'noID';
  public iconFav = 'heart';

  constructor(private service: AuthFirebaseService, private addFavourite: FavouriteService,
    private actionSheetController: ActionSheetController, private searchApi: ApiService,
    private toastCtrl: ToastController, private route: Router) {
    this.logueado = false;
  }

  ngOnInit() {
    this.usuarioLogueado();
  }

  usuarioLogueado() {
    this.service.getInfoUsuarioLoggeado().subscribe((res) => {
      if (res != null) {
        this.logueado = true;
        this.usuario = res;
        this.uid = res.uid;
        this.comprobarFav();
      } else {
        this.logueado = false;
        this.uid = 'invitado';
        this.route.navigate(['login']);
      }
    });
  }

  async presentToast(message: string) {
    const toast = await this.toastCtrl.create({
      message,
      duration: 2000
    });
    toast.present();
  }

  detallesSearch(id: string, newaction: string) {
    this.route.navigate(['details/', id], { queryParams: { action: newaction } });
  }

  comprobarFav() {
    const dbRef = ref(getDatabase());
    this.action.forEach(element => {
      get(child(dbRef, `users/${this.uid}/favoritos/${element}`)).then((snapshot) => {
        if (snapshot.exists()) {
          const array: Array<any> = [];
          switch (element) {
            case 'comic':
              var data = snapshot.val();
              array.push(data);

              for (const [key] of Object.entries(array[0])) {
                this.searchApi.consultaIDMarvel(`comics`, `${key}`).subscribe((res) => {
                  this.viewFavCo.push(res.data.results[0]);
                });
              }
              break;
            case 'serie':
              var data = snapshot.val();
              array.push(data);

              for (const [key] of Object.entries(array[0])) {
                this.searchApi.consultaIDMarvel(`series`, `${key}`).subscribe((res) => {
                  this.viewFavSe.push(res.data.results[0]);
                });
              }
              break;
            case 'stories':
              var data = snapshot.val();
              array.push(data);

              for (const [key] of Object.entries(array[0])) {
                this.searchApi.consultaIDMarvel(`stories`, `${key}`).subscribe((res) => {
                  this.viewFavSt.push(res.data.results[0]);
                });
              }
              break;
            case 'creator':
              var data = snapshot.val();
              array.push(data);

              for (const [key] of Object.entries(array[0])) {
                this.searchApi.consultaIDMarvel(`creators`, `${key}`).subscribe((res) => {
                  this.viewFavCr.push(res.data.results[0]);
                });
              }
              break;
            case 'character':
              var data = snapshot.val();
              array.push(data);

              for (const [key] of Object.entries(array[0])) {
                this.searchApi.consultaIDMarvel(`characters`, `${key}`).subscribe((res) => {
                  this.viewFavCh.push(res.data.results[0]);
                });
              }
              break;
            case 'events':
              var data = snapshot.val();
              array.push(data);

              for (const [key] of Object.entries(array[0])) {
                this.searchApi.consultaIDMarvel(`events`, `${key}`).subscribe((res) => {
                  this.viewFavEv.push(res.data.results[0]);
                });
              }
              break;
          }
        }
      });
    });
  }

  eliminarFav(action: string) {
    console.log(this.idSearch);
    this.addFavourite.quitarFav(this.uid, action, this.idSearch);
  }

  async presentActionSheet(id: any, newAction: string, title: string) {
    this.idSearch = id;
    const actionSheet = await this.actionSheetController.create({
      header: title,
      cssClass: 'my-custom-class',
      buttons: [{
        text: 'More Details',
        icon: 'add-circle',
        role: 'details',
        data: 0,
        handler: () => {
          this.route.navigate(['/details', this.idSearch], { queryParams: { action: newAction } });
        }
      }, {
        text: 'Fav',
        icon: this.iconFav,
        role: 'Fav',
        data: 0,
        handler: () => {
          if (this.fav) {
            this.eliminarFav(newAction);
            this.presentToast('Fav Deleted');
            location.reload();
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
