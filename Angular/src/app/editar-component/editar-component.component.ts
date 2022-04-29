import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthFirebaseService } from '../service/firebase/auth-firebase.service';

@Component({
  selector: 'app-editar-component',
  templateUrl: './editar-component.component.html',
  styleUrls: ['./editar-component.component.css']
})
export class EditarComponentComponent implements OnInit {
  @ViewChild("cajanombre") cajanombre! : ElementRef;
  @ViewChild("cajafoto") cajafoto! : ElementRef;

  constructor(private service : AuthFirebaseService, private router: Router) { }

  ngOnInit(): void {
  }

  modificar(){
    var nombre = this.cajanombre.nativeElement.value;

    this.service.updateUsuario(nombre).then(res => {
      console.log(res);
      this.router.navigate(['perfil']);
    });
  }
}
