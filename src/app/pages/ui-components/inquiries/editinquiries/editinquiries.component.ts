import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MaterialModule } from '../../../../material.module';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConsultasService } from '../../../../services/consultas.service';
import { Consultas } from '../../../../models/consultas';

@Component({
  selector: 'app-editinquiries',
  standalone: true,
  imports: [CommonModule, MaterialModule],
  templateUrl: './editinquiries.component.html',
  styleUrls: ['./editinquiries.component.css']
})
export class EditInquiriesComponent implements OnInit {
  form: FormGroup;
  isLoading = true;
  consultaId!: number;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private consultasService: ConsultasService,
    private snackBar: MatSnackBar
  ) {
    this.form = this.fb.group({
      idConsultas: [{ value: '', disabled: true }],
      username: [{ value: '', disabled: true }],
      correo: [{ value: '', disabled: true }],
      motivo: [{ value: '', disabled: true }],
      descripcion: [{ value: '', disabled: true }],
      fecha: [{ value: '', disabled: true }],
      estado: [false]
    });
  }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.consultaId = +params['idConsultas'];
      this.consultasService.listId(this.consultaId).subscribe((consulta: Consultas) => {
        this.form.patchValue({
          idConsultas: consulta.idConsultas,
          username: consulta.username,
          correo: consulta.correo,
          motivo: consulta.motivo,
          descripcion: consulta.descripcion,
          fecha: consulta.fecha,
          estado: consulta.estado
        });
        this.isLoading = false;
      });
    });
  }

  onSubmit() {
    if (this.form.valid) {
      const updatedConsulta = {
        estado: this.form.get('estado')?.value
      };

      this.consultasService.patch(this.consultaId, updatedConsulta).subscribe(() => {
        this.snackBar.open('Se modificó la consulta con éxito', 'Cerrar', {
          duration: 3000,
        });
        this.router.navigate(['/ui-components/inquiries']);
      });
    }
  }

  onCancel() {
    this.router.navigate(['/ui-components/inquiries']);
  }
}
