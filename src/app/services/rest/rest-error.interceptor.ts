import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http'
import {Injectable} from '@angular/core'
import {Observable, throwError} from 'rxjs'
import {catchError} from 'rxjs/operators'
import {SessionService} from '../session/session.service'

@Injectable()
export class RestErrorInterceptor implements HttpInterceptor {
    constructor(
        private _sessions: SessionService
    ) {
        // No-op.
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req)
            .pipe(
                catchError(err => {
                    this.check(err)

                    return throwError(err)
                })
            )
    }

    private check(err: any): void {
        if (err.status === 401) {
            // Clear session whenever we intercept 401 (means that session got expired).
            this._sessions.clear()
        }
    }
}
