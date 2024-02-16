import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';
import { Firestore, collection, addDoc, collectionData, doc, updateDoc, deleteDoc, query, orderBy } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-crud',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './crud.component.html',
  styleUrl: './crud.component.css'
})

export class CrudComponent {
  userData?: Observable<any>;
  msg: string = "";
  formMode: 'Create' | 'Edit' = 'Create';
  editingData: any = { name: '', email: '', password: '' };

  constructor(private firestore: Firestore, private authService: AuthService) {
    this.getData();
  }

  getData() {
    const collectionInstance = collection(this.firestore, 'users');
    collectionData(collectionInstance, { idField: 'id' })
    .subscribe((val) => {
      console.log(val);
    })
    const orderedQuery = query(collectionInstance, orderBy('timestamp', 'asc'));
    this.userData = collectionData(orderedQuery, { idField: 'id' });
  }

  editData(data: any) {
    this.formMode = 'Edit';
    this.editingData = { ...data, originalTimestamp: data.timestamp };
  }

  cancelEdit(form: NgForm) {
    this.resetForm(form);
    this.msg = "";
  }

  resetForm(form: NgForm) {
    form.resetForm();
    this.formMode = 'Create';
    this.editingData = { name: '', email: '', password: '' }; // Reset to default values
  }

  deleteData(id: string) {
    const docInstance = doc(this.firestore, 'users', id);
    deleteDoc(docInstance).then(() => {
      console.log('Data deleted');
    });
  }

  addOrUpdateData(form: NgForm) {
    const formData = form.value;
    formData.timestamp = new Date();
    if (form.invalid) {
      this.msg ="Invalid data";
      return;
    } else {
      this.msg = "";
    }

    if (this.formMode === 'Create') {
      const collectionInstance = collection(this.firestore, 'users');
      addDoc(collectionInstance, formData).then(() => {
        console.log('Data added successfully');
        this.resetForm(form);
      }).catch((err) => {
        console.log(err);
      });
    } else if (this.formMode === 'Edit') {
      const docInstance = doc(this.firestore, 'users', this.editingData.id);
      formData.timestamp = this.editingData.originalTimestamp;
      updateDoc(docInstance, formData).then(() => {
        console.log('Data updated successfully');
        this.resetForm(form);
      }).catch((err) => {
        console.log(err);
      });
    }
  }

  logout() {
    this.authService.logout();
  }
}