import {Component, Input} from '@angular/core'

@Component({
    selector: 'app-error',
    styles: [`
    `],
    template: `
        <ngb-alert *ngIf="hasError" type="danger" [dismissible]="false">
            {{errorMessage}}
        </ngb-alert>
    `
})
export class ErrorComponent {
    @Input()
    error: any

    @Input()
    authError: string

    get hasError(): boolean {
        return !!this.error
    }

    get errorMessage(): string {
        return 'ERROR: ' + (this.error.message ? this.error.message : JSON.stringify(this.error))
    }
}
