import { Component, Inject, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Operarios } from '../../../models/operarios';
import { CarnesService } from '../../../services/carnes.service';
import { OperariosService } from '../../../services/operarios.service';
import { LoginService } from '../../../services/login.service';
import { Carnes } from '../../../models/carnes';
import { MatCardModule } from '@angular/material/card';
import { CommonModule, DatePipe } from '@angular/common';
import { MaterialModule } from '../../../material.module';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forms',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MaterialModule,
    MatIconModule,
    MatMenuModule,
    MatButtonModule,
    MatSnackBarModule
    ],
  templateUrl: './forms.component.html',
})
export class AppFormsComponent implements OnInit {
  form: FormGroup;
  operario: Operarios | null = null;
  isLoading = true;

  pesoOptions = [
    { value: 'A', viewValue: 'A: =< 90 kg' },
    { value: 'B', viewValue: 'B: > 100 kg' },
    { value: 'C', viewValue: 'C: > 120 kg' },
    { value: 'D', viewValue: 'D: >= 140 kg' },
    { value: 'E', viewValue: 'E: >= 150 kg' },
  ];

  grasaOptions = [
    { value: '1', viewValue: '1: Mínima' },
    { value: '2', viewValue: '2: Poca' },
    { value: '3', viewValue: '3: Promedio' },
    { value: '4', viewValue: '4: Alta' },
    { value: '5', viewValue: '5: Muy alta' },
  ];

  conformacionOptions = [
    { value: 'E', viewValue: 'E: Excelente' },
    { value: 'U', viewValue: 'U: Muy buena' },
    { value: 'R', viewValue: 'R: Buena' },
    { value: 'O', viewValue: 'O: Justa' },
    { value: 'P', viewValue: 'P: Pobre' },
  ];

  sexOptions = [
    { value: 'Novillo', viewValue: 'A (novillo)' },
    { value: 'Toro', viewValue: 'B (toro)' },
    { value: 'Vaca', viewValue: 'C (vaca)' },
    { value: 'Novilla', viewValue: 'E (novilla)' },
    { value: 'Ternera', viewValue: 'Z (ternera)' },
  ];

  constructor(
    private fb: FormBuilder,
    private carnesService: CarnesService,
    private operariosService: OperariosService,
    private loginService: LoginService,
    private router: Router,
    private snackBar: MatSnackBar,
    private datePipe: DatePipe

  ) {
    this.form = this.fb.group({
      idCarnes: ['', Validators.required],
      peso: ['', Validators.required],
      grasa: ['', Validators.required],
      conformacion: ['', Validators.required],
      sexo: ['', Validators.required],
      fecha: [
        { value: this.datePipe.transform(new Date(), 'dd/MM/yyyy HH:mm', '-0500'), disabled: true },
        Validators.required,
      ],
      operarioName: [{ value: '', disabled: true }],
    });
  }

  ngOnInit() {
    this.carnesService.list().subscribe((response: any[]) => {
      const lastId =
        response.length > 0 ? response[response.length - 1].idCarnes : 0;
      const newId = lastId + 1;
      this.form.patchValue({ idCarnes: newId });
      this.form.get('idCarnes')?.disable();
      sessionStorage.setItem('idCarnes', newId.toString());
      this.isLoading = false;
    });
    this.loadOperario();
    this.updateFecha();
  }

  updateFecha() {
    setInterval(() => {
      const fecha = new Date();
      this.form.patchValue({
        fecha: this.datePipe.transform(fecha, 'dd/MM/yyyy HH:mm', '-0500'),
      });
    }, 1000);
  }

  loadOperario() {
    const username = this.loginService.getUsername();
    if (username) {
      this.operariosService.findByUsername(username).subscribe(
        (data) => {
          this.operario = data;
          sessionStorage.setItem('operario', JSON.stringify(this.operario));
          this.form.patchValue({
            operarioName: `${this.operario?.nombre} ${this.operario?.apellido}`,
          });
        },
        (error) => {
          this.snackBar.open('Error al obtener los datos del operario', 'Cerrar', {
            duration: 3000,
          });
        }
      );
    }
  }

  onSubmit() {
    if (this.form.valid && this.operario) {
      const storedOperario = sessionStorage.getItem('operario');
      const operarioData = storedOperario ? JSON.parse(storedOperario) : null;

      if (operarioData) {
        const carneData: Carnes = {
          idCarnes: this.form.get('idCarnes')?.value,
          peso: this.form.get('peso')?.value,
          sexo: this.form.get('sexo')?.value,
          fecha: new Date(this.form.get('fecha')?.value),
          conformacion: this.form.get('conformacion')?.value,
          grasa: this.form.get('grasa')?.value,
          operarios_id: { idOperarios: operarioData.idOperarios },
          imagen: '',
        };

        this.carnesService.insert(carneData).subscribe(
          (response) => {
            this.snackBar.open('Carne registrada con éxito', 'Cerrar', {
              duration: 3000,
            });
            this.router.navigate(['/ui-components/upload', carneData.idCarnes]);
          },
          (error) => {
            this.snackBar.open('Error al registrar la carne', 'Cerrar', {
              duration: 3000,
            });
          }
        );
      } else {
        this.snackBar.open('No se encontró información del operario en la sesión', 'Cerrar', {
          duration: 3000,
        });
      }
    } else {
      this.snackBar.open('Formulario inválido', 'Cerrar', {
        duration: 3000,
      });
    }
  }

  onCancel() {
    this.router.navigate(['/ui-components/tables']);
  }
}
