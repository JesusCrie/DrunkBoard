import { Component } from '@angular/core';
import { MatDialog, MatSnackBar } from '@angular/material';
import { AdminDialogComponent } from '../admin-dialog/admin-dialog.component';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

  constructor(
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private authService: AuthService
  ) {
  }

  get isLogged() {
    return this.authService.isLogged;
  }

  openAdminLoginDialog() {
    this.dialog.open(AdminDialogComponent, {
      width: '400px'
    });
  }

  logout() {
    this.authService.logout().subscribe(res => {
      this.snackBar.open('Successfully logged out', null, {
        duration: 2000
      });
    });
  }
}
