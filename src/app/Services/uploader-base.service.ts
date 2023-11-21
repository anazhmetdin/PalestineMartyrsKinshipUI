import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environment/environment';
import { FileUploaderFormData, FileUploaderResponse } from '../Interfaces/IFileUploader';

@Injectable({
  providedIn: 'root'
})
export abstract class UploaderBaseService {

  BaseUrl = environment.APP_API_ENDPOINT;
  abstract UploadUrl:string
  abstract CancelUrl:string

  constructor(private readonly client : HttpClient) { }

  upload(form: FileUploaderFormData) {
    const formData = new FormData();
    for (const [key, value] of Object.entries(form)) {
      formData.append(key, value);
    }
    return this.client.post<FileUploaderResponse>(this.UploadUrl+'/', formData, { withCredentials: true });
  }

  cancel(fileGUUID4: string) {
    return this.client.delete<string>(this.CancelUrl+'/'+fileGUUID4+'/', { withCredentials: true });
  }
}
