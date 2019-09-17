import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RepositoryService {

  nodeHost = environment.nodeHost;

  constructor(private http: HttpClient) { }

  public getJsonObject(filename: string): Observable<any> {
    return this.http.get(this.nodeHost + filename);
  }

  public postJsonObject(filename: string, content: string): Observable<any> {
    return this.http.post(this.nodeHost + filename, content);
  }

}
