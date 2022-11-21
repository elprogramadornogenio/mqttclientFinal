import { Component, Input, OnInit } from '@angular/core';
import { ISensor } from '../../interfaces/sensor';
import { SocketService } from '../../services/socket.service';
import { SensoresService } from '../../services/sensores.service';
import { IDato } from '../../interfaces/datos';
import { tap } from 'rxjs';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-card-sensor',
  templateUrl: './card-sensor.component.html',
  styleUrls: ['./card-sensor.component.css']
})
export class CardSensorComponent implements OnInit {

  @Input() isensor!: ISensor;
  @Input() id_Usuario: string = '';
  dato: number = 0;
  checkear: boolean = false;

  constructor(private socketService: SocketService, private sensorService: SensoresService, private router: Router) { }

  ngOnInit(): void {
    if (this.isensor._id) {
      this.sensorService.buscarDatosSensor(this.isensor._id).pipe(
        tap((datos: IDato[]) => {
          /* console.log(datos); */
          if (datos != undefined && datos.length != 0) {
            this.dato = Number(datos[datos.length - 1].dato);
          }

        })
      ).subscribe();
      this.socketService.listen(this.isensor.topico).subscribe(dato => {
        console.log(dato);
        this.dato = Number(dato);
      });
    }
  }

  cambioEstado() {
    if (this.checkear) {
      this.checkear = false;
    } else {
      this.checkear = true;
    }
    console.log(this.checkear)
  }

  probarConexion() {
    console.log(this.isensor.topico);
    Swal.fire({
      icon: 'info',
      title: `Cargando...`,
      showConfirmButton: false
    });
    this.sensorService.probarConexion(this.isensor.topico).subscribe(resp => {
      if (resp.prueba) {
        Swal.fire({
          icon: 'success',
          title: `${resp.msg}`,
          showConfirmButton: false,
          timer: 1500
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: `${resp.msg}`,
          showConfirmButton: false,
          timer: 1500
        });
      }
    });
  }

  eliminarSensor() {
    console.log(this.isensor._id!);
    this.sensorService.eliminarSensores(this.isensor._id!).subscribe(ok => {
      if (ok === true) {
        this.sensorService.eliminarDatosSensores(this.isensor.id_Usuario, this.isensor.topico).subscribe(ok => {
          if (ok == true) {
            Swal.fire({
              icon: 'success',
              title: 'El Sensor se ha eliminado exitosamente con sus datos',
              showConfirmButton: false,
              timer: 1500
            });
          }
        })
      } else {
        Swal.fire('Error', ok, 'error');
      }
    });
    if (this.id_Usuario) {
      this.router.navigate(['/dashboard/listado', this.id_Usuario])
        .then(() => {
          window.location.reload();
        });
    } else {
      this.router.navigate(['/dashboard/listado'])
        .then(() => {
          window.location.reload();
        });
    }
  }

}
