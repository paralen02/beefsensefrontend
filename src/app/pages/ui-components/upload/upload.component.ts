import { Component } from '@angular/core';
import { TensorFlowService } from '../../../services/tensorflow.service';
import { SignedUrlService } from '../../../services/signedurl.service';
import { CommonModule } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MaterialModule } from '../../../material.module';
import { MatTableDataSource } from '@angular/material/table';

interface PredictionDTO {
  category: string;
  confidence: number;
}

@Component({
  selector: 'app-upload',
  imports: [CommonModule, MaterialModule],
  standalone: true,
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent {
  selectedFile: File | null = null;
  predictionResult: PredictionDTO[] | null = null;
  errorMessage: string | null = null;
  imageUrl: string | null = null;
  dataSource: MatTableDataSource<PredictionDTO> = new MatTableDataSource();
  displayedColumns: string[] = ['category', 'confidence'];
  highestConfidence: number | null = null;

  constructor(
    private tensorFlowService: TensorFlowService,
    private signedUrlService: SignedUrlService,
    private snackBar: MatSnackBar
  ) {}

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
      // Step 1: Make the prediction with the local image
      this.tensorFlowService.predict(this.selectedFile).subscribe(
        (result: PredictionDTO[]) => {
          this.predictionResult = result;
          this.dataSource.data = result;
          this.highestConfidence = Math.max(...result.map(r => r.confidence));
          this.errorMessage = null;
          this.snackBar.open('Se realizó la predicción correctamente', 'Cerrar', { duration: 3000 });

          // Step 2: Upload the file to cloud storage
          this.signedUrlService.uploadFile(this.selectedFile!).subscribe(
            () => {
              this.snackBar.open('Archivo subido correctamente', 'Cerrar', { duration: 3000 });
            },
            (error) => {
              console.error('Error uploading file:', error);
              this.errorMessage = 'Ocurrió un error al subir el archivo.';
              this.snackBar.open(this.errorMessage, 'Cerrar', { duration: 3000 });
            }
          );
        },
        (error) => {
          console.error('Error:', error);
          this.errorMessage = 'Ocurrió un error al realizar la predicción.';
          this.snackBar.open(this.errorMessage, 'Cerrar', { duration: 3000 });
        }
      );
    }
  }
}
