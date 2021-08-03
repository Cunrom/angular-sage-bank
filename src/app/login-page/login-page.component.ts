import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { UserService } from '../shared/user.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit, OnDestroy {
  loggedInFailed = false;
  loggedInFailedSub: Subscription;
  fieldsAreEmptySub: Subscription;
  userFieldEmptySub: Subscription;
  passwordFieldEmptySub: Subscription;
  fieldsAreEmpty = false;
  userFieldEmpty = false;
  passwordFieldEmpty = false;
  loginData: FormGroup;
  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.loggedInFailedSub = this.userService.loggedInFailed.subscribe(boolean => {
      this.loggedInFailed = boolean;
    });
    this.fieldsAreEmptySub = this.userService.loginFieldsAreEmpty.subscribe(boolean => {
      this.fieldsAreEmpty = boolean;
    });
    this.loginData = new FormGroup({
      username: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required)
    });
    this.userFieldEmptySub = this.userService.loginUsernameFieldEmpty.subscribe(boolean => {
      this.userFieldEmpty = boolean;
    });
    this.passwordFieldEmptySub = this.userService.loginPasswordFieldEmpty.subscribe(boolean => {
      this.passwordFieldEmpty = boolean;
    });
  }
  onSubmit() {
    this.userService.login(this.loginData.value);
  }
  ngOnDestroy() {
    this.loggedInFailedSub.unsubscribe();
    this.fieldsAreEmptySub.unsubscribe();
  }
}
