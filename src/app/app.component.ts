import {Component, OnDestroy, OnInit} from '@angular/core'
import {Subscription} from 'rxjs'
import {RouterService} from './services/router/router.service'
import {SessionService} from './services/session/session.service'

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
    private _sessionSub: Subscription

    constructor(
        private _router: RouterService,
        private _session: SessionService
    ) {
        // No-op.
    }

    async ngOnInit() {
        try {
            await this._session.ping()
        } catch (e) {
            // Ignore.
        }

        this._sessionSub = this._session.sessionChanges.subscribe(ses => {
            if (ses) {
                this._router.goToMain()
            } else {
                this._router.goToLogin()
            }
        })
    }

    ngOnDestroy(): void {
        if (this._sessionSub) {
            this._sessionSub.unsubscribe()
        }
    }
}
