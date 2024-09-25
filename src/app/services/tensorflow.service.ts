import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const base_url = "http://192.168.0.113:5000";

@Injectable({
  providedIn: 'root'
})
export class TensorFlowService {

  private url = `${base_url}/predict`;

  constructor(private http: HttpClient) {}

  predict(file: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('file', file, file.name);

    let token = sessionStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.post(this.url, formData, { headers, responseType: 'json' });
  }
}
