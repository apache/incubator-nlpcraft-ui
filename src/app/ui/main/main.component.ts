import {Component, OnDestroy, OnInit} from '@angular/core'
import {NlpProbe} from '../../services/nlp/nlp.model'
import {NlpService} from '../../services/nlp/nlp.service'

@Component({
    selector: 'app-main',
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit, OnDestroy {
    private _error: any

    private _loading = false

    private _allProbes: NlpProbe[]

    private _timer: number

    constructor(
        private _nlp: NlpService
    ) {
        // No-op.
    }

    get error(): any {
        return this._error
    }

    get loading(): boolean {
        return this._loading
    }

    get hasProbes(): boolean {
        return this._allProbes && this._allProbes.length > 0
    }

    get allProbes(): NlpProbe[] {
        return this._allProbes
    }

    async ngOnInit() {
        this._timer = setInterval(async () => {
            await this.loadProbes()
        }, 1000)

        try {
            this._loading = true

            await this.loadProbes()
        } finally {
            this._loading = false
        }
    }

    ngOnDestroy(): void {
        clearInterval(this._timer)
    }

    private async loadProbes() {
        try {
            this._allProbes = (await this._nlp.allProbes().toPromise()).probes

            if (!this.hasProbes) {
                this._error = 'No NLPCraft Probe to talk to :('
            } else {
                this._error = null
            }
        } catch (e) {
            this._allProbes = null

            this._error = e
        }
    }
}
