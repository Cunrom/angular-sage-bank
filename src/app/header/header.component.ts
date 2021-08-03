import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { UserService } from '../shared/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  loggedInSub: Subscription;
  usernameSub: Subscription;
  resizedOnCollapsed = false;
  collapsed = true;
  loggedIn = false;
  username = '';
  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.loggedIn.subscribe(boolean => {
      this.loggedIn = boolean;
    });
    this.userService.username.subscribe((username: string) => {
      this.username = username;
    })
  }
  onNavbarToggle() {
    this.collapsed = !this.collapsed;
  }
  onWindowResize() {
    this.collapsed = true;
  }
  ngOnDestroy() {
    this.usernameSub.unsubscribe();
    this.loggedInSub.unsubscribe();
  }
}
