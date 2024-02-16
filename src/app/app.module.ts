import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { initializeApp,provideFirebaseApp } from "@angular/fire/app";
import { environment } from "../environments/environment";
import { provideFirestore,getFirestore } from "@angular/fire/firestore";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { LoginComponent } from "./login/login.component";
import { RegisterComponent } from "./register/register.component";
import { CrudComponent } from "./crud/crud.component";
import { AuthGuardService } from "./authguard.guard";

@NgModule({
    declarations: [
    ],
    imports: [
        // provideFirebaseApp(()=> initializeApp(environment.firebase)),
        // provideFirestore(()=> getFirestore()),
    ],
    providers: [AuthGuardService],
    bootstrap: []
})
export class AppModule {}
