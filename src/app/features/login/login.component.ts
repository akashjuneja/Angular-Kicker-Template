import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { LoginPayload, User, UserRole } from '../../types/auth';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  private auth = inject(AuthService);
  loginForm = new FormGroup({
    username: new FormControl(),
    password: new FormControl(),
  });

  onSubmit() {
    const obj: LoginPayload = {
      username: this.loginForm.controls.username.value,
      password: this.loginForm.controls.password.value,
      expiresInMins: 1,
    };
    this.auth.getLogin(obj).subscribe({
      next: (data: User) => {
        const payload: UserRole = {
          ...data,
          role: 'user',
        };
        this.auth.login(payload);
      },
      error: (e) => {
        console.log(e.statusText);
      },
    });
  }
}
