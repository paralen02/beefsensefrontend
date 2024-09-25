import { JwtHelperService } from '@auth0/angular-jwt';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtRequest } from '../models/jwtRequest';
import { environment } from '../../environments/environment';

const base_url = environment.base;

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private http: HttpClient, private jwtHelper: JwtHelperService) {}

  login(request: JwtRequest) {
    return this.http.post(`${base_url}/authenticate`, request);
  }

  verificar() {
    let token = sessionStorage.getItem('token');
    return token != null;
  }

  isTokenExpired(): boolean {
    let token = sessionStorage.getItem('token');
    if (!token) {
      return true;
    }
    return this.jwtHelper.isTokenExpired(token);
  }

  showRole() {
    let token = sessionStorage.getItem('token');
    if (!token) {
      // Manejar el caso en el que el token es nulo.
      return null;
    }
    const decodedToken = this.jwtHelper.decodeToken(token);
    return decodedToken?.role; // Devuelve los roles tal como están
  }

  getUsername() {
    let token = sessionStorage.getItem('token');
    if (!token) {
      return null;
    }
    const decodedToken = this.jwtHelper.decodeToken(token);
    return decodedToken?.username; // Replace 'username' with the actual key used in your token payload.
  }
}
