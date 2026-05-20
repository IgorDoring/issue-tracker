import { Injectable } from '@angular/core';
import { Issue } from './issues';
import { issues } from '../assets/mock-issues';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IssuesService {

  private issues: Issue[] = issues;
  private apiUrl = 'http://localhost:5000/issues'
  constructor(private http: HttpClient) { }

  getPendingIssues(page?: number): Observable<{issues: Issue[], page: number, pageSize: number, total: number, totalPages: number}> {
    return this.http.get<{issues: Issue[], page: number, pageSize: number, total: number, totalPages: number}>(`${this.apiUrl}?page=${page ?? 1}`)
  }

  createIssue(issue: Issue) {
    issue.issueNo = this.issues.length + 1;
    this.issues.push(issue);
  }

  completeIssue(issue: Issue) {
    const selectedIssue: Issue = {
    ...issue,
    completed: new Date()
    };
    const index = this.issues.findIndex(i => i === issue);
    this.issues[index] = selectedIssue;
   }

   getSuggestions(title: string): Issue[] {
    if (title.length > 3) {
    return this.issues.filter(issue =>
    issue.title.indexOf(title) !== -1);
    }
    return [];
   }
  
}
