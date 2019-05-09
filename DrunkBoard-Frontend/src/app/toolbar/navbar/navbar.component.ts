import { Component } from '@angular/core';
import { MatDialog } from '@angular/material';
import { AdminDialogComponent } from '../admin-dialog/admin-dialog.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

  constructor(private dialog: MatDialog) {
  }

  openAdminLoginDialog() {
    this.dialog.open(AdminDialogComponent, {
      width: '400px'
    });
  }
}
