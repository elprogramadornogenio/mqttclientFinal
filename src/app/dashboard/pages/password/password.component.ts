import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Usuario } from 'src/app/auth/interfaces/usuario';
import { AuthService } from 'src/app/auth/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.css']
})
export class PasswordComponent implements OnInit {

  usuario!: Usuario;
  miFormulario!: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService) {
    this.authService.observableUsuario.subscribe(usuario => this.usuario = usuario);
    this.miFormulario = this.fb.group({
      password: ['', [Validators.required, Validators.minLength(6)]],
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      newPasswordConfirm: ['', [Validators.required, Validators.minLength(6)]]
    });

  }

  ngOnInit(): void {
  }

  cambiarPassword() {
    console.log(this.miFormulario.value);
    const { password, newPassword, newPasswordConfirm } = this.miFormulario.value;
    if (newPassword === newPasswordConfirm) {
      this.authService.cambiarPassword(this.usuario.uid, password, newPassword).subscribe(ok => {
        if (ok === true) {
          Swal.fire('Ha Actualizado la contraseña correctamente', "" , 'success');
        } else {
          Swal.fire('Error', "", 'error');
        }
      });
    } else {
      Swal.fire('Error', 'Las contraseñas nuevas no coinciden', 'error');
    }
  }

}
