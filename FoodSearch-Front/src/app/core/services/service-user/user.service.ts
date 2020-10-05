
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserDTO } from 'src/app/shared/dtos/user-dto';
import { ConfigService } from '../service-config/config.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private config: ConfigService, private httpClient: HttpClient) { }

  createUser(username: string, password: string, lastName: string, firstName: string): Observable<any> {
    const user = new UserDTO(username, password, lastName, firstName);
    const url = this.config.getAppURLs('backend', 'base', 'url') + '' + this.config.getAppURLs('backend', 'user', 'url');
    return this.httpClient.post(url, user);
  }

  authenticateUser(username: string, password: string): Observable<UserDTO>{
    const user = new UserDTO(username, password, null, null);
    const url = this.config.getAppURLs('backend', 'base', 'url') + '' + this.config.getAppURLs('backend', 'authenticate', 'url');

    return this.httpClient.post<UserDTO>(url, user);
  }

}
