import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../auth/services/auth.service';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/auth/interfaces/usuario';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  usuario!: Usuario;

  constructor(private authService: AuthService, private router: Router) {
  }

  ngOnInit(): void {
    this.authService.observableUsuario.subscribe(usuario => {
      console.log(usuario);
      this.usuario = usuario;
    })
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/auth/login']);
  }

}
