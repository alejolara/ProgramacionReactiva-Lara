import { Component, OnDestroy } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { Alumno } from './alumno.interface';

const ALUMNOS: Alumno[] = [
  { id: 1, nombre: 'Juan', edad: 25 },
  { id: 2, nombre: 'María', edad: 22 },
  { id: 3, nombre: 'Pedro', edad: 27 },
];

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnDestroy {
  alumnos$: Observable<Alumno[]> | undefined; 
  private destroy$: Subject<void> = new Subject<void>();

  constructor() {
    this.loadAlumnos()
      .then((alumnos) => {
        this.alumnos$ = this.filterAlumnos(alumnos);
      })
      .catch((error) => {
        console.error('Error al cargar los alumnos:', error);
      });
  }

  loadAlumnos(): Promise<Alumno[]> {
    return Promise.resolve(ALUMNOS);
  }

  filterAlumnos(alumnos: Alumno[]): Observable<Alumno[]> {
    return new Observable<Alumno[]>((observer) => {
      const filteredAlumnos = alumnos.filter((alumno) => alumno.edad > 24);
      observer.next(filteredAlumnos);
      observer.complete();
    }).pipe(
      map((alumnos) => alumnos.filter((alumno) => alumno.edad > 24))
    );
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}

