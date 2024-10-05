import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UsersService } from '../../../../services/users.service';
import { OperariosService } from '../../../../services/operarios.service';
import { Users } from '../../../../models/users';
import { Operarios } from '../../../../models/operarios';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../../../material.module';

@Component({
  selector: 'app-newoperator',
  standalone: true,
  imports: [CommonModule, MaterialModule],
  templateUrl: './newoperator.component.html',
  styleUrls: ['./newoperator.component.css']
})
export class NewOperatorComponent implements OnInit {
  form: FormGroup;
  isLoading = true;

  constructor(
    private fb: FormBuilder,
    private usersService: UsersService,
    private operariosService: OperariosService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    // Initialize the form with 'idOperarios' field
    this.form = this.fb.group({
      idOperarios: [{ value: '', disabled: true }], // Add idOperarios here initially
      username: ['', Validators.required],
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.isLoading = true;
    this.operariosService.list().subscribe(
      (operariosList: Operarios[]) => {
        if (operariosList && operariosList.length > 0) {
          // Get the last idOperarios
          const lastOperario = operariosList[operariosList.length - 1];
          const nextId = lastOperario.idOperarios ? lastOperario.idOperarios + 1 : 1;
          this.form.patchValue({ idOperarios: nextId }); // Update the existing idOperarios control
        } else {
          // If the list is empty, start with ID 1
          this.form.patchValue({ idOperarios: 1 });
        }
        this.isLoading = false; // Set isLoading to false after the fetch operation is complete

      },
      (error) => {
        this.isLoading = false;
        this.snackBar.open('Error al obtener los datos de los operarios', 'Cerrar', {
          duration: 3000,
        });
      }
    );
  }

  onSubmit() {
    if (this.form.valid) {
      const newUser: Users = {
        id: 0,
        username: this.form.get('username')?.value,
        password: '',
        enabled: true,
      };

      this.usersService.insert(newUser).subscribe((response: any) => {
        const createdUsername = newUser.username;

        this.usersService.buscarPorUsername(createdUsername).subscribe((createdUser: Users) => {
          sessionStorage.setItem('createdUser', JSON.stringify(createdUser));
          const newOperario: Operarios = {
            idOperarios: 0,
            nombre: this.form.get('nombre')?.value,
            apellido: this.form.get('apellido')?.value,
            users_id: createdUser,
          };

          this.operariosService.insert(newOperario).subscribe(() => {
            this.snackBar.open('Operario creado con éxito', 'Cerrar', {
              duration: 3000,
            });
            this.router.navigate(['/ui-components/operators']);
          }, (error) => {
            this.isLoading = false;
            this.snackBar.open('Error al crear el operario', 'Cerrar', {
              duration: 3000,
            });
          });
        }, (error) => {
          this.isLoading = false;
          this.snackBar.open('Error al buscar el usuario', 'Cerrar', {
            duration: 3000,
          });
        });
      }, (error) => {
        this.isLoading = false;
        this.snackBar.open('Error al crear el usuario', 'Cerrar', {
          duration: 3000,
        });
      });
    }
  }

  onCancel() {
    this.router.navigate(['/ui-components/operators']);
  }
}
