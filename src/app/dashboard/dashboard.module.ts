import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgChartsModule } from 'ng2-charts';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { MaterialModule } from '../material/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ListarSensoresComponent } from './pages/listar-sensores/listar-sensores.component';
import { CardSensorComponent } from './components/card-sensor/card-sensor.component';
import { InfoSensorComponent } from './pages/info-sensor/info-sensor.component';
import { AgregarSensorComponent } from './pages/agregar-sensor/agregar-sensor.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ReportesComponent } from './pages/reportes/reportes.component';
import { ConsultarDatosFechaComponent } from './components/consultar-datos-fecha/consultar-datos-fecha.component';
import { ConsultarDatoMayorComponent } from './components/consultar-dato-mayor/consultar-dato-mayor.component';
import { ConsultarDatoMenorComponent } from './components/consultar-dato-menor/consultar-dato-menor.component';
import { ConsultarDatoPromedioComponent } from './components/consultar-dato-promedio/consultar-dato-promedio.component';
import { MostrarDatosPolarComponent } from './components/mostrar-datos-polar/mostrar-datos-polar.component';
import { MostrarDatosBarrasMenorComponent } from './components/mostrar-datos-barras-menor/mostrar-datos-barras-menor.component';
import { MostrarDatosBarrasMayorComponent } from './components/mostrar-datos-barras-mayor/mostrar-datos-barras-mayor.component';
import { MostrarDatosBarrasPromedioComponent } from './components/mostrar-datos-barras-promedio/mostrar-datos-barras-promedio.component';
import { EditComponent } from './pages/edit/edit.component';
import { PasswordComponent } from './pages/password/password.component';


@NgModule({
  declarations: [
    DashboardComponent,
    ListarSensoresComponent,
    CardSensorComponent,
    InfoSensorComponent,
    AgregarSensorComponent,
    ReportesComponent,
    ConsultarDatosFechaComponent,
    ConsultarDatoMayorComponent,
    ConsultarDatoMenorComponent,
    ConsultarDatoPromedioComponent,
    MostrarDatosPolarComponent,
    MostrarDatosBarrasMenorComponent,
    MostrarDatosBarrasMayorComponent,
    MostrarDatosBarrasPromedioComponent,
    EditComponent,
    PasswordComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    MaterialModule,
    FlexLayoutModule,
    NgChartsModule,
    ReactiveFormsModule
  ]
})
export class DashboardModule { }
