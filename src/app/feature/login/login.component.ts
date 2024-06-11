import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, PasswordModule, InputTextModule, ButtonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  
  

  private fb = inject(FormBuilder);
  private router = inject(Router);
  private messageService = inject(MessageService);

  form!: FormGroup;
  isLoading: boolean = false;

  ngOnInit(): void {
    this.form = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  onLogin(event: any) {
    if (this.form.valid) {
      const username = this.getUsernameField()?.getRawValue();
      const password = this.getPasswordField()?.getRawValue();
      if (username === 'admin' && password === 'password') {
        this.messageService.add({
          severity: 'success',
          summary: 'Confirmed',
          detail: 'Success Login',
        });
        this.router.navigate(['home/employee'])
      } else {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Invalid credentials. Please try again.',
        });
      }
    }
  }

  getUsernameField() {
    return this.form.get('username');
  }

  getPasswordField() {
    return this.form.get('password');
  }
}
