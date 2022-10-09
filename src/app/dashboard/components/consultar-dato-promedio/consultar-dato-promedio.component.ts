import { Component, Input, OnInit } from '@angular/core';
import { IDato } from '../../interfaces/datos';
import { IDatoPromedio } from '../../interfaces/datos-promedio';

@Component({
  selector: 'app-consultar-dato-promedio',
  templateUrl: './consultar-dato-promedio.component.html',
  styleUrls: ['./consultar-dato-promedio.component.css']
})
export class ConsultarDatoPromedioComponent implements OnInit {

  @Input() dato: IDatoPromedio[] = [];
  @Input() fechaInicial = new Date();
  @Input() fechaFinal = new Date();
  fechaIni!: string;
  fechaFec!: string;
  constructor() { }

  ngOnInit(): void {
    this.fechaIni = ` ${this.fechaInicial.getDate()}-${this.fechaInicial.getMonth()+1}-${this.fechaInicial.getFullYear()}`;
    this.fechaFec = ` ${this.fechaFinal.getDate()}-${this.fechaFinal.getMonth()+1}-${this.fechaFinal.getFullYear()}`;
  }

}
