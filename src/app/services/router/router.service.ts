import {Injectable} from '@angular/core'
import {Router} from '@angular/router'

@Injectable()
export class RouterService {
    constructor(
        private _router: Router
    ) {
        // No-op.
    }

    goToLogin(): void {
        this._router.navigate(['login'])
    }

    goToMain(): void {
        this._router.navigate(['main'])
    }
}
