import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ConsultasService } from '../../../services/consultas.service';
import { Consultas } from '../../../models/consultas';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../../material.module';

@Component({
  selector: 'app-inquiries',
  standalone: true,
  imports: [CommonModule, MaterialModule],
  templateUrl: './inquiries.component.html',
  styleUrls: ['./inquiries.component.css']
})
export class InquiriesComponent implements OnInit {
  dataSource: MatTableDataSource<Consultas> = new MatTableDataSource();
  displayedColumns: string[] = ['idConsultas', 'username', 'correo', 'motivo', 'fecha', 'estado', 'acciones'];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  isLoading = true;

  constructor(
    private consultasService: ConsultasService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadConsultasList();
  }

  loadConsultasList(): void {
    this.consultasService.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.isLoading = false;
    });
  }

  filter(event: any) {
    this.dataSource.filter = event.target.value.trim().toLowerCase();
  }

  edit(element: Consultas) {
    this.router.navigate(['/ui-components/inquiries/edit', element.idConsultas]);
  }
}
