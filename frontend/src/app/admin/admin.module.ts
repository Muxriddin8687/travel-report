import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActionComponent } from './pages/action/action.component';
import { ServiceComponent } from './pages/service/service.component';
import { ActionEditComponent } from './pages/action/action-edit/action-edit.component';
import { SearchPipe } from './pipes/search.pipe';
import { SummPipe } from './pipes/summ.pipe';


@NgModule({
  declarations: [
    AdminComponent,
    NavbarComponent,
    DashboardComponent,
    ActionComponent,
    ServiceComponent,
    ActionEditComponent,
    SearchPipe,
    SummPipe,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class AdminModule { }
