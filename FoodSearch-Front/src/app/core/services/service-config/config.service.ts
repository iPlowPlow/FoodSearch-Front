import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  wordingFileURL: string = './cfg/wording.json';
  wording: Map<string, Map<string, string>>;

  urlFileURL: string = './cfg/urls.json';
  urls: Map<string, Map<string, string>>;

  constructor(private httpClient: HttpClient) { }

  initWording(): Promise<any> {
    return this.httpClient.get(this.wordingFileURL).toPromise().then((data: Map<string, Map<string, string>>) => {
      this.wording = data;
      return data;
    });
  }

  initAppURLs(): Promise<any> {
    return this.httpClient.get(this.urlFileURL).toPromise().then((data: Map<string, Map<string, string>>) => {
      this.urls = data;
      return data;
    });
  }

  getWording(page: string, type: string, element: string): string {
    if (!this.wording) {
      return "chargement...";
    }
    if (!this.wording[page] || !this.wording[page][type] || !this.wording[page][type][element]) {
      return "indéfini";
    }
    return this.wording[page][type][element];
  }

  getAppURLs(app: string, type: string, url: string): string {
    if (!this.urls) {
      return "chargement...";
    }
    if (!this.urls[app] || !this.urls[app][type] || !this.urls[app][type][url]) {
      return "indéfini";
    }
    
    return this.urls[app][type][url];
  }

}
