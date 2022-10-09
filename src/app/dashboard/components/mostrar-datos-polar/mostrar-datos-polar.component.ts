import { Component, Input, OnInit } from '@angular/core';
import { ChartConfiguration } from 'chart.js';
import { IDato } from '../../interfaces/datos';
import { IDatoPromedio } from '../../interfaces/datos-promedio';

@Component({
  selector: 'app-mostrar-datos-polar',
  templateUrl: './mostrar-datos-polar.component.html',
  styleUrls: ['./mostrar-datos-polar.component.css']
})
export class MostrarDatosPolarComponent implements OnInit {

  @Input() promedio: IDatoPromedio[] = [];
  @Input() mayor: IDato[]= [];
  @Input() menor: IDato[]= [];
  @Input() fechaInicial = new Date();
  @Input() fechaFinal = new Date();
  titulo!: string;

  constructor() { }

  ngOnInit(): void {
    this.polarAreaChartDatasets.push({data: [this.menor[0].dato, this.mayor[0].dato, this.promedio[0].avg]});
    this.titulo = `Datos desde: ${this.fechaInicial.getDate()} - ${this.fechaInicial.getMonth()+1} - ${this.fechaInicial.getFullYear()},
    hasta: ${this.fechaFinal.getDate()} - ${this.fechaFinal.getMonth()+1} - ${this.fechaFinal.getFullYear()}`;
  }

  public polarAreaChartLabels: string[] = ['Dato Menor', 'Dato Mayor', 'Promedio'];
  public polarAreaChartDatasets: ChartConfiguration<'polarArea'>['data']['datasets'] = [
    
  ];
  public polarAreaLegend = true;

  public polarAreaOptions: ChartConfiguration<'polarArea'>['options'] = {
    responsive: true,
  };

}
