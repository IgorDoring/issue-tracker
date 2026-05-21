import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { Issue } from '../issues'
import { IssuesService } from '../issues.service'
import { debounceTime, distinctUntilChanged, filter, Subject, switchMap, takeUntil } from 'rxjs'

@Component({
    selector: 'app-issue-report',
    templateUrl: './issue-report.component.html',
    styleUrls: ['./issue-report.component.css']
})
export class IssueReportComponent implements OnInit, OnDestroy {
    @Output() formClose = new EventEmitter()
    suggestions: Issue[] = []
    private destroy$ = new Subject<void>()

    constructor(private issueService: IssuesService) {}

    ngOnInit(): void {
        this.issueForm.controls.title.valueChanges
            .pipe(
                debounceTime(300),
                distinctUntilChanged(),
                filter((title) => title.trim().length > 3),
                switchMap((title) => this.issueService.getSuggestions(title.trim())),
                takeUntil(this.destroy$)
            )
            .subscribe((suggestions) => (this.suggestions = suggestions))
    }

    ngOnDestroy(): void {
        this.destroy$.next()
        this.destroy$.complete()
    }

    issueForm = new FormGroup<IssueForm>({
        title: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
        description: new FormControl('', { nonNullable: true }),
        priority: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
        type: new FormControl('', { nonNullable: true, validators: [Validators.required] })
    })

    addIssue() {
        if (this.issueForm && this.issueForm.invalid) {
            this.issueForm.markAllAsTouched()
            return
        }
        this.issueService.createIssue(this.issueForm.getRawValue() as Issue).subscribe({
            next: () => {
                this.formClose.emit()
            },
            error: (err) => {
                console.log(err)
            }
        })
    }
}

interface IssueForm {
    title: FormControl<string>
    description: FormControl<string>
    priority: FormControl<string>
    type: FormControl<string>
}
