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
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { RegistroComponentComponent } from './registro-component/registro-component.component';
import { PerfilComponentComponent } from './perfil-component/perfil-component.component';
import { LogOutComponentComponent } from './log-out-component/log-out-component.component';
import { EditarComponentComponent } from './editar-component/editar-component.component';
import { MenuComponentComponent } from './menu-component/menu-component.component';
import { ComicsComponentComponent } from './comics-component/comics-component.component';
import { charactersComponentComponent } from './characters-component/characters-component.component';
import { HttpClientModule } from '@angular/common/http';
import { NgxPaginationModule } from 'ngx-pagination';
import { CreatorsComponentComponent } from './creators-component/creators-component.component';
import { EventsComponentComponent } from './events-component/events-component.component';
import { SeriesComponentComponent } from './series-component/series-component.component';
import { StoriesComponentComponent } from './stories-component/stories-component.component';
import { FavoritosComponentComponent } from './favoritos-component/favoritos-component.component';
import { VistosComponentComponent } from './vistos-component/vistos-component.component';
import { DetallesComponentComponent } from './detalles-component/detalles-component.component';
import { SearchComponentComponent } from './search-component/search-component.component';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';

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
    //Series
    path: 'series',
    component: SeriesComponentComponent,
  },
  {
    //Comics
    path: 'comics',
    component: ComicsComponentComponent,
  },
  {
    //Characters
    path: 'personajes',
    component: charactersComponentComponent,
  },
  {
    //Events
    path: 'events',
    component: EventsComponentComponent,
  },
  {
    //Historias
    path: 'stories',
    component: StoriesComponentComponent,
  },
  {
    //Creadores
    path: 'creators',
    component: CreatorsComponentComponent,
  },
  {
    //Favoritos
    path: 'favoritos',
    component: FavoritosComponentComponent,
  },
  {
    //Vistos
    path: 'read',
    component: VistosComponentComponent,
  },
  {
    //Detalles
    path: 'detalles/:id',
    component: DetallesComponentComponent,
  },
  {
    //Búsqueda
    path: 'series/:id',
    component: SeriesComponentComponent,
  },
  {
    //Búsqueda
    path: 'comics/:id',
    component: ComicsComponentComponent,
  },
  {
    //Búsqueda
    path: 'personajes/:id',
    component: charactersComponentComponent,
  },
  {
    //Búsqueda
    path: 'events/:id',
    component: EventsComponentComponent,
  },
  {
    //Búsqueda
    path: 'stories/:id',
    component: StoriesComponentComponent,
  },
  {
    //Búsqueda
    path: 'creators/:id',
    component: CreatorsComponentComponent,
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
    ComicsComponentComponent,
    charactersComponentComponent,
    CreatorsComponentComponent,
    EventsComponentComponent,
    SeriesComponentComponent,
    StoriesComponentComponent,
    FavoritosComponentComponent,
    VistosComponentComponent,
    DetallesComponentComponent,
    SearchComponentComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes),
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    HttpClientModule,
    NgxPaginationModule,
    provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
    provideFirestore(() => getFirestore()),
  ],
  providers: [AuthFirebaseService],
  bootstrap: [AppComponent],
})
export class AppModule {}
