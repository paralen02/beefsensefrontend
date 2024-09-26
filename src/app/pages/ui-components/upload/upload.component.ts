import { Firestore, collectionData, collection } from '@angular/fire/firestore';
import { Component, inject } from '@angular/core';
import { TensorFlowService } from '../../../services/tensorflow.service';
import { CommonModule } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MaterialModule } from '../../../material.module';
import { MatTableDataSource } from '@angular/material/table';
import { AngularFireStorage } from '@angular/fire/compat/storage';

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

  firestore: Firestore = inject(Firestore);
  aCollection = collection(this.firestore, 'items');
  items$ = collectionData(this.aCollection);

  constructor(
    private tensorFlowService: TensorFlowService,
    private snackBar: MatSnackBar,
    private afStorage: AngularFireStorage // Inject AngularFireStorage
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
      const filePath = `images/${this.selectedFile.name}`;
      const fileRef = this.afStorage.ref(filePath);

      // Step 1: Upload the image to Firebase Storage
      const task = this.afStorage.upload(filePath, this.selectedFile);

      task.snapshotChanges().subscribe({
        next: (snapshot) => {
          console.log('Uploaded a blob or file!', snapshot);

          // Get the download URL
          fileRef.getDownloadURL().subscribe({
            next: (downloadURL) => {
              console.log('File available at', downloadURL);

              // Log the resulting URL of the uploaded image
              console.log('Resulting URL:', downloadURL);

              // Step 2: Make the prediction using the uploaded image URL
              this.tensorFlowService.predict(this.selectedFile as File).subscribe(
                (result: PredictionDTO[]) => {
                  this.predictionResult = result;
                  this.dataSource.data = result;
                  this.highestConfidence = Math.max(...result.map(r => r.confidence));
                  this.errorMessage = null;
                  this.snackBar.open('Se realizó la predicción correctamente', 'Cerrar', { duration: 3000 });
                },
                (error) => {
                  console.error('Error:', error);
                  this.errorMessage = 'Ocurrió un error al realizar la predicción.';
                  this.snackBar.open(this.errorMessage, 'Cerrar', { duration: 3000 });
                }
              );
            },
            error: (error) => {
              console.error('Error getting download URL:', error);
              this.errorMessage = 'Ocurrió un error al obtener la URL de descarga.';
              this.snackBar.open(this.errorMessage, 'Cerrar', { duration: 3000 });
            }
          });
        },
        error: (error) => {
          console.error('Error uploading image:', error);
          this.errorMessage = 'Ocurrió un error al subir la imagen.';
          this.snackBar.open(this.errorMessage, 'Cerrar', { duration: 3000 });
        }
      });
    }
  }
}
