import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { child, get, getDatabase, ref } from 'firebase/database';
import { AuthFirebaseService } from '../services/firebase/auth-firebase.service';
import { PhotoService } from '../services/photo/photo.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  public logueado: boolean;
  public usuario: any;
  public uid = 'invitado';
  public accion: string[] = ['comic', 'character', 'creator', 'events', 'serie', 'stories'];
  public countFav = 0;
  public countRead = 0;
  public userPhoto: string;
  public userName: string;
  public userName3: string[];
  public userName2: any;

  constructor(private service: AuthFirebaseService, private route: Router, public picture: PhotoService,
  ) {
    this.logueado = false;
  }

  ngOnInit(): void {
    this.usuarioLogueado();
    this.picture.getUserPhoto(this.uid);
  }

  usuarioLogueado() {
    this.service.getInfoUsuarioLoggeado().subscribe((res) => {
      if (res != null) {
        this.logueado = true;
        this.usuario = res;
        this.uid = res.uid;
        this.userPhoto = res.photoURL;
        this.userName = res.displayName;
        if (!res.displayName) {
          this.userName3 = res.email.split('@');
          this.userName2 = this.userName3[0];
        }
        this.comprobarFav();
        this.comprobarRead();

      } else {
        this.logueado = false;
        this.uid = 'invitado';
      }
      if (this.uid === 'invitado') {
        this.route.navigate(['login']);
      } else {
        this.route.navigate(['profile']);
      }
    });
  }

  comprobarFav() {
    const dbRef = ref(getDatabase());
    this.accion.forEach((accion: string) => {
      get(child(dbRef, `users/${this.uid}/favoritos/${accion}`)).then((snapshot) => {
        if (snapshot.exists()) {
          this.countFav += snapshot.size;
        } else {
          console.log('No Fav');
        }
      }).catch((error) => {
        console.error(error);
      });
    });
  }

  comprobarRead() {
    const dbRef = ref(getDatabase());
    this.accion.forEach((accion: string) => {
      get(child(dbRef, `users/${this.uid}/leido/${accion}`)).then((snapshot) => {
        if (snapshot.exists()) {
          this.countRead += snapshot.size;
        } else {
          console.log('No read');
        }
      }).catch((error) => {
        console.error(error);
      });
    });
  }

  changeName(name: any) {
    this.service.updateUsuario(name);
    this.route.navigate(['/profile']);
    location.reload();
  }

  takePicture() {
    if (this.uid !== 'invitado') {
      this.picture.addNewToGallery(this.uid);
    }
  }
}
