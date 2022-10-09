import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./../main/main.component.css']
})
export class RegisterComponent {

  miFormulario: FormGroup = this.fb.group({
    nombre: ['oculus', [Validators.required]],
    apellido: ['electro soft', [Validators.required]],
    email: ['oculus@horus.com', [Validators.required, Validators.email]],
    password: ['123abc', [Validators.required, Validators.minLength(6)]]
  });

  constructor(private fb: FormBuilder, private router: Router, private authService: AuthService) { }

  register() {
    /* console.log(this.miFormulario.value); */
    const {nombre, apellido, email,password} = this.miFormulario.value;
    this.authService.registro(nombre, apellido , email, password).subscribe(ok => {
      if (ok === true) {
        this.router.navigate(['/dashboard']);
      } else {
        Swal.fire('Error', ok, 'error');
      }
    });
  }

}
