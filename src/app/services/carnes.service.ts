import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Carnes } from '../models/carnes';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';

const base_url = environment.base;

@Injectable({
  providedIn: 'root'
})
export class CarnesService {

  private url = `${base_url}/carnes`;
  private listaCambio = new Subject<Carnes[]>();

  constructor(private http: HttpClient) {}

  list(): Observable<Carnes[]> {
    let token = sessionStorage.getItem('token');
    return this.http.get<Carnes[]>(this.url, {
      headers: new HttpHeaders().set('Authorization', `Bearer ${token}`).set('Content-Type', 'application/json'),
    });
  }

  insert(carnes: Carnes): Observable<any> {
    let token = sessionStorage.getItem('token');
    return this.http.post(this.url, carnes, {
      headers: new HttpHeaders().set('Authorization', `Bearer ${token}`).set('Content-Type', 'application/json'),
    });
  }

  setList(listaNueva: Carnes[]) {
    this.listaCambio.next(listaNueva);
  }

  getList() {
    return this.listaCambio.asObservable();
  }

  listId(id: number): Observable<Carnes> {
    let token = sessionStorage.getItem('token');
    return this.http.get<Carnes>(`${this.url}/${id}`, {
      headers: new HttpHeaders().set('Authorization', `Bearer ${token}`).set('Content-Type', 'application/json'),
    });
  }

  update(carnes: Carnes): Observable<any> {
    let token = sessionStorage.getItem('token');
    return this.http.put(this.url, carnes, {
      headers: new HttpHeaders().set('Authorization', `Bearer ${token}`).set('Content-Type', 'application/json'),
    });
  }

  delete(id: number): Observable<any> {
    let token = sessionStorage.getItem('token');
    return this.http.delete(`${this.url}/${id}`, {
      headers: new HttpHeaders().set('Authorization', `Bearer ${token}`).set('Content-Type', 'application/json'),
    });
  }

  deleteByOperariosId(operarios_id: number): Observable<any> {
    let token = sessionStorage.getItem('token');
    return this.http.delete(`${this.url}/${operarios_id}`, {
      headers: new HttpHeaders().set('Authorization', `Bearer ${token}`).set('Content-Type', 'application/json'),
    });
  }

  listByOperarioId(operarios_id: number): Observable<Carnes[]> {
    let token = sessionStorage.getItem('token');
    return this.http.get<Carnes[]>(`${this.url}/operario/${operarios_id}`, {
      headers: new HttpHeaders().set('Authorization', `Bearer ${token}`).set('Content-Type', 'application/json'),
    });
  }

  updateImagen(idCarnes: number, imagen: string): Observable<any> {
    let token = sessionStorage.getItem('token');
    return this.http.patch(`${this.url}/${idCarnes}/imagen`, { imagen }, {
      headers: new HttpHeaders().set('Authorization', `Bearer ${token}`).set('Content-Type', 'application/json'),
    });
  }
}
