import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Usuario } from 'src/app/auth/interfaces/usuario';
import { AuthService } from 'src/app/auth/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  usuario!: Usuario;

  miFormulario!: FormGroup;

  fileControl!: FormControl;

  foto!: File;

  constructor(private fb: FormBuilder, private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.observableUsuario.subscribe(usuario => this.usuario = usuario);
    this.fileControl = new FormControl(this.foto, [
      Validators.required
    ]);
    this.miFormulario = this.fb.group({
      nombre: [this.usuario.nombre, [Validators.required]],
      apellido: [this.usuario.apellido, [Validators.required]],
      email: [this.usuario.email, [Validators.required, Validators.email]]
    });
    this.fileControl.valueChanges.subscribe((files: File) => {
      this.foto = files;
    })
  }

  editar() {
    console.log(this.miFormulario.value);
    const { nombre, apellido, email } = this.miFormulario.value;
    this.authService.editar(this.usuario.uid, nombre, apellido, email).subscribe(ok => {
      if (ok === true) {
        Swal.fire('Ha Actualizado la información correctamente', "", 'success');
      } else {
        Swal.fire('Error', ok, 'error');
      }
    });
  }

  subirFoto() {
    if (!this.foto) {
      Swal.fire('Error', 'No hay imagen seleccionada', 'error');
    } else {
      this.authService.subirFoto(this.usuario.uid, this.foto).subscribe(ok => {
        if (ok === true) {
          Swal.fire('La imagen se ha actualizado correctamente', "", 'success');
        } else {
          Swal.fire('Error', ok, 'error');
        }
      })
    }
  }

}
