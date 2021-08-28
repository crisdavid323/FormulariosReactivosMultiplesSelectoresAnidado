import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SelectorPaisesComponent } from './pages/selector-paises/selector-paises.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'selector',
        component: SelectorPaisesComponent
      },
      {
        path: '**',
        redirectTo: 'selector'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PaisesRoutingModule { }
