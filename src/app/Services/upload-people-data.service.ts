import { Injectable } from '@angular/core';
import { ApiPaths } from 'src/app/Enums/api-paths';
import { UploaderBaseService } from './uploader-base.service';

@Injectable({
  providedIn: 'root'
})
export class UploadPeopleDataService extends UploaderBaseService {
  UploadUrl = this.BaseUrl+ApiPaths.KinshipManager+ApiPaths.KinshipManagerUpload;
  CancelUrl = this.UploadUrl;
}
