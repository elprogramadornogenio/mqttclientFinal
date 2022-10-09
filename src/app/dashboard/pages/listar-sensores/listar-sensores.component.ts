import { Component, OnInit } from '@angular/core';
import { ISensor } from '../../interfaces/sensor';
import { SensoresService } from '../../services/sensores.service';
import { SocketService } from '../../services/socket.service';
import { ActivatedRoute } from '@angular/router';
import { switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-listar-sensores',
  templateUrl: './listar-sensores.component.html',
  styleUrls: ['./listar-sensores.component.css']
})
export class ListarSensoresComponent implements OnInit {

  constructor(private sensoresService: SensoresService, private socketService: SocketService, private activatedRoute: ActivatedRoute) { }

  isensores: ISensor[] = [];

  listado: String = '';

  id_Usuario: string = '';

  get sensores() {
    return this.isensores;
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(({ id }) => {
      if (id) {
        this.id_Usuario = id;
        this.listarSensoresUsuario(id);
        this.listado= 'Mi ';
      } else {
        this.listarSensores();
      }

    });
  }

  listarSensoresUsuario(id: string) {
    this.sensoresService.listarSensoresUsuario(id).subscribe((datos: ISensor[]) => {
      if (datos.length !==0) {
        this.isensores = datos;
        console.log(this.isensores);
      }
    });
  }

  listarSensores() {
    this.sensoresService.listarSensores().subscribe((datos: ISensor[]) => {
      if (datos.length !==0) {
        this.isensores = datos;
        console.log(this.isensores);
      }
    });
  }

}
