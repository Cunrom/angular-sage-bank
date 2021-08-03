import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { UserService } from '../shared/user.service';

@Component({
  selector: 'app-signup-page',
  templateUrl: './signup-page.component.html',
  styleUrls: ['./signup-page.component.css']
})
export class SignupPageComponent implements OnInit, OnDestroy {
  username = '';
  usernameTaken = false;
  fieldsAreEmpty = false;
  usernameTakenSub: Subscription;
  signedUpSub: Subscription;
  usernameSub: Subscription;
  signupData: FormGroup;
  passwordSub: Subscription;
  fieldsAreEmptySub: Subscription;
  passwordNotMatch = false;

  constructor(private userService: UserService) { }
  signedUp = false;
  usernameList: string[] = [];


  ngOnInit(): void {
    this.signupData = new FormGroup({
      username: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required),
      confirmPassword: new FormControl(null, Validators.required)
    });
    // Subscription for if the username input is already taken
    this.usernameTakenSub = this.userService.usernameTaken.subscribe(boolean => {
      this.usernameTaken = boolean;
    });
    // Subscription for if the user has signedup
    this.signedUpSub = this.userService.signedUp.subscribe(boolean => {
      this.signedUp = boolean;
    });
    this.usernameSub = this.userService.username.subscribe(username => {
      this.username = username;
    });
    this.passwordSub = this.userService.passwordNotMatch.subscribe(boolean => {
      this.passwordNotMatch = boolean;
    });
    this.fieldsAreEmptySub = this.userService.signupFieldsAreEmpty.subscribe(boolean => {
      this.fieldsAreEmpty = boolean;
    })
  }
  onSubmit() {
    this.userService.signup(this.signupData.value);
  }
  backgroundImage() {
    if (!this.signedUp) {
      return "url('../../assets/images/pixel-background.png')";
    } else if (this.signedUp) {
      return "none";
    }
  }
  ngOnDestroy() {
    // Unsubscribes the subscriptions
    this.usernameTakenSub.unsubscribe();
    this.signedUpSub.unsubscribe();
    this.usernameSub.unsubscribe();
    this.passwordSub.unsubscribe();
    this.fieldsAreEmptySub.unsubscribe();
  }
}
