import {Component, Input} from '@angular/core'

@Component({
    selector: 'app-load-spinner',
    styles: [`
    `],
    template: `
        <div class="modal-body" style="text-align: center">
            <fa-icon icon="spinner" pulse="true" size="2x mb-2 mt-2"></fa-icon>
            <br/>
            {{resolveMessage()}}
        </div>
    `
})
export class LoadSpinnerComponent {
    @Input()
    message: string

    resolveMessage(): string {
        return this.message ? this.message : 'Loading...'
    }
}
