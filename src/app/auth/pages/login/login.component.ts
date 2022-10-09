import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./../main/main.component.css']
})
export class LoginComponent {

  miFormulario: FormGroup = this.fb.group({
    email: ['oculus@horus.com', [Validators.required, Validators.email]],
    password: ['123abc', [Validators.required, Validators.minLength(6)]]
  });

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) { }

  login() {
    /* console.log(this.miFormulario.value); */

    const { email, password } = this.miFormulario.value;
    this.authService.login(email, password).subscribe(ok => {
      if (ok === true) {
        this.router.navigate(['/dashboard']);
      } else {
        Swal.fire('Error', ok, 'error');
      }
    });
  }

}
