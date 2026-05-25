import { Component, OnInit } from '@angular/core'
import { NgForm } from '@angular/forms'
import { LoginService } from '../login.service'
import { Router } from '@angular/router'

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {
  username = ''
  password = ''
  hasError = false

  constructor(
    private loginService: LoginService,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (this.loginService.isLoggedIn()) this.router.navigate(['/issues'])
  }

  onSubmit(form: NgForm) {
    const username = form.value['username']
    const password = form.value['password']
    console.log({ username, password })
    this.loginService.login({ username, password }).subscribe({
      next: () => {
        this.router.navigate(['/issues'])
      },
      error: () => {
        this.hasError = true
      }
    })
  }
}
