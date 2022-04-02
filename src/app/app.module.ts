import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { HomeComponentComponent } from './home-component/home-component.component';
import { ErrorPersonalizadoComponentComponent } from './error-personalizado-component/error-personalizado-component.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponentComponent } from './login-component/login-component.component';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from 'src/environments/environment';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AuthFirebaseService } from './service/firebase/auth-firebase.service';
import { RegistroComponentComponent } from './registro-component/registro-component.component';
import { PerfilComponentComponent } from './perfil-component/perfil-component.component';
import { LogOutComponentComponent } from './log-out-component/log-out-component.component';
import { EditarComponentComponent } from './editar-component/editar-component.component';
import { MenuComponentComponent } from './menu-component/menu-component.component';
import { PeliculasComponentComponent } from './peliculas-component/peliculas-component.component';
import { ComicsComponentComponent } from './comics-component/comics-component.component';
import { GamesComponentComponent } from './games-component/games-component.component';

const appRoutes: Routes = [
  {
    //home
    path: '',
    component: HomeComponentComponent,
  },
  {
    //Login
    path: 'login',
    component: LoginComponentComponent,
  },
  {
    //Perfil
    path: 'perfil',
    component: PerfilComponentComponent,
  },
  {
    //logOut
    path: 'logout',
    component: LogOutComponentComponent,
  },
  {
    //Editar
    path: 'editar',
    component: EditarComponentComponent,
  },
  {
    //Registro
    path: 'registro',
    component: RegistroComponentComponent,
  },
  {
    //Peliculas
    path: 'peliculas',
    component: PeliculasComponentComponent,
  },
  {
    //Comics
    path: 'comics',
    component: ComicsComponentComponent,
  },
  {
    //Games
    path: 'games',
    component: GamesComponentComponent,
  },
  {
    //Error 404
    path: '**',
    component: ErrorPersonalizadoComponentComponent,

  },
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponentComponent,
    ErrorPersonalizadoComponentComponent,
    LoginComponentComponent,
    RegistroComponentComponent,
    PerfilComponentComponent,
    LogOutComponentComponent,
    EditarComponentComponent,
    MenuComponentComponent,
    PeliculasComponentComponent,
    ComicsComponentComponent,
    GamesComponentComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes),
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
  ],
  providers: [AuthFirebaseService],
  bootstrap: [AppComponent],
})
export class AppModule {}
