import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  form: any;

  constructor(public auth: AuthService, private fb: FormBuilder) {
    this.form = fb.group(
      {
        email: ['', Validators.required],
        password: ['', Validators.required],
      });
  }
}
