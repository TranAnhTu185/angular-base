import { Component, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../auth/auth.service';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthServiceProxyLogin} from "./auth.service";

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private authSP: AuthServiceProxyLogin,
    private route: ActivatedRoute
  ) {
    this.form = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  user: any = null;

  async ngOnInit() {
    await this.authSP.handleAuthCallback();
    const userId = this.route.snapshot.params['access_token'];
    console.log(userId);
    this.user = this.authSP.getGoogleUser() || (await this.authSP.getFacebookUser());
    console.log(this.user);
  }

  loading = signal(false);
  error = signal<string | null>(null);
  passwordVisible = false;
  password?: string;


  signInWithGoogle() {
    this.authSP.loginWithGoogle();
  }

  signInWithFacebook() {
    this.authSP.loginFacebook();
  }

  onSubmit() {
    if (this.form.invalid || this.loading()) return;
    this.error.set(null);
    this.loading.set(true);

    this.auth.login(this.form.value as any).subscribe({
      next: (res) => {
        debugger;
        this.loading.set(false);
        this.router.navigate(['/home']);
      },
      error: (err) => {
        this.loading.set(false);
        this.error.set(err?.error?.message || 'Đăng nhập thất bại, vui lòng thử lại.');
      }
    });
  }
}
