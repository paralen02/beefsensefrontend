import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Modelos } from '../models/modelos';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';

const base_url = environment.base;

@Injectable({
  providedIn: 'root'
})
export class ModelosService {

  private url = `${base_url}/modelos`;
  private listaCambio = new Subject<Modelos[]>();

  constructor(private http: HttpClient) {}

  list(): Observable<Modelos[]> {
    let token = sessionStorage.getItem('token');
    return this.http.get<Modelos[]>(this.url, {
      headers: new HttpHeaders().set('Authorization', `Bearer ${token}`).set('Content-Type', 'application/json'),
    });
  }

  insert(modelos: Modelos): Observable<any> {
    let token = sessionStorage.getItem('token');
    return this.http.post(this.url, modelos, {
      headers: new HttpHeaders().set('Authorization', `Bearer ${token}`).set('Content-Type', 'application/json'),
    });
  }

  setList(listaNueva: Modelos[]) {
    this.listaCambio.next(listaNueva);
  }

  getList() {
    return this.listaCambio.asObservable();
  }

  listId(id: number): Observable<Modelos> {
    let token = sessionStorage.getItem('token');
    return this.http.get<Modelos>(`${this.url}/${id}`, {
      headers: new HttpHeaders().set('Authorization', `Bearer ${token}`).set('Content-Type', 'application/json'),
    });
  }

  update(modelos: Modelos): Observable<any> {
    let token = sessionStorage.getItem('token');
    return this.http.put(this.url, modelos, {
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
