import { Injectable } from '@angular/core'
import { Issue } from './issues'
import { HttpClient } from '@angular/common/http'
import { BehaviorSubject, map, Observable, tap } from 'rxjs'

@Injectable({
    providedIn: 'root'
})
export class IssuesService {
    private apiUrl = 'https://issue-tracker-backend-production-563d.up.railway.app'

    private issuesSubject = new BehaviorSubject<Issue[]>([])
    private pageSubject = new BehaviorSubject<number>(1)
    private totalPagesSubject = new BehaviorSubject<number>(1)
    private totalSubject = new BehaviorSubject<number>(0)

    issues$ = this.issuesSubject.asObservable()
    page$ = this.pageSubject.asObservable()
    totalPages$ = this.totalPagesSubject.asObservable()
    total$ = this.totalSubject.asObservable()

    constructor(private http: HttpClient) {}

    getPendingIssues(page?: number) {
        this.http
            .get<{
                issues: Issue[]
                page: number
                pageSize: number
                total: number
                totalPages: number
            }>(`${this.apiUrl}/issues?page=${page ?? 1}`)
            .subscribe({
                next: (res) => {
                    this.issuesSubject.next(res.issues)
                    this.pageSubject.next(res.page)
                    this.totalPagesSubject.next(res.totalPages)
                    this.totalSubject.next(res.total)
                },
                error: (error) => {
                    console.error(error)
                }
            })
    }

    createIssue(issue: Omit<Issue, 'issueNo'>): Observable<Issue> {
        return this.http
            .post<Issue>(this.apiUrl, issue)
            .pipe(tap(() => this.getPendingIssues(this.pageSubject.value)))
    }

    completeIssue(issue: Issue): Observable<Issue> {
        return this.http
            .put<Issue>(`${this.apiUrl}/${issue.issueNo}`, { completed: new Date() })
            .pipe(tap(() => this.getPendingIssues()))
    }

    getSuggestions(title: string): Observable<Issue[]> {
        return this.http
            .get<{ issues: Issue[] }>(`${this.apiUrl}/issues?search=${encodeURIComponent(title)}`)
            .pipe(map((res) => res.issues))
    }
}
