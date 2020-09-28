import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AbstractComponent } from 'src/app/core/components/abstract/abstract.component';
import { ConfigService } from 'src/app/core/services/service-config/config.service';
import { UserService } from 'src/app/core/services/service-user/user.service';
import { ModalTextComponent } from 'src/app/shared/components/modal-text/modal-text.component';
import { CustomValidatorUtils } from 'src/app/shared/utils/custom-validator-utils';

@Component({
  selector: 'app-form-signup',
  templateUrl: './form-signup.component.html',
  styleUrls: ['./form-signup.component.scss']
})
export class FormSignupComponent extends AbstractComponent implements OnInit {

  public signupForm: FormGroup;
  public customValidatorUtils = new CustomValidatorUtils();
  public mainErrorDisplay = false;
  public mainErrorMessage: string;
  public isDisabled = false;

  constructor(public configService: ConfigService, public dialog: MatDialog, private formBuilder: FormBuilder,
    private userService: UserService, private router: Router) {
    super(configService);
  }

  ngOnInit(): void {

    this.signupForm = this.formBuilder.group({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(16)]),
      confirmPassword: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      firstName: new FormControl('', [Validators.required]),
    },
      {
        validators: this.customValidatorUtils.MustMatch("password", "confirmPassword")
      }
    );

  }

  get username() { return this.signupForm.get('username'); }
  get password() { return this.signupForm.get('password'); }
  get confirmPassword() { return this.signupForm.get('confirmPassword'); }
  get lastName() { return this.signupForm.get('lastName'); }
  get firstName() { return this.signupForm.get('firstName'); }

  getErrorMessage(field) {
    if (field.hasError('required')) {
      return this.wording("form", "errors", "required");
    } else if (field.hasError('mustMatch')) {
      return this.wording("form", "errors", "pwdMustMatch");
    } else if (field.hasError('minlength')) {
      return this.wording("form", "errors", "pwdMinLength");
    } else if (field.hasError('maxlength')) {
      return this.wording("form", "errors", "pwdMaxLength");
    }
    return this.wording("form", "errors", "invalid");
  }

  submitForm() {
    if (this.signupForm.invalid) {
      return;
    }
    this.isDisabled = true;
    this.mainErrorDisplay = false;

    this.userService.createUser(this.username.value, this.password.value, this.lastName.value, this.firstName.value).subscribe(
      (response: any) => {

        this.dialog.open(ModalTextComponent, {
          data: {
            title: this.wording("signup", "libelles", "titleModal"),
            text: this.wording("signup", "libelles", "textModal"),
            button: this.wording("signup", "libelles", "buttonModal")
          }
        }).afterClosed().subscribe(
          () => {
            this.router.navigateByUrl('/')
          }
        );

      },
      error => {
        if (error.status === 400) {
          this.mainErrorMessage = this.wording("signup", "errors", "errorUserAlreadyExist");
        } else {
          this.mainErrorMessage = this.wording("signup", "errors", "errorUnknown");
        }
        this.mainErrorDisplay = true;
        this.isDisabled = false;
      }
    );

  }

}
