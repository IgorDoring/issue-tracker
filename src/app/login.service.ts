import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { tap } from 'rxjs'
import { environment } from 'src/environments/environment'

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private apiUrl = environment.apiUrl

  constructor(private http: HttpClient) {}

  login(user: { username: string; password: string }) {
    return this.http.post<{ token: string }>(this.apiUrl + '/login', { ...user })
  }
}
