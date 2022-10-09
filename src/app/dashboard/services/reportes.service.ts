import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { IDato } from '../interfaces/datos';
import { ISensor } from '../interfaces/sensor';
import { map } from 'rxjs';
import { IDataSensor } from '../interfaces/data-sensor';
import { IDatoPromedio } from '../interfaces/datos-promedio';
import { IDatosPromedio } from '../interfaces/data-promedio';
import { DataIdsLista } from '../interfaces/data-ids-lista';

@Injectable({
  providedIn: 'root'
})
export class ReportesService {

  private urlBase = environment.baseUrl;

  private isensores: ISensor[] = [];

  private _idatos: IDato[] = [];

  private _idatosProm: IDatoPromedio[]=[];

  get idatos(){
    return this._idatos;
  }

  constructor(private http: HttpClient) { }

  // Consultas con id sensor

  consultarDatosFecha(fecha_ini: Date, fecha_final: Date){
    this._idatos = [];
    const payload = {
      fecha_ini,
      fecha_final
    }
    return this.http.post<IDataSensor>(`${this.urlBase}/consultarDatosFecha`, payload).pipe(
      map((value: IDataSensor) => {
        if (value.datos) {
          return this._idatos = value.datos;
        }
        return this._idatos;
      })
    )
  }

  consultarDatosFechaId(id_Sensor: string ,fecha_ini: Date, fecha_final: Date){
    this._idatos = [];
    const payload = {
      id_Sensor,
      fecha_ini,
      fecha_final
    }
    return this.http.post<IDataSensor>(`${this.urlBase}/consultarDatosFechaId`, payload).pipe(
      map((value: IDataSensor) => {
        if (value.datos) {
          return this._idatos = value.datos;
        }
        return this._idatos;
      })
    )
  }

  consultarDatoMayor(){
    this._idatos = [];
    const payload = {};
    return this.http.post<IDataSensor>(`${this.urlBase}/consultarDatoMayor`, payload).pipe(
      map((value: IDataSensor) => {
        if (value.datos) {
          return this._idatos = value.datos;
        }
        return this._idatos;
      })
    )
  }

  consultarDatoMayorId(id_Sensor: string){
    this._idatos = [];
    const payload = {
      id_Sensor
    };
    return this.http.post<IDataSensor>(`${this.urlBase}/consultarDatoMayorId`, payload).pipe(
      map((value: IDataSensor) => {
        if (value.datos) {
          return this._idatos = value.datos;
        }
        return this._idatos;
      })
    )
  }

  consultarDatoMayorIds(){
    this._idatos = [];
    const payload = {};
    return this.http.post<DataIdsLista>(`${this.urlBase}/consultarDatoMayorIds`, payload).pipe(
      map((value: DataIdsLista) => {
        if (value.datos) {
          return value.datos;
        }
        return [];
      })
    )
  }

  consultarDatoMenor(){
    this._idatos = [];
    const payload = {};
    return this.http.post<IDataSensor>(`${this.urlBase}/consultarDatoMenor`, payload).pipe(
      map((value: IDataSensor) => {
        if (value.datos) {
          return this._idatos = value.datos;
        }
        return this._idatos;
      })
    )
  }

  consultarDatoMenorId(id_Sensor: string){
    this._idatos = [];
    const payload = {
      id_Sensor
    };
    return this.http.post<IDataSensor>(`${this.urlBase}/consultarDatoMenorId`, payload).pipe(
      map((value: IDataSensor) => {
        if (value.datos) {
          return this._idatos = value.datos;
        }
        return this._idatos;
      })
    )
  }

  consultarDatoMenorIds(){
    this._idatos = [];
    const payload = {};
    return this.http.post<DataIdsLista>(`${this.urlBase}/consultarDatoMenorIds`, payload).pipe(
      map((value: DataIdsLista) => {
        if (value.datos) {
          return value.datos;
        }
        return [];
      })
    )
  }

  consultarDatoPromedio(){
    this._idatos = [];
    const payload = {};
    return this.http.post<IDatosPromedio>(`${this.urlBase}/consultarDatoPromedio`, payload).pipe(
      map((value: IDatosPromedio) => {
        if (value.datos) {
          return this._idatosProm = value.datos;
        }
        return this._idatosProm;
      })
    )
  }

  consultarDatoPromedioId(id_Sensor: string){
    this._idatos = [];
    const payload = {
      id_Sensor
    };
    return this.http.post<IDatosPromedio>(`${this.urlBase}/consultarDatoPromedioId`, payload).pipe(
      map((value: IDatosPromedio) => {
        if (value.datos) {
          return this._idatosProm = value.datos;
        }
        return this._idatosProm;
      })
    )
  }

  consultarDatoPromedioIds(){
    this._idatos = [];
    const payload = {};
    return this.http.post<DataIdsLista>(`${this.urlBase}/consultarDatoPromedioIds`, payload).pipe(
      map((value: DataIdsLista) => {
        if (value.datos) {
          return value.datos;
        }
        return [];
      })
    )
  }

}
