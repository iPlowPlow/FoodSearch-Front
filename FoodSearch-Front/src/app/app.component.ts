import { Component } from '@angular/core';
import { AbstractComponent } from './core/components/abstract/abstract.component';
import { ConfigService } from './core/services/service-config/config.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent extends AbstractComponent {
  public title = this.wording('header', 'libelles', 'titre');

  constructor(configService: ConfigService){
    super(configService);
  }
}
