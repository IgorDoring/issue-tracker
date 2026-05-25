import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { LoginFormComponent } from './login-form/login-form.component'
import { IssueListComponent } from './issue-list/issue-list.component'

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginFormComponent },
  { path: 'issue-tracker', component: IssueListComponent }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
