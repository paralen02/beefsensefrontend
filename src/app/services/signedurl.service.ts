import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, from } from 'rxjs';
import { environment } from '../../environments/environment';
import { switchMap } from 'rxjs/operators';

const base_url = environment.base;

@Injectable({
  providedIn: 'root'
})
export class SignedUrlService {

  private url = `${base_url}/api/generate-signed-url`;

  constructor(private http: HttpClient) {}

  uploadFile(file: File): Observable<any> {
    let token = sessionStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    // Step 1: Get the signed URL from the backend
    return this.http.get(`${this.url}?fileName=${file.name}`, { headers, responseType: 'text' }).pipe(
      switchMap((signedUrl: string) => {
        // Step 2: Upload the file to the signed URL
        return from(fetch(signedUrl, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/octet-stream'
          },
          body: file
        }).then(response => response.ok ? response : Promise.reject(response)));
      })
    );
  }
}
