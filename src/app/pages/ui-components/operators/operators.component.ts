import { Component, OnInit, ViewChild } from '@angular/core';
import { forkJoin } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { OperariosService } from '../../../services/operarios.service';
import { UsersService } from '../../../services/users.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Operarios } from '../../../models/operarios';
import { MaterialModule } from '../../../material.module';
import { CommonModule } from '@angular/common';
import { RoleService } from '../../../services/role.service';
import { CarnesService } from '../../../services/carnes.service';

@Component({
  selector: 'app-operators',
  standalone: true,
  imports: [CommonModule, MaterialModule],
  templateUrl: './operators.component.html',
})
export class OperatorsComponent implements OnInit {
  dataSource: MatTableDataSource<Operarios> = new MatTableDataSource();
  displayedColumns: string[] = [
    'userId',
    'username',
    'enabled',
    'nombre',
    'apellido',
    'acciones',
  ];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  isLoading = true;
  idOperarios: number | null = null;

  constructor(
    private operariosService: OperariosService,
    private carnesService: CarnesService,
    private usersService: UsersService,
    private roleService: RoleService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.idOperarios = params['idOperarios'] ? +params['idOperarios'] : null;
      if (this.idOperarios) {
        this.loadOperario(this.idOperarios);
      } else {
        this.loadOperariosList();
      }
    });
  }

  loadOperariosList(): void {
    this.operariosService.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.isLoading = false;
    });
  }

  loadOperario(id: number): void {
    this.operariosService.listId(id).subscribe((operario) => {
      // Handle the operario data for editing
      console.log('Editing operario:', operario);
      this.isLoading = false;
    });
  }

  filter(event: any) {
    this.dataSource.filter = event.target.value.trim().toLowerCase();
  }

  edit(element: Operarios) {
    this.router.navigate([
      '/ui-components/operators/edit',
      element.idOperarios,
    ]);
  }

  delete(element: Operarios) {
    const confirmed = window.confirm(
      '¿Estás seguro de que deseas eliminar este operario?'
    );
    if (confirmed) {
      this.carnesService.listByOperarioId(element.idOperarios).subscribe((carnes) => {
        const deleteNextCarne = (index: number) => {
          if (index < carnes.length) {
            this.carnesService.delete(carnes[index].idCarnes).subscribe(() => {
              deleteNextCarne(index + 1);
            });
          } else {
            this.operariosService.delete(element.idOperarios).subscribe(() => {
              this.roleService.delete(element.users_id.id).subscribe(() => {
                this.usersService.delete(element.users_id.id).subscribe(() => {
                  this.dataSource.data = this.dataSource.data.filter(
                    (op) => op.idOperarios !== element.idOperarios
                  );
                });
              });
            });
          }
        };

        deleteNextCarne(0);
      });
    }
  }

  newOperator() {
    this.router.navigate(['/ui-components/operators/new']);
  }
}
