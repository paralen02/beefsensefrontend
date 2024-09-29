import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Operarios } from '../models/operarios';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';

const base_url = environment.base;

@Injectable({
  providedIn: 'root'
})
export class OperariosService {

  private url = `${base_url}/operarios`;
  private listaCambio = new Subject<Operarios[]>();

  constructor(private http: HttpClient) {}

  list(): Observable<Operarios[]> {
    let token = sessionStorage.getItem('token');
    return this.http.get<Operarios[]>(this.url, {
      headers: new HttpHeaders().set('Authorization', `Bearer ${token}`).set('Content-Type', 'application/json'),
    });
  }

  insert(operarios: Operarios): Observable<any> {
    let token = sessionStorage.getItem('token');
    return this.http.post(this.url, operarios, {
      headers: new HttpHeaders().set('Authorization', `Bearer ${token}`).set('Content-Type', 'application/json'),
    });
  }

  setList(listaNueva: Operarios[]) {
    this.listaCambio.next(listaNueva);
  }

  getList() {
    return this.listaCambio.asObservable();
  }

  listId(id: number): Observable<Operarios> {
    let token = sessionStorage.getItem('token');
    return this.http.get<Operarios>(`${this.url}/${id}`, {
      headers: new HttpHeaders().set('Authorization', `Bearer ${token}`).set('Content-Type', 'application/json'),
    });
  }

  update(operarios: Operarios): Observable<any> {
    let token = sessionStorage.getItem('token');
    return this.http.put(this.url, operarios, {
      headers: new HttpHeaders().set('Authorization', `Bearer ${token}`).set('Content-Type', 'application/json'),
    });
  }

  patch(id: number, updates: Partial<Operarios>): Observable<any> {
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

  findByUsername(username: string): Observable<Operarios> {
    let token = sessionStorage.getItem('token');
    return this.http.get<Operarios>(`${this.url}/buscar/${username}`, {
      headers: new HttpHeaders().set('Authorization', `Bearer ${token}`).set('Content-Type', 'application/json'),
    });
  }
}
