import { Component, Input, OnInit } from '@angular/core';
import { IDato } from '../../interfaces/datos';

@Component({
  selector: 'app-consultar-dato-mayor',
  templateUrl: './consultar-dato-mayor.component.html',
  styleUrls: ['./consultar-dato-mayor.component.css']
})
export class ConsultarDatoMayorComponent implements OnInit {

  @Input() dato: IDato[] = [];

  constructor() { }

  ngOnInit(): void {
  }

}
