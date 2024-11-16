import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { MaterialModule } from '../../../material.module';
import { MatButtonModule } from '@angular/material/button';
import { LoginService } from '../../../services/login.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { JwtRequest } from '../../../models/jwtRequest';

@Component({
  selector: 'app-side-login',
  standalone: true,
  imports: [
    RouterModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
  ],
  templateUrl: './side-login.component.html',
})
export class AppSideLoginComponent implements OnInit {
  constructor(private loginService: LoginService, private router: Router, private snackBar: MatSnackBar) { }
  username: string = ""
  password: string = ""
  mensaje: string = ""
  role: string = ""

  ngOnInit(): void {
    if (this.loginService.verificar() && !this.loginService.isTokenExpired()) {
      this.router.navigate(['/dashboard']);
    } else if (this.loginService.isTokenExpired()) {
      sessionStorage.removeItem('token');
      this.router.navigate(['/authentication/login']);
    }
  }

  form = new FormGroup({
    uname: new FormControl('', [Validators.required, Validators.minLength(4)]),
    password: new FormControl('', [Validators.required]),
  });

  get f() {
    return this.form.controls;
  }

  login() {
    // Verificar si ambos campos están vacíos
    if (!this.username.trim() || !this.password.trim()) {
      this.mensaje = "Ambos campos son obligatorios.";
      this.snackBar.open(this.mensaje, 'Cerrar', {
        duration: 3000,
        horizontalPosition: 'center',
        verticalPosition: 'bottom',
      });
      return;
    }

    let request = new JwtRequest();
    request.username = this.username;
    request.password = this.password;

    this.loginService.login(request).subscribe(
      (data: any) => {
        sessionStorage.setItem("token", data.jwttoken);
        sessionStorage.setItem("username", this.username);

        let roles = this.loginService.showRole();
        if (roles.includes('ADMIN') || roles.includes('OPERARIO')) {
          this.router.navigate(['/dashboard']);
          sessionStorage.setItem('shouldRefresh', 'true');
        }
      },
      error => {
        this.mensaje = "Las credenciales son inválidas. Intente nuevamente.";
        this.snackBar.open(this.mensaje, 'Cerrar', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
        });
      }
    );
  }

}
