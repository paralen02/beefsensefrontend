import { CommonModule } from '@angular/common';
import { Operarios } from './../../../../models/operarios';
import { OperariosService } from './../../../../services/operarios.service';
import { UsersService } from './../../../../services/users.service';
import { RoleService } from './../../../../services/role.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MaterialModule } from '../../../../material.module';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Role } from './../../../../models/role';

@Component({
  selector: 'app-editoperators',
  standalone: true,
  imports: [CommonModule, MaterialModule],
  templateUrl: './editoperators.component.html',
})
export class EditOperatorsComponent implements OnInit {
  form: FormGroup;
  isLoading = true;
  operarioId!: number;
  users_id: number = 0;
  existingPassword: string = '';
  roles: Role[] = [];

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private operariosService: OperariosService,
    private usersService: UsersService,
    private roleService: RoleService,
    private snackBar: MatSnackBar
  ) {
    this.form = this.fb.group({
      idOperarios: [{ value: '', disabled: true }],
      nombre: [''],
      apellido: [''],
      username: [''],
      enabled: [false],
    });
  }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.operarioId = +params['idOperarios'];
      this.operariosService
        .listId(this.operarioId)
        .subscribe((operario: Operarios) => {
          if (operario.users_id) {
            this.users_id = operario.users_id.id;
            this.existingPassword = operario.users_id.password;
            this.form.patchValue({
              idOperarios: operario.idOperarios,
              nombre: operario.nombre,
              apellido: operario.apellido,
              username: operario.users_id.username,
              enabled: operario.users_id.enabled,
            });
            this.roleService
              .getRolesForUser(operario.users_id.username)
              .subscribe((roles: Role[]) => {
                this.roles = roles;
                this.isLoading = false;
              });
          } else {
            console.error(
              'users_id property is undefined in the Operarios object'
            );
            this.isLoading = false;
          }
        });
    });
  }

  onSubmit() {
    if (this.form.valid) {
      const updatedOperario = {
        nombre: this.form.get('nombre')?.value,
        apellido: this.form.get('apellido')?.value,
      };

      const updatedUser = {
        username: this.form.get('username')?.value,
        enabled: this.form.get('enabled')?.value,
      };

      this.operariosService.patch(this.operarioId, updatedOperario).subscribe(() => {
        this.usersService.patch(this.users_id, updatedUser).subscribe(() => {
          this.snackBar.open('Se modificó el usuario con éxito', 'Cerrar', {
            duration: 3000,
          });
          this.router.navigate(['/ui-components/operators']);
        });
      });
    }
  }

  onCancel() {
    this.router.navigate(['/ui-components/operators']);
  }
}
