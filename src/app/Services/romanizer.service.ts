import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environment/environment';
import { ApiPaths } from '../Enums/api-paths';

@Injectable({
  providedIn: 'root'
})
export class PersonalDataService {

  constructor(private readonly client : HttpClient) { }

  BaseUrl = environment.APP_API_ENDPOINT;

  GetNameRomanized(name: string) {
    let url = this.BaseUrl+ApiPaths.romanize;
    let query = new URLSearchParams({
      name: name
    })
    return this.client.get(url+'?'+query.toString());
  }
}
