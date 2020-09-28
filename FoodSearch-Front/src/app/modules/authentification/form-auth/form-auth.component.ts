import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { noop } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AbstractComponent } from 'src/app/core/components/abstract/abstract.component';
import { ConfigService } from 'src/app/core/services/service-config/config.service';
import { UserService } from 'src/app/core/services/service-user/user.service';
import { AppState } from 'src/app/reducers';
import { CustomValidatorUtils } from 'src/app/shared/utils/custom-validator-utils';
import { login } from 'src/app/modules/authentification/actions/authentification.actions';
import { User } from 'src/app/core/models/user/user';


@Component({
  selector: 'app-form-auth',
  templateUrl: './form-auth.component.html',
  styleUrls: ['./form-auth.component.scss']
})
export class FormAuthComponent extends AbstractComponent implements OnInit {

  public authForm: FormGroup;
  public customValidatorUtils = new CustomValidatorUtils();
  public mainErrorDisplay = false;
  public mainErrorMessage: string;
  public isDisabled = false;

  constructor(public configService: ConfigService, private userService: UserService, private router: Router, private formBuilder: FormBuilder, private store: Store<AppState>) {
    super(configService);
  }

  ngOnInit(): void {

    this.authForm = this.formBuilder.group({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });

  }

  get username() { return this.authForm.get('username'); }
  get password() { return this.authForm.get('password'); }


  getErrorMessage(field) {
    if (field.hasError('required')) {
      return this.wording("form", "errors", "required");
    }
    return this.wording("form", "errors", "invalid");
  }

  submitForm() {
    if (this.authForm.invalid) {
      return;
    }
    this.isDisabled = true;
    this.mainErrorDisplay = false;

    this.userService.authenticateUser(this.username.value, this.password.value)
      .pipe(
        tap(userDTO => {

          this.store.dispatch(login({ user: new User(userDTO.username, userDTO.lastName, userDTO.firstName), token: userDTO.token }));

          this.router.navigateByUrl('/');

        })
      ).subscribe(
        noop,
        error => {
          if (error.status === 400) {
            this.mainErrorMessage = this.wording("signin", "errors", "errorWrongUserPassword");
          } else {
            this.mainErrorMessage = this.wording("signin", "errors", "errorUnknown");
          }
          this.mainErrorDisplay = true;
          this.isDisabled = false;
        }
      );

  }

}
