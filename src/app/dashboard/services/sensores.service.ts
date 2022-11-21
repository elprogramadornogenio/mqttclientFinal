import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { catchError, map, of } from 'rxjs';
import { IDataSensor } from '../interfaces/data-sensor';
import { ISensor } from '../interfaces/sensor';
import { IDato } from '../interfaces/datos';
import { SensorResponse } from '../interfaces/sensor-response';
import { DataProbar } from '../interfaces/data-probar';


@Injectable({
  providedIn: 'root'
})
export class SensoresService {

  private urlBase = environment.baseUrl;

  private isensores: ISensor[] = [];

  private idatos: IDato[] = [];

  constructor(private http: HttpClient) { }

  probarConexion(topico: string){
    const payload = {
      topico
    };
    return this.http.post<DataProbar>(`${this.urlBase}/conexion`, payload).pipe(
      map((resp: DataProbar)=>{
        return resp;
      })
    )
  }

  agregarSensor(sensor: ISensor) {
    /* console.log(sensor); */
    return this.http.post<SensorResponse>(`${this.urlBase}/sensor`, sensor).pipe(
      map((resp: SensorResponse) => {
        return resp.ok;
      }),
      catchError(err => of(err.error.msg)
      ));
  }

  editarSensor(sensor: ISensor) {
    return this.http.put<IDataSensor>(`${this.urlBase}/sensor`, sensor).pipe(
      map((resp: SensorResponse) => {
        return resp.ok;
      }),
      catchError(err => of(err.error.msg)
      ));

  }

  listarSensores() {
    this.isensores = [];
    return this.http.get<IDataSensor>(`${this.urlBase}/listarSensores`).pipe(
      map((value: IDataSensor) => {
        /* console.log(value); */
        if (value.listaSensores) {
          return this.isensores = value.listaSensores;
        }
        return this.isensores;
      })
    )
  }

  eliminarSensores(_id: string) {
    const params = new HttpParams().set('id', _id);
    return this.http.delete<IDataSensor>(`${this.urlBase}/sensor`, { params }).pipe(
      map((resp: SensorResponse) => {
        return resp.ok;
      }),
      catchError(err => of(err.error.msg)
      ));
  }

  eliminarDatosSensores(id_Sensor: string, topico: string) {
    const params = new HttpParams().set('id_Sensor', id_Sensor).set('topico', topico);
    return this.http.delete<IDataSensor>(`${this.urlBase}/sensorDatos`, { params }).pipe(
      map((resp: SensorResponse) => {
        return resp.ok;
      }),
      catchError(err => of(err.error.msg)
      ));
  }

  buscarSensor(id: string) {
    this.isensores = [];
    const params = new HttpParams().set('id', id);
    return this.http.get<IDataSensor>(`${this.urlBase}/buscarSensor`, { params }).pipe(
      map((value: IDataSensor) => {
        /* console.log(value.listaSensores) */
        if (value.listaSensores) {
          return this.isensores = value.listaSensores;
        }
        return this.isensores;
      })
    )
  }

  listarSensoresUsuario(id: string) {
    this.isensores = [];
    if (id) {
      const params = new HttpParams().set('id', id);
      return this.http.get<IDataSensor>(`${this.urlBase}/listarSensoresUsuario`, { params }).pipe(
        map((value: IDataSensor) => {
          console.log(value);
          if (value.listaSensores) {
            return this.isensores = value.listaSensores;
          }
          return this.isensores;
        })
      )
    }
    return of([]);

  }


  buscarDatosSensor(id: string) {
    this.idatos = [];
    const params = new HttpParams().set('id', id);
    return this.http.get<IDataSensor>(`${this.urlBase}/buscarDatos`, { params }).pipe(
      map((value: IDataSensor) => {
        if (value.datos) {
          return this.idatos = value.datos;
        }
        return this.idatos;
      })
    )
  }



}
