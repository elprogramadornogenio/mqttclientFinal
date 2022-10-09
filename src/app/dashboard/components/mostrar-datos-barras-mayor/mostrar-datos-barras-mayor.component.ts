import { Component, Input, OnInit } from '@angular/core';
import { ChartConfiguration, Color } from 'chart.js';
import { DataIds } from '../../interfaces/data-ids';


@Component({
  selector: 'app-mostrar-datos-barras-mayor',
  templateUrl: './mostrar-datos-barras-mayor.component.html',
  styleUrls: ['./mostrar-datos-barras-mayor.component.css']
})
export class MostrarDatosBarrasMayorComponent implements OnInit {

  @Input() datos: DataIds[]= [];
  @Input() fechaInicial = new Date();
  @Input() fechaFinal = new Date();
  titulo!: string;

  color: Color[] = [
    '#46F0C7'
  ];

  constructor() { }

  ngOnInit(): void {
    this.titulo = `Datos desde: ${this.fechaInicial.getDate()} - ${this.fechaInicial.getMonth()+1} - ${this.fechaInicial.getFullYear()},
    hasta: ${this.fechaFinal.getDate()} - ${this.fechaFinal.getMonth()+1} - ${this.fechaFinal.getFullYear()}`;
    this.barChartData.datasets[0].label = 'datos maximos'
    if(this.datos.length!==0) {
      for(let dato of this.datos) {
        this.barChartData.labels?.push(dato._id);
        this.barChartData.datasets[0].data.push(dato.max!);
      }
    }
    this.barChartData.datasets[0].backgroundColor = this.color;
    this.barChartData.datasets[0].borderColor = this.color;
    this.barChartData.datasets[0].hoverBorderColor = this.color;
    this.barChartData.datasets[0].hoverBackgroundColor = this.color;
  }

  public barChartLegend = true;
  public barChartPlugins = [];

  public barChartData: ChartConfiguration<'bar'>['data'] = {
    labels: [],
    datasets: [
      { data: [], label: '' },
      
    ]
  };

  public barChartOptions: ChartConfiguration<'bar'>['options'] = {
    responsive: true,
  };

}
