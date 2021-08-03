import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Subject } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class UserService {
    constructor(private http: HttpClient, private router: Router) { }
    usernameList: string[] = [];
    usernameTaken = new Subject<boolean>();
    signedUp = new Subject<boolean>();
    loggedIn = new Subject<boolean>();
    username = new Subject<string>();
    loggedInFailed = new Subject<boolean>();
    passwordNotMatch = new Subject<boolean>();
    signupFieldsAreEmpty = new Subject<boolean>();
    loginFieldsAreEmpty = new Subject<boolean>();
    loginUsernameFieldEmpty = new Subject<boolean>();
    loginPasswordFieldEmpty = new Subject<boolean>();
    getUsernames() {
        this.http.get('https://ng-cunrom-bank-default-rtdb.firebaseio.com/users.json')
            .subscribe(data => {
                for (const key in data) {
                    this.usernameList.push(data[key].username);
                };
            });
    }
    signup(signupData) {
        console.log(signupData);
        if (signupData.username == null || signupData.username == "" || signupData.password == null || signupData.password == "" || signupData.confirmPassword == null || signupData.confirmPassword == "") {
            this.signupFieldsAreEmpty.next(true);
            this.passwordNotMatch.next(false);
            return;
        }
        if ((signupData.username != null || signupData.username != "") && (signupData.password != null || signupData.password != "") && (signupData.confirmPassword != null || signupData.confirmPassword != "")) {
            this.signupFieldsAreEmpty.next(false);
        }
        for (const username of this.usernameList) {
            if (username.toUpperCase() == signupData.username.toUpperCase()) {
                this.usernameTaken.next(true);
                return;
            }
        };
        for (const username of this.usernameList) {
            if (username.toUpperCase() !== signupData.username.toUpperCase()) {
                this.usernameTaken.next(false);
            }
        };
        for (const username of this.usernameList) {
            if (username.toUpperCase() !== signupData.username.toUpperCase()) {
                this.usernameTaken.next(false);
            }
        };
        if (signupData.password.toUpperCase() !== signupData.confirmPassword.toUpperCase()) {
            this.passwordNotMatch.next(true);
            return;
        }
        this.signedUp.next(true);
        this.username.next(signupData.username);
        this.http.post('https://ng-cunrom-bank-default-rtdb.firebaseio.com/users.json', signupData)
            .subscribe();
    }
    login(loginData) {
        console.log(loginData);
        if (!(loginData.username == null || '')) {
            this.loginUsernameFieldEmpty.next(false);
        };
        if (!(loginData.password == null || '')) {
            this.loginPasswordFieldEmpty.next(false);
        };
        if (((loginData.username == null) || (loginData.username == ""))) {
            this.loginUsernameFieldEmpty.next(true);
            this.loginFieldsAreEmpty.next(true);
        };
        if (((loginData.password == null) || (loginData.password == ""))) {
            this.loginPasswordFieldEmpty.next(true);
            this.loginFieldsAreEmpty.next(true);
        };
        if ((loginData.username != null || '') && (loginData.password != null || '')) {
            this.loginFieldsAreEmpty.next(false);
        };
        if ((loginData.username == null || loginData.username == "") && (loginData.password == null) || (loginData.password == "")) {
            this.loginFieldsAreEmpty.next(true);
            return;
        };
        this.http.get('https://ng-cunrom-bank-default-rtdb.firebaseio.com/users.json')
            .subscribe(data => {
                for (const key in data) {
                    if (data[key].username === loginData.username && data[key].password === loginData.password) {
                        this.loggedIn.next(true);
                        this.username.next(data[key].username);
                        this.router.navigate(['/']);
                        return;
                    }
                };
                this.loggedInFailed.next(true);
            });
    }
}