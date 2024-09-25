import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';

const base_url = environment.base;

@Injectable({
  providedIn: 'root'
})
export class TensorFlowService {

  private url = `${base_url}/api/predict`;

  constructor(private http: HttpClient) {}

  predict(file: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('file', file, file.name);

    let token = sessionStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.post(this.url, formData, { headers, responseType: 'text' }).pipe(
      map(response => {
        try {
          return JSON.parse(response);
        } catch (e) {
          return response;
        }
      })
    );
  }
}
