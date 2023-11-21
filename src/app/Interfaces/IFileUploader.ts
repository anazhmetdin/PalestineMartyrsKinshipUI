import { Observable } from "rxjs"

export interface FileUploaderFormData {
  fileGUUID4?: string,
  totalChunk: number,
  chunkIndex: number,
  chunkFile: Blob
}

export interface FileUploaderResponse {
  fileGUUID4: string
}

export interface IFileUploader {
  upload: (form: FileUploaderFormData) => Observable<FileUploaderResponse>,
  cancel: (fileGUUID4: string) => Observable<string>
}
