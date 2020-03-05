import {Injectable} from '@angular/core'
import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot} from '@angular/router'
import {SessionService} from '../session/session.service'

@Injectable()
export class RouterSessionGuard implements CanActivate {
    constructor(
        private _sessions: SessionService
    ) {
        // No-op.
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        return this._sessions.hasSession()
    }
}
