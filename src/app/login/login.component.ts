import { Component } from '@angular/core';
import { Firestore, collection, collectionData, query, where, getDocs } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Router, RouterOutlet } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  userData!: Observable<any>;
  msg:string = "";

  constructor(private firestore: Firestore, private router:Router, private authService: AuthService) {
    
  }

  ngOnInit() {
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/crud']);
    }
  }

  loginAdmin(form: NgForm) {
    if(form.invalid) {
      this.msg = "Invalid data";
      return;
    } else {
      this.msg = "";
    }

    const { email, password } = form.value;
    this.authService.login(email, password);
    this.msg = this.authService.getLoginErrorMessage();
  }

  navigateToRegister() {
    this.router.navigate(['/register']);
  }
}

