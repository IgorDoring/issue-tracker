import { Component, OnInit } from '@angular/core'
import { IssuesService } from '../issues.service'
import { Issue } from '../issues'
import { map } from 'rxjs'

@Component({
    selector: 'app-issue-list',
    templateUrl: './issue-list.component.html',
    styleUrls: ['./issue-list.component.css']
})
export class IssueListComponent implements OnInit {
    issues$ = this.issueService.issues$
    page$ = this.issueService.page$
    totalPages$ = this.issueService.totalPages$
    total$ = this.issueService.total$
    pages$ = this.issueService.totalPages$.pipe(
        map((tp) => Array.from({ length: tp }, (_, i) => i + 1))
    )
    showReportIssue = false
    selectedIssue: Issue | null = null

    constructor(private issueService: IssuesService) {}

    ngOnInit() {
        this.issueService.getPendingIssues()
    }

    loadPendingIssues(page: number) {
        this.issueService.getPendingIssues(page)
    }

    onCloseReport() {
        this.showReportIssue = false
    }

    onConfirm(confirmed: boolean) {
        if (confirmed && this.selectedIssue) {
            this.issueService.completeIssue(this.selectedIssue).subscribe({
                error: (err) => console.error(err)
            })
        }
        this.selectedIssue = null
    }
}
