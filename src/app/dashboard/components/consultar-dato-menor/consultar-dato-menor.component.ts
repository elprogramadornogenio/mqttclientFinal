import { Component, Input, OnInit } from '@angular/core';
import { IDato } from '../../interfaces/datos';

@Component({
  selector: 'app-consultar-dato-menor',
  templateUrl: './consultar-dato-menor.component.html',
  styleUrls: ['./consultar-dato-menor.component.css']
})
export class ConsultarDatoMenorComponent implements OnInit {

  @Input() dato: IDato[] = [];

  constructor() { }

  ngOnInit(): void {
  }

}
