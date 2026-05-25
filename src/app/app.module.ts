import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'

import { AppComponent } from './app.component'
import { ClarityModule } from '@clr/angular'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { IssueListComponent } from './issue-list/issue-list.component'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { IssueReportComponent } from './issue-report/issue-report.component'
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component'
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http'
import { LoginFormComponent } from './login-form/login-form.component'
import { AppRoutingModule } from './app-routing.module'
import { AuthInterceptor } from 'src/auth.interceptor'

@NgModule({
  declarations: [
    AppComponent,
    IssueListComponent,
    IssueReportComponent,
    ConfirmDialogComponent,
    LoginFormComponent
  ],
  imports: [
    BrowserModule,
    ClarityModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule {}
