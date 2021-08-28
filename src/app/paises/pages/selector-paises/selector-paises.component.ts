import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { switchMap, tap } from 'rxjs/operators';

import { PaisesService } from '../../services/paises.service';
import { PaisSmall, Pais } from '../../interfaces/paises.interfaces';

@Component({
  selector: 'app-selector-paises',
  templateUrl: './selector-paises.component.html',
  styleUrls: ['./selector-paises.component.css']
})
export class SelectorPaisesComponent implements OnInit {

  miFormulario: FormGroup = this.fb.group({
    region: ['', Validators.required],
    pais: ['', Validators.required],
    // pais: [{value: '', disabled: true }, Validators.required],
    frontera: ['', Validators.required]
  })

  // Llenar selectores
  regiones: string[] = [];
  paises: PaisSmall[] = [];
  // fronteras: string[] = [];
  fronteras: PaisSmall[] = [];


  // UI
  cargando: boolean = false;

  constructor(
    private fb: FormBuilder,
    private paisesService: PaisesService
  ) { }

  ngOnInit(): void {
    this.regiones = this.paisesService.regiones;
    // Cuando cambie la regio

    this.miFormulario.get('region')?.valueChanges.pipe(
      tap((_) => {
        this.miFormulario.get('pais')?.reset('');
        this.cargando = true;
        // this.miFormulario.get('frontera')?.disable();
      }),
      switchMap(region => this.paisesService.getPaisesPorRegion(region))
      ).subscribe(paises => {
        this.paises = paises;
        this.cargando = false;
      })
      // this.miFormulario.get('region')?.valueChanges.subscribe(region => {
      //   console.log(region);
      //   this.paisesService.getPaisesPorRegion(region).subscribe(paises =>{
      //     console.log(paises);
      //     this.paises = paises;
      //   })
      // })

    // Cuando cambia el país
    this.miFormulario.get('pais')?.valueChanges
    .pipe(
      tap((_) => {
        this.fronteras = [];
        this.miFormulario.get('frontera')?.reset('');
        this.cargando = true;
        // this.miFormulario.get('frontera')?.enable();
      }),
      switchMap(codigo => this.paisesService.getPaisPorCodigo(codigo)),
      switchMap(pais => this.paisesService.getPaisesPorCodigos(pais?.borders!))
    )
    .subscribe(pais => {
      // this.fronteras = pais?.borders || [];
      console.log(pais);
      this.fronteras = this.paises;
      this.cargando = false;
    })

  }

  guardar() {
    console.log(this.miFormulario);

  }
}


