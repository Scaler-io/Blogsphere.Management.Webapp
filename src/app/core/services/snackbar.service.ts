import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

export type SnackbarType =
  | 'success'
  | 'error'
  | 'warning'
  | 'info'
  | 'primary'
  | 'blogsphere';

@Injectable({
  providedIn: 'root',
})
export class SnackbarService {
  constructor(private snackBar: MatSnackBar) {}

  /**
   * Show snackbar with custom panel class
   */
  show(
    message: string,
    action: string = 'Close',
    type: SnackbarType = 'primary',
    duration: number = 5000
  ): void {
    const config: MatSnackBarConfig = {
      duration: duration,
      panelClass: [`snackbar-container`, `snackbar-${type}`],
      horizontalPosition: 'end',
      verticalPosition: 'top',
    };

    if (action) {
      this.snackBar.open(message, action, config);
    } else {
      this.snackBar.open(message, undefined, config);
    }
  }

  /**
   * Show success snackbar
   */
  showSuccess(
    message: string,
    action: string = 'Close',
    duration: number = 4000
  ): void {
    this.show(message, action, 'success', duration);
  }

  /**
   * Show error snackbar
   */
  showError(
    message: string,
    action: string = 'Retry',
    duration: number = 6000
  ): void {
    this.show(message, action, 'error', duration);
  }

  /**
   * Show warning snackbar
   */
  showWarning(
    message: string,
    action: string = 'Dismiss',
    duration: number = 5000
  ): void {
    this.show(message, action, 'warning', duration);
  }

  /**
   * Show info snackbar
   */
  showInfo(
    message: string,
    action: string = 'Got it',
    duration: number = 4000
  ): void {
    this.show(message, action, 'info', duration);
  }

  /**
   * Show primary snackbar (default Blogsphere style)
   */
  showPrimary(
    message: string,
    action: string = 'Close',
    duration: number = 4000
  ): void {
    this.show(message, action, 'primary', duration);
  }

  /**
   * Show custom Blogsphere themed snackbar
   */
  showBlogsphere(
    message: string,
    action: string = 'Awesome',
    duration: number = 5000
  ): void {
    this.show(message, action, 'blogsphere', duration);
  }

  /**
   * Show snackbar for API operations
   */
  showApiSuccess(operation: string): void {
    this.showSuccess(`${operation} completed successfully!`, 'Close', 3000);
  }

  /**
   * Show snackbar for API errors
   */
  showApiError(operation: string, error?: string): void {
    const message = error
      ? `${operation} failed: ${error}`
      : `${operation} failed. Please try again.`;
    this.showError(message, 'Retry', 6000);
  }

  /**
   * Show copy to clipboard success
   */
  showCopySuccess(item: string = 'Text'): void {
    this.showSuccess(`${item} copied to clipboard!`, '', 2000);
  }

  /**
   * Dismiss all snackbars
   */
  dismiss(): void {
    this.snackBar.dismiss();
  }
}
