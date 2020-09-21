
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../../models/user/user';
import { ConfigService } from '../service-config/config.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private config: ConfigService, private httpClient: HttpClient) { }

  createUser(username: string, password: string, lastName: string, firstName: string): Observable<any> {
    let user = new User(username, password, lastName, firstName);
    let url = this.config.getAppURLs("backend","base", "url") + "" + this.config.getAppURLs("backend","user", "url");
    return this.httpClient.post(url, user);
  }

}
