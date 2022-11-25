import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Usuario } from 'src/app/auth/interfaces/usuario';
import { AuthService } from '../../../auth/services/auth.service';
import { SensoresService } from '../../services/sensores.service';
import { ISensor } from '../../interfaces/sensor';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-agregar-sensor',
  templateUrl: './agregar-sensor.component.html',
  styleUrls: ['./agregar-sensor.component.css']
})
export class AgregarSensorComponent implements OnInit {

  private iusuario!: Usuario;
  public cargando = true;
  private sensor!: ISensor;
  public editar: boolean = false;

  miFormulario: FormGroup = this.fb.group({
    id_Usuario: [{ value: '', disabled: true }, Validators.required],
    nombre: ['', [Validators.required, Validators.minLength(6)]],
    tipo: ['', [Validators.required, Validators.minLength(6)]],
    topico: ['', [Validators.required, Validators.minLength(6)]]
  });

  constructor(private fb: FormBuilder, private sensoresService: SensoresService, private authService: AuthService, private router: Router, private activatedRouter: ActivatedRoute) {
    
  }

  get usuario(){
    return this.iusuario;
  }

  ngOnInit(): void {

    this.authService.observableUsuario.subscribe(usuario =>{
      this.iusuario = usuario;
    });
    
    /* this.iusuario = this.authService.usuario; */
    this.activatedRouter.params.subscribe(({ id }) => {
      if (id) {
        this.sensoresService.buscarSensor(id).subscribe((sensor: ISensor[]) => {
          this.sensor = sensor[0];
          this.miFormulario = this.fb.group({
            id_Usuario: [{ value: this.sensor.id_Usuario, disabled: true }, Validators.required],
            nombre: [this.sensor.nombre, [Validators.required, Validators.minLength(6)]],
            tipo: [this.sensor.tipo, [Validators.required, Validators.minLength(6)]],
            topico: [this.sensor.topico, [Validators.required, Validators.minLength(6)]]
          })
          this.editar = true;
        })
      } else {
        //crear
        this.miFormulario = this.fb.group({
          id_Usuario: [{ value: this.iusuario.uid, disabled: true }, Validators.required],
          nombre: ['Mono_CO_1', [Validators.required, Validators.minLength(6)]],
          tipo: ['Monoxido de Carbono', [Validators.required, Validators.minLength(6)]],
          topico: ['Monoxido/co_1', [Validators.required, Validators.minLength(6)]]
        })
        this.editar = false;
      }
    })

    this.cargando = false;
  }

  tareaSensor() {
    if (this.editar) {
      // Edita
      this.editarSensor();
    } else {
      this.agregarSensor();
    }


  }

  agregarSensor() {
    this.sensor = {
      id_Usuario: this.iusuario.uid,
      nombre: this.miFormulario.value.nombre,
      tipo: this.miFormulario.value.tipo,
      topico: this.miFormulario.value.topico
    }
    console.log(this.sensor);
    this.sensoresService.agregarSensor(this.sensor).subscribe(ok => {
      if (ok === true) {
        Swal.fire({
          icon: 'success',
          title: 'El Sensor se ha guardado exitosamente',
          showConfirmButton: false,
          timer: 1500
        });
        this.router.navigate(['/dashboard/listado', this.iusuario.uid]);
      } else {
        Swal.fire('Error', ok, 'error');
      }
    });
  }

  editarSensor() {
    this.sensor = {
      _id: this.sensor._id,
      id_Usuario: this.sensor.id_Usuario,
      nombre: this.miFormulario.value.nombre,
      tipo: this.miFormulario.value.tipo,
      topico: this.miFormulario.value.topico
    }
    console.log(this.sensor);
    this.sensoresService.editarSensor(this.sensor).subscribe(ok => {
      if (ok === true) {
        Swal.fire({
          icon: 'success',
          title: 'El Sensor se ha editado exitosamente',
          showConfirmButton: false,
          timer: 1500
        });
        this.router.navigate(['/dashboard/listado', this.iusuario.uid]);
      } else {
        Swal.fire('Error', ok, 'error');
      }
    });
  }

}
