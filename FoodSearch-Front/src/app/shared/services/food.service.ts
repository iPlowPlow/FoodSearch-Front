import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConfigService } from 'src/app/core/services/service-config/config.service';

@Injectable({
  providedIn: 'root'
})
export class FoodService {

  constructor(private config: ConfigService, private httpClient: HttpClient) { }

  getFood(): Observable<any> {
    const url = this.config.getAppURLs('backend', 'base', 'url') + '' + this.config.getAppURLs('backend', 'food', 'url');
    return this.httpClient.get(url);
  }

}
