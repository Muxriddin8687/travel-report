import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environments';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  http = inject(HttpClient);
  api = environment.api + 'auth/register';
  router = inject(Router);

  showError: boolean = false;

  send(form: NgForm) {
    if(form.value.password != form.value.password2) {
      this.showError = true;
      setTimeout(() => this.showError = false, 5000);
    } else {
      this.http.post(this.api, form.value).subscribe((res) => {
        this.router.navigateByUrl("/login");
      });
    }
  }
}
