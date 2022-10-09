import { Component, Input, OnInit } from '@angular/core';
import { ChartConfiguration, ChartOptions, Color } from 'chart.js';
import { filter } from 'rxjs';
import { IDato } from '../../interfaces/datos';

@Component({
  selector: 'app-consultar-datos-fecha',
  templateUrl: './consultar-datos-fecha.component.html',
  styleUrls: ['./consultar-datos-fecha.component.css']
})
export class ConsultarDatosFechaComponent implements OnInit {

  @Input() datos: IDato[] = [];
  @Input() fechaInicial = new Date();
  @Input() fechaFinal = new Date();

  titulo!: string;

  color: Color[] = [
    '#9F1ADB'
  ]

  labels: string[] = [];

  datoNumero: number[] = [];

  constructor() { }

  ngOnInit(): void {

    console.log(this.datos);
    
    //let i = 1;
    for (let dato of this.datos) {
      const fecha = new Date(dato.fecha);
      this.labels.push(`${fecha.getDate()} : ${(fecha.getMonth()+1)} : ${(fecha.getFullYear())} `);
      this.datoNumero.push(dato.dato);
      //i = i+1;
    }
    this.titulo = `Reportes desde: ${this.fechaInicial.getDate()} - ${this.fechaInicial.getMonth()+1} - ${this.fechaInicial.getFullYear()},
    hasta: ${this.fechaFinal.getDate()} - ${this.fechaFinal.getMonth()+1} - ${this.fechaFinal.getFullYear()}`
    this.lineChartData.labels = this.labels;
    this.lineChartData.datasets.push({
      data: this.datoNumero, backgroundColor: this.color, label: `Datos del Sensor: ${this.datos[0]._id}`,
      borderColor: this.color, pointBorderColor: this.color, pointBackgroundColor: this.color, fill: false
    });

  }

  public lineChartData: ChartConfiguration<'line'>['data'] = {
    labels: [],
    datasets: []
  };
  public lineChartOptions: ChartOptions<'line'> = {
    responsive: true
  };
  public lineChartLegend = true;

}
