import { Component, OnInit } from '@angular/core';
import { IssuesService } from '../issues.service';
import { Issue } from '../issues';



@Component({
  selector: 'app-issue-list',
  templateUrl: './issue-list.component.html',
  styleUrls: ['./issue-list.component.css']
})
export class IssueListComponent implements OnInit {

  issues: Issue[] = [];
  showReportIssue = false;
  selectedIssue: Issue | null = null;
  pages: number[] = []
  currentPage = 1
  totalPages = 1
  constructor(private issueService: IssuesService) { }

  loadIssues(page?: number) {
    this.issueService.getPendingIssues(page).subscribe({
      next: (res) => {
        this.issues = res.issues
        this.currentPage = res.page
        this.totalPages = res.totalPages
        this.pages = Array.from({length: res.totalPages}, (_, i) => i+ 1)
      },
      error: (error) => {
        console.error(error)
      }
    })
  }

  ngOnInit() {
    this.loadIssues();
  }

  onCloseReport() {
    this.showReportIssue = false;
    this.loadIssues();
   }

  onConfirm(confirmed: boolean) {
    if (confirmed && this.selectedIssue) {
      this.issueService.completeIssue(this.selectedIssue);
      this.loadIssues();
    }
    this.selectedIssue = null;
  }
}
