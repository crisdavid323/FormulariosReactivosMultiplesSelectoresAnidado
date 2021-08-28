import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { PaisesRoutingModule } from './paises-routing.module';
import { SelectorPaisesComponent } from './pages/selector-paises/selector-paises.component';


@NgModule({
  declarations: [
    SelectorPaisesComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    PaisesRoutingModule
  ]
})
export class PaisesModule { }
