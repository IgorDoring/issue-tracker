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

  constructor(private issueService: IssuesService) { }

  private getIssues() {
    this.issues = this.issueService.getPendingIssues();
  }

  ngOnInit() {
    this.getIssues();
  }
}
