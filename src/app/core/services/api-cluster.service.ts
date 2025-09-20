import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiClusterService {

  constructor(private http: HttpClient) { }

  public getApiClusters(){}
}
