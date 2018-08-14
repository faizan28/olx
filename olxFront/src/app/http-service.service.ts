import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class HttpServiceService {

  constructor(
    public http: HttpClient
  ) { }
  login(data) {
    return this.http.post('/api/login', data);
  }
}
