import { Component, OnInit } from '@angular/core';
import { TensorFlowService } from '../../../services/tensorflow.service';
import { SignedUrlService } from '../../../services/signedurl.service';
import { CarnesService } from '../../../services/carnes.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MaterialModule } from '../../../material.module';
import { MatTableDataSource } from '@angular/material/table';
import { Carnes } from '../../../models/carnes';

interface PredictionDTO {
  category: string;
  confidence: number;
}

@Component({
  selector: 'app-upload',
  imports: [CommonModule, MaterialModule],
  standalone: true,
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css'],
})
export class UploadComponent implements OnInit {
  selectedFile: File | null = null;
  predictionResult: PredictionDTO[] | null = null;
  errorMessage: string | null = null;
  imageUrl: string | null = null;
  dataSource: MatTableDataSource<PredictionDTO> = new MatTableDataSource();
  displayedColumns: string[] = ['category', 'confidence'];
  highestConfidence: number | null = null;
  idCarnes: number | null = null;

  constructor(
    private tensorFlowService: TensorFlowService,
    private signedUrlService: SignedUrlService,
    private carnesService: CarnesService,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.idCarnes = +this.route.snapshot.paramMap.get('idCarnes')!;
    if (this.idCarnes !== null) {
      this.carnesService.listId(this.idCarnes).subscribe(
        (carnes: Carnes) => {
          if (carnes.imagen && (carnes.imagen.includes('google') || carnes.imagen.includes('bucket'))) {
            this.snackBar.open('Ya has subido una imagen para esta entrada', 'Cerrar', {
              duration: 3000,
            });
            this.router.navigate(['/ui-components/tables']);
          }
        },
        (error) => {
          console.error('Error checking image:', error);
        }
      );
    }
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imageUrl = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  onUpload(): void {
    if (this.selectedFile) {
      const startTime = new Date().getTime(); // Captura el tiempo antes de la predicción
      // Hacer la predicción con la imagen local
      this.tensorFlowService.predict(this.selectedFile).subscribe(
        (result: PredictionDTO[]) => {
          const endTime = new Date().getTime(); // Captura el tiempo después de la predicción
          const predictionTime = endTime - startTime; // Calcula el tiempo de predicción

          this.predictionResult = result;
          this.dataSource.data = result;
          this.highestConfidence = Math.max(...result.map((r) => r.confidence));
          this.errorMessage = null;
          console.log('Resultado de la predicción:', result, 'Tiempo de predicción:', predictionTime, 'ms');

          // Subir a GCP (buckets) con signedUrl
          this.signedUrlService.uploadFile(this.selectedFile!).subscribe(
            (uploadResult: any) => {
              this.snackBar.open('Archivo subido correctamente', 'Cerrar', {
                duration: 3000,
              });

              // Guardar el link de la imagen en la base de datos
              if (this.idCarnes !== null) {
                const url = new URL(uploadResult.url);
                const baseUrl = `${url.origin}${url.pathname}`;

                this.carnesService
                  .updateImagen(this.idCarnes, baseUrl)
                  .subscribe(
                  () => {
                    console.log('Enlace guardado correctamente');
                  },
                  (error) => {
                    console.error('Error al guardar el enlace:', error);
                    this.errorMessage =
                    'Ocurrió un error al guardar el enlace.';
                    console.log(this.errorMessage);
                  }
                  );
              }
            },
            (error) => {
              console.error('Error al subir el archivo:', error);
              this.errorMessage = 'Ocurrió un error al subir el archivo.';
              this.snackBar.open(this.errorMessage, 'Cerrar', {
                duration: 3000,
              });
            }
          );
        },
        (error) => {
          console.error('Error:', error);
          this.errorMessage = 'Ocurrió un error al realizar la predicción.';
            console.log(this.errorMessage);
        }
      );
    }
  }
}
