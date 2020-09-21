import { APP_INITIALIZER, NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfigService } from './services/service-config/config.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { JsonSanitizer } from './interceptors/interceptor-json-sanitizer/json-sanitizer.interceptor';
import { Header } from './interceptors/interceptor-json-sanitizer/header.interceptor';


/**
 * Init function.
 * Load wording file
 * @param config configService.
 */
export function appWordingConfig(config: ConfigService) {
    return () => config.initWording();
  }
  
  /**
  * Init function.
  * Load urls file.
  * @param config configService.
  */
  export function appURLsConfig(config: ConfigService) {
    return () => config.initAppURLs();
  }


@NgModule({
    imports: [
        CommonModule,
        HttpClientModule
    ],
    providers: [
        { provide: APP_INITIALIZER, useFactory: appWordingConfig, deps: [ConfigService], multi: true },
        { provide: APP_INITIALIZER, useFactory: appURLsConfig, deps: [ConfigService], multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: JsonSanitizer, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: Header, multi: true },
      ],
})
export class CoreModule {
    constructor(@Optional() @SkipSelf() core: CoreModule) {
        if (core) {
            throw new Error("You should import core module only in the root module")
        }
    }
}
