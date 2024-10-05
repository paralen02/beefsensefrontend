import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Consultas } from '../models/consultas';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';

const base_url = environment.base;

@Injectable({
  providedIn: 'root'
})
export class ConsultasService {

  private url = `${base_url}/consultas`;
  private listaCambio = new Subject<Consultas[]>();

  constructor(private http: HttpClient) {}

  list(): Observable<Consultas[]> {
    let token = sessionStorage.getItem('token');
    return this.http.get<Consultas[]>(this.url, {
      headers: new HttpHeaders().set('Authorization', `Bearer ${token}`).set('Content-Type', 'application/json'),
    });
  }

  insert(consultas: Consultas): Observable<any> {
    return this.http.post(this.url, consultas, {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
    });
  }

  setList(listaNueva: Consultas[]) {
    this.listaCambio.next(listaNueva);
  }

  getList() {
    return this.listaCambio.asObservable();
  }

  listId(id: number): Observable<Consultas> {
    let token = sessionStorage.getItem('token');
    return this.http.get<Consultas>(`${this.url}/${id}`, {
      headers: new HttpHeaders().set('Authorization', `Bearer ${token}`).set('Content-Type', 'application/json'),
    });
  }

  update(consultas: Consultas): Observable<any> {
    let token = sessionStorage.getItem('token');
    return this.http.put(this.url, consultas, {
      headers: new HttpHeaders().set('Authorization', `Bearer ${token}`).set('Content-Type', 'application/json'),
    });
  }

  patch(id: number, updates: Partial<Consultas>): Observable<any> {
    let token = sessionStorage.getItem('token');
    return this.http.patch(`${this.url}/${id}`, updates, {
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
