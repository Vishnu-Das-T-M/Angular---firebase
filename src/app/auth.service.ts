import { Injectable } from '@angular/core';
import { Firestore, collection, query, where, getDocs } from '@angular/fire/firestore';
import { Observable, BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isLoggedInFlag: boolean = false;
  private loginErrorMessage: string = '';

  constructor(private firestore: Firestore, private router: Router) {}

  async login(email: string, password: string) {
    const q = query(
      collection(this.firestore, 'admin'),
      where('email', '==', email),
      where('password', '==', password)
    );

    const querySnapshot = await getDocs(q);

    if (querySnapshot.size > 0) {
      console.log('Admin logged in successfully');
      this.isLoggedInFlag = true;
      this.loginErrorMessage = ''; // Reset login error message
      this.router.navigate(['/crud']);
    } else {
      console.error('Invalid email or password');
      this.isLoggedInFlag = false;
      this.loginErrorMessage = 'Invalid email or password'; // Set login error message
    }
  }

  logout() {
    this.isLoggedInFlag = false;
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    return this.isLoggedInFlag;
  }

    getLoginErrorMessage(): string {
    return this.loginErrorMessage;
  }
}
