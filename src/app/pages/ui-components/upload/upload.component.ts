import { Component } from '@angular/core';
import { TensorFlowService } from '../../../services/tensorflow.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-upload',
  imports: [CommonModule],
  standalone: true,
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent {
  selectedFile: File | null = null;
  predictionResult: any | null = null;
  errorMessage: string | null = null;

  constructor(private tensorFlowService: TensorFlowService) {}

  onFileSelected(event: any): void {
    console.log('File selected:', event.target.files[0]);
    this.selectedFile = event.target.files[0];
  }

  onUpload(): void {
    if (this.selectedFile) {
      this.tensorFlowService.predict(this.selectedFile).subscribe(
        (result: any) => {
          this.predictionResult = result;
          this.errorMessage = null;
        },
        (error) => {
          console.error('Error:', error);
          this.errorMessage = 'An error occurred while processing your request.';
        }
      );
    }
  }
}
