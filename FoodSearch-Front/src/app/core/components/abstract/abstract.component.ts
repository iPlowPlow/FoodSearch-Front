import { ConfigService } from '../../services/service-config/config.service';

export class AbstractComponent {
  constructor(protected configService: ConfigService) {
  }

  wording(page: string, type: string, element: string) {
    return this.configService.getWording(page, type, element);
  }

}
