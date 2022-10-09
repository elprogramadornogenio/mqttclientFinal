import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ReportesService } from '../../services/reportes.service';
import { IDato } from '../../interfaces/datos';
import { tap, delay } from 'rxjs';
import { IDatoPromedio } from '../../interfaces/datos-promedio';
import { DataIds } from '../../interfaces/data-ids';

@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.component.html',
  styleUrls: ['./reportes.component.css']
})
export class ReportesComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute, private reportesService: ReportesService, private fb: FormBuilder) { }

  cargando: boolean = true;

  id_Sensor: string = '';

  mayorIds: DataIds[]= [];

  menorIds: DataIds[]= [];

  promediosIds: DataIds[]= [];

  private _datos: IDato[] = [];

  datoMayor: IDato[] = [];

  datoMenor: IDato[] = [];

  datoPromedio: IDatoPromedio[] = [];

  fechaInicial!: Date;
  fechaFinal!: Date;

  get datos() {
    return this._datos;
  }

  miFormulario: FormGroup = this.fb.group({
    id_Sensor: [{ value: '', disabled: true }, Validators.required],
    fecha_ini: [Date, [Validators.required]],
    fecha_final: [Date, [Validators.required]]
  });

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(({ id }) => {
      if (id) {
        this.id_Sensor = id;
        // Consultas de id

      } else {
        this.id_Sensor = '';
        // Consultas generales
      }
    });
  }

  consultarDatosFecha(fecha_ini: Date, fecha_final: Date) {
    this._datos = [];
    this.reportesService.consultarDatosFecha(fecha_ini, fecha_final).pipe(
      tap((datos: IDato[]) => {
        this._datos = datos;
        // console.log(this._datos)
      })
    ).subscribe();
  }

  consultarDatosFechaId(id_Sensor: string, fecha_ini: Date, fecha_final: Date) {
    this._datos = [];
    this.reportesService.consultarDatosFechaId(id_Sensor, fecha_ini, fecha_final).pipe(
      tap((datos: IDato[]) => {
        this._datos = datos;
        // console.log(this._datos)
      })
    ).subscribe();
  }

  consultarDatoMayor() {
    this._datos = [];
    this.reportesService.consultarDatoMayor().pipe(
      tap((datos: IDato[]) => {
        this.datoMayor = datos;
      })
    ).subscribe();
  }

  consultarDatoMayorId(id_String: string) {
    this._datos = [];
    this.reportesService.consultarDatoMayorId(id_String).pipe(
      tap((datos: IDato[]) => {
        this.datoMayor = datos;
      })
    ).subscribe();
  }

  consultarDatoMayorIds() {
    this.mayorIds = [];
    this.reportesService.consultarDatoMayorIds().pipe(
      tap((datos: DataIds[]) => {
        this.mayorIds = datos;
      })
    ).subscribe();
  }

  consultarDatoMenor() {
    this._datos = [];
    this.reportesService.consultarDatoMenor().pipe(
      tap((datos: IDato[]) => {
        this.datoMenor = datos;
      })
    ).subscribe();
  }

  consultarDatoMenorId(id_String: string) {
    this._datos = [];
    this.reportesService.consultarDatoMenorId(id_String).pipe(
      tap((datos: IDato[]) => {
        this.datoMenor = datos;
      })
    ).subscribe();
  }

  consultarDatoMenorIds() {
    this.menorIds = [];
    this.reportesService.consultarDatoMenorIds().pipe(
      tap((datos: DataIds[]) => {
        this.menorIds = datos;
      })
    ).subscribe();
  }

  consultarDatoPromedio() {
    this.datoPromedio = [];
    this.reportesService.consultarDatoPromedio().pipe(
      tap((datos: IDatoPromedio[]) => {
        console.log(datos);
        this.datoPromedio = datos;
      }),
      delay(1000),
      tap((datos) => {
        this.cargando = false;
      })
    ).subscribe();
  }

  consultarDatoPromedioId(id_String: string) {
    this.datoPromedio = [];
    this.reportesService.consultarDatoPromedioId(id_String).pipe(
      tap((datos: IDatoPromedio[]) => {
        console.log(datos);
        this.datoPromedio = datos;
      }),
      delay(1000),
      tap((datos) => {
        this.cargando = false;
      })
    ).subscribe();
  }

  consultarDatoPromedioIds() {
    this.promediosIds = [];
    this.reportesService.consultarDatoPromedioIds().pipe(
      tap((datos: DataIds[]) => {
        this.promediosIds = datos;
      })
    ).subscribe();
  }

  consultar() {
    if (this.miFormulario.value.fecha_ini && this.miFormulario.value.fecha_final) {
      this.fechaInicial = new Date(this.miFormulario.value.fecha_ini);
      this.fechaFinal = new Date(this.miFormulario.value.fecha_final);
      if (this.id_Sensor) {
        this.consultarDatosFechaId(this.id_Sensor, new Date(this.miFormulario.value.fecha_ini),
          new Date(this.miFormulario.value.fecha_final));
        this.consultarDatoMayorId(this.id_Sensor);
        this.consultarDatoMenorId(this.id_Sensor);
        this.consultarDatoPromedioId(this.id_Sensor);
      } else {
        this.consultarDatosFecha(new Date(this.miFormulario.value.fecha_ini),
          new Date(this.miFormulario.value.fecha_final));
        this.consultarDatoMayor();
        this.consultarDatoMenor();
        this.consultarDatoPromedio();
        this.consultarDatoMayorIds();
        this.consultarDatoMenorIds();
        this.consultarDatoPromedioIds();
      }
    }

    //

  }

}
