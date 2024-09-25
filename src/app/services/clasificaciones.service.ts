import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Clasificaciones } from '../models/clasificaciones';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';

const base_url = environment.base;

@Injectable({
  providedIn: 'root'
})
export class ClasificacionesService {

  private url = `${base_url}/clasificaciones`;
  private listaCambio = new Subject<Clasificaciones[]>();

  constructor(private http: HttpClient) {}

  list(): Observable<Clasificaciones[]> {
    let token = sessionStorage.getItem('token');
    return this.http.get<Clasificaciones[]>(this.url, {
      headers: new HttpHeaders().set('Authorization', `Bearer ${token}`).set('Content-Type', 'application/json'),
    });
  }

  insert(clasificaciones: Clasificaciones): Observable<any> {
    let token = sessionStorage.getItem('token');
    return this.http.post(this.url, clasificaciones, {
      headers: new HttpHeaders().set('Authorization', `Bearer ${token}`).set('Content-Type', 'application/json'),
    });
  }

  setList(listaNueva: Clasificaciones[]) {
    this.listaCambio.next(listaNueva);
  }

  getList() {
    return this.listaCambio.asObservable();
  }

  listId(id: number): Observable<Clasificaciones> {
    let token = sessionStorage.getItem('token');
    return this.http.get<Clasificaciones>(`${this.url}/${id}`, {
      headers: new HttpHeaders().set('Authorization', `Bearer ${token}`).set('Content-Type', 'application/json'),
    });
  }

  update(clasificaciones: Clasificaciones): Observable<any> {
    let token = sessionStorage.getItem('token');
    return this.http.put(this.url, clasificaciones, {
      headers: new HttpHeaders().set('Authorization', `Bearer ${token}`).set('Content-Type', 'application/json'),
    });
  }

  delete(id: number): Observable<any> {
    let token = sessionStorage.getItem('token');
    return this.http.delete(`${this.url}/${id}`, {
      headers: new HttpHeaders().set('Authorization', `Bearer ${token}`).set('Content-Type', 'application/json'),
    });
  }
}
