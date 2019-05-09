import { Component } from '@angular/core';
import { MatDialogRef, MatSnackBar } from '@angular/material';
import { FormControl } from '@angular/forms';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-admin-dialog',
  templateUrl: './admin-dialog.component.html',
  styleUrls: ['./admin-dialog.component.scss']
})
export class AdminDialogComponent {

  isWaiting = false;
  password = new FormControl('');

  constructor(
    private authService: AuthService,
    private dialogRef: MatDialogRef<AdminDialogComponent>,
    private snackBar: MatSnackBar
  ) {
  }

  login() {
    if (this.isWaiting) {
      return;
    }

    this.password.disable();
    this.isWaiting = true;
    this.dialogRef.disableClose = true;

    this.authService.login(this.password.value).subscribe(res => {
      if (res) {
        this.isWaiting = false;
        this.dialogRef.close();
        this.snackBar.open('You now have admin privileges', null, {
          duration: 2000
        });
      }
    });
  }
}
