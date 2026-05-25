import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Router } from '@angular/router'
import { tap } from 'rxjs'
import { environment } from 'src/environments/environment'

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private apiUrl = environment.apiUrl

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  login(user: { username: string; password: string }) {
    return this.http
      .post<{ token: string }>(this.apiUrl + '/login', { ...user })
      .pipe(tap((res) => localStorage.setItem('token', res.token)))
  }

  getToken(): string | null {
    return localStorage.getItem('token')
  }

  logout() {
    localStorage.removeItem('token')
    this.router.navigate(['/login'])
  }

  isLoggedIn(): boolean {
    return !!this.getToken()
  }
}
