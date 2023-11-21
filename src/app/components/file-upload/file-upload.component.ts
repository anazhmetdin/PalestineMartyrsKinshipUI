import { Component, Input } from '@angular/core';
import { FormStates } from 'src/app/Enums/form-states';
import { FileUploaderResponse, IFileUploader } from 'src/app/Interfaces/IFileUploader';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
})
export class FileUploadComponent {
  selectedFile?: File;
  chunkSize: number = 1024 * 1024;
  currentChunkIndex: number = 0;
  fileGUUID4?: string
  cancelled!:boolean
  alert!:string
  status = FormStates.none

  @Input()
  fileUploader!: IFileUploader;
  @Input()
  title!: string;
  @Input()
  show_alerts!: boolean;

  onFileChanged(event: any) {
    this.selectedFile = event.target.files[0];
    this.currentChunkIndex = 0;
  }

  onUpload() {
    if (this.selectedFile)
      this.resetCounters();
      this.status = FormStates.loading;
      this.alert = 'uploading'
      console.log('loading')
      this.uploadNextChunk();
  }

  private uploadNextChunk() {

    if (!this.selectedFile)
      return

    const start = this.currentChunkIndex * this.chunkSize;
    const end = Math.min((this.currentChunkIndex + 1) * this.chunkSize, this.selectedFile.size);
    const blob = this.selectedFile.slice(start, end);

    const formData = {
      chunkFile: blob,
      chunkIndex: this.currentChunkIndex,
      totalChunk: Math.ceil(this.selectedFile.size / this.chunkSize),
      fileGUUID4: this.fileGUUID4
    };

    this.fileUploader.upload(formData).subscribe(
      {
        next: (value:FileUploaderResponse) => {
          this.fileGUUID4 = value.fileGUUID4
          this.currentChunkIndex++;
          if (!this.cancelled && this.selectedFile && start < this.selectedFile.size) {
            this.uploadNextChunk();
          } else {
            this.alert = "File uploaded successfully";
            this.status = FormStates.success;
            this.resetUploader();
          }
        },
        error: (err) => {
          this.alert = err;
          this.status = FormStates.error;
        }
      }
    );
  }

  private resetCounters() {
    this.currentChunkIndex = 0
    this.cancelled = false
  }

  private resetUploader() {
    this.selectedFile = undefined;
    this.fileGUUID4 = undefined;
    this.resetCounters()
  }

  onRemove() {
    if (!this.fileGUUID4)
      return
    this.fileUploader.cancel(this.fileGUUID4).subscribe({
      next: () => {
        this.status = FormStates.success
        this.alert = "File uploaded successfully"
        this.resetUploader();
      },
      error: (err) => {
        this.alert = err;
        this.status = FormStates.error;
      }
    });
  }
}
