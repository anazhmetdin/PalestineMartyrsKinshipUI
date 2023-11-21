import { Component, ElementRef, Input, ViewChild } from '@angular/core';
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
  @ViewChild('fileInput')
  fileInput!: ElementRef;

  onFileChanged(event: any) {
    this.selectedFile = event.target.files[0];
    this.currentChunkIndex = 0;
  }

  onUpload() {
    if (!this.selectedFile)
      return;

    this.resetCounters();
    this.status = FormStates.loading;
    this.alert = 'uploading';
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
          if (this.cancelled) {
            return;
          } else if (this.selectedFile && start < this.selectedFile.size) {
            this.uploadNextChunk();
          } else {
            this.alert = "File uploaded successfully";
            this.status = FormStates.success;
            this.resetUploader();
          }
        },
        error: (err) => {
          this.alert = err.error;
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
    this.fileInput.nativeElement.value = null
  }

  onRemove() {
    if (!this.fileGUUID4)
      return
    this.cancelled = true
    this.status = FormStates.none
    this.fileUploader.cancel(this.fileGUUID4).subscribe({
      error: (err) => {
        this.alert = err.error;
        this.status = FormStates.error;
      }
    });
  }

  public get FormStates(): typeof FormStates {
    return FormStates;
  }
}
