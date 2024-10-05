import { Consultas } from './../../../models/consultas';
import { ConsultasService } from './../../../services/consultas.service';
import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { MaterialModule } from '../../../material.module';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-support',
  standalone: true,
  imports: [CommonModule, MaterialModule],
  templateUrl: './support.component.html',
  styleUrls: ['./support.component.css']
})
export class SupportComponent implements OnInit {
  supportForm: FormGroup;
  isLoading = false;
  showSupportForm = false;
  motivos: string[] = [
    'Contraseña olvidada',
    'Usuario olvidado',
    'Error en la plataforma',
    'Error en la clasificación',
    'Otro'
  ];

  constructor(
    private fb: FormBuilder,
    private consultasService: ConsultasService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {
    this.supportForm = this.fb.group({
      username: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      motivo: ['', Validators.required],
      descripcion: ['', Validators.required],
      fecha: [{ value: new Date(), disabled: true }, Validators.required]
    });
  }

  ngOnInit(): void {}

  toggleSupportForm() {
    this.showSupportForm = !this.showSupportForm;
  }

  onSupportSubmit() {
    if (this.supportForm.valid) {
      const formValues = this.supportForm.getRawValue();
      const newConsulta: Consultas = {
        ...formValues,
        idConsultas: 0,
        estado: false
      };

      this.consultasService.insert(newConsulta).subscribe(
        (response: any) => {
          this.snackBar.open('La consulta se envió correctamente. El administrador se pondrá en contacto con usted a la brevedad.', 'Cerrar', {
            duration: 5000,
          });
          this.router.navigate(['/']);
        },
        (error: any) => {
          this.snackBar.open('Error al enviar la consulta', 'Cerrar', {
            duration: 5000,
          });
        }
      );
    }
  }

  onVolver() {
    this.router.navigate(['/']);
  }
}
