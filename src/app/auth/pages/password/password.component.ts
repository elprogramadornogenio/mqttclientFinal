import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./../main/main.component.css']
})
export class PasswordComponent implements OnInit {

  miFormulario: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    nombre: ['', [Validators.required]],
    apellido: ['', [Validators.required]]
  });

  constructor(private fb: FormBuilder, private authService: AuthService) { }

  ngOnInit(): void {
  }

  recuperarPassword() {
    const { email, nombre, apellido } = this.miFormulario.value;
    this.authService.recuperarPassword(email, nombre, apellido).subscribe(ok => {
      if (ok === true) {
        Swal.fire(`Recuperación`, `Se ha enviado un correo a la dirección ${email}`, 'success');
      } else {
        Swal.fire('Error', '', 'error');
      }
    })
  }

}
