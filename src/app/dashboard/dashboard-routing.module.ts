import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ListarSensoresComponent } from './pages/listar-sensores/listar-sensores.component';
import { InfoSensorComponent } from './pages/info-sensor/info-sensor.component';
import { AgregarSensorComponent } from './pages/agregar-sensor/agregar-sensor.component';
import { ReportesComponent } from './pages/reportes/reportes.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      {
        path: 'listado',
        component: ListarSensoresComponent
      },
      {
        path: 'listado/:id',
        component: ListarSensoresComponent
      },
      {
        path: 'sensor/:id',
        component: InfoSensorComponent
      },
      {
        path: 'agregar',
        component: AgregarSensorComponent
      },
      {
        path: 'editar/:id',
        component: AgregarSensorComponent
      },
      {
        path: 'reportes',
        component: ReportesComponent
      },
      {
        path: 'reportes/:id',
        component: ReportesComponent
      },
      {
        path: '**',
        redirectTo: 'listado'
      }
      
    ]
    
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
