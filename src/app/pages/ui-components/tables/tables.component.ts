import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';

import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MaterialModule } from '../../../material.module';
import { Carnes } from '../../../models/carnes';
import { MatPaginator } from '@angular/material/paginator';
import { CarnesService } from '../../../services/carnes.service';

@Component({
  selector: 'app-tables',
  standalone: true,
  imports: [
    MatTableModule,
    CommonModule,
    MatCardModule,
    MaterialModule,
    MatIconModule,
    MatMenuModule,
    MatButtonModule,
  ],
  templateUrl: './tables.component.html',
})
export class AppTablesComponent implements OnInit{

  dataSource: MatTableDataSource<Carnes> = new MatTableDataSource();
  displayedColumns: string[] =
  ['idCarnes', 'sexo', 'conformacion', 'grasa', 'peso', 'fecha', 'operarios_id'];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(private carnesService: CarnesService) {}

  ngOnInit(): void {
    this.carnesService.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });
    this.carnesService.getList().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;

    });
  }
  filter(en: any) {
    this.dataSource.filter = en.target.value.trim();
  }
}
