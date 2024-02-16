import { Component } from '@angular/core';
import { Firestore, collection, addDoc, collectionData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Router, RouterOutlet } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  userData!: Observable<any>;
  msg:string = ""

  constructor(private firestore: Firestore, private router:Router) {
  }

  async registerAdmin(form: NgForm) {
    if(form.invalid) {
      this.msg = "Invalid data";
      return;
    } else {
      this.msg = "";
    }

    console.log(form.value);

    const collectionInstance = collection(this.firestore, 'admin');
    await addDoc(collectionInstance, form.value);
    this.router.navigate(['/login']);
    console.log('Data added successfully');
  }

  


  navigateToLogin() {
    this.router.navigate(['/login']);
  }

}
