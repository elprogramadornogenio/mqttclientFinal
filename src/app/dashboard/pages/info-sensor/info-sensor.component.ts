import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ChartConfiguration, ChartOptions, Color } from 'chart.js';
import { delay, switchMap, tap } from 'rxjs';
import { SensoresService } from '../../services/sensores.service';
import { IDato } from '../../interfaces/datos';
import { ISensor } from '../../interfaces/sensor';
import { SocketService } from '../../services/socket.service';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-info-sensor',
  templateUrl: './info-sensor.component.html',
  styleUrls: ['./info-sensor.component.css']
})
export class InfoSensorComponent implements OnInit {

  private _isensor!: ISensor;

  private _dato: number = 0;

  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;

  public cargando: boolean = true;

  private color: Color[] = [
    'rgba(0,255,0,0.3)',
    'rgba(255,255,0,0.3)',
    'rgba(255,0,0,0.3)'
  ]

  get sensor() {
    return this._isensor;
  }

  get dato() {
    return this._dato;
  }

  constructor(private sensoresService: SensoresService, private activatedRoute: ActivatedRoute, private socketService: SocketService) { }

  ngOnInit(): void {
    let i = 1;
    this.activatedRoute.params.pipe(
      switchMap(({ id }) => this.sensoresService.buscarDatosSensor(id)),
      tap((datos: IDato[]) => {
        /* console.log(datos) */
        for (let dato of datos) {
          this.lineChartData.datasets[0].data.push(dato.dato);
          this.lineChartData.labels?.push(i);
          this._dato = dato.dato;
          this.evaluarColor(dato.dato);
          i = i + 1;

        }
        ;
      })
    ).subscribe()

    this.activatedRoute.params.pipe(
      switchMap(({ id }) => this.sensoresService.buscarSensor(id)),
      tap((sensores: ISensor[]) => {
        this._isensor = sensores[0];
        this.lineChartData.datasets[0].label = `Datos del Sensor: ${sensores[0].nombre}`
        this.socketService.listen(sensores[0].topico).subscribe((dato: any) => {
          /* console.log(dato); */
          const datoGrafica = Number(dato);
          if (this.lineChartData.datasets[0].data.length > 5) {
            this.lineChartData.datasets[0].data.shift();
            this.lineChartData.labels?.shift();
          }
          this.lineChartData.datasets[0].data.push(datoGrafica);
          this.lineChartData.labels?.push(i);
          this._dato = datoGrafica;
          this.evaluarColor(datoGrafica);
          i = i + 1;
          this.chart?.update();
        });
        this.chart?.update();
      }),
      delay(1000),
      tap(data => {
        this.cargando = false;
      })
    ).subscribe()



  }

  private evaluarColor(dato: number) {
    if (dato >= 0 && dato <= 9) {
      this.lineChartData.datasets[0].backgroundColor = this.color[0];
      this.lineChartData.datasets[0].borderColor = this.color[0];
      this.lineChartData.datasets[0].pointBackgroundColor = this.color[0];
      this.lineChartData.datasets[0].pointBorderColor = this.color[0];
    } else if (dato > 9 && dato <= 35) {
      this.lineChartData.datasets[0].backgroundColor = this.color[1];
      this.lineChartData.datasets[0].borderColor = this.color[1];
      this.lineChartData.datasets[0].pointBackgroundColor = this.color[1];
      this.lineChartData.datasets[0].pointBorderColor = this.color[1];
    } else {
      this.lineChartData.datasets[0].backgroundColor = this.color[2];
      this.lineChartData.datasets[0].borderColor = this.color[2];
      this.lineChartData.datasets[0].pointBackgroundColor = this.color[2];
      this.lineChartData.datasets[0].pointBorderColor = this.color[2];
    }
  }

  public lineChartData: ChartConfiguration<'line'>['data'] = {
    labels: [],
    datasets: [
      {
        data: [],
        label: 'Series A',
        fill: true,
        tension: 0.5,
        borderColor: 'black',
        backgroundColor: 'rgba(255,0,0,0.3)'
      }
    ]
  };
  public lineChartOptions: ChartOptions<'line'> = {
    responsive: true
  };
  public lineChartLegend = true;

}
