import {Component} from '@angular/core'
import {Session} from '../../services/session/session.model'
import {SessionService} from '../../services/session/session.service'

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
    constructor(
        private _session: SessionService
    ) {
        // No-op.
    }

    get session(): Session {
        return this._session.get()
    }

    get loggedIn(): boolean {
        return this._session.hasSession()
    }

    logout(): void {
        this._session.logout()
    }
}
