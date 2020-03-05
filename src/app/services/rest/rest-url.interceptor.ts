import {HttpEvent} from '@angular/common/http'
import {HttpRequest} from '@angular/common/http'
import {HttpHandler} from '@angular/common/http'
import {HttpInterceptor} from '@angular/common/http'
import {Injectable} from '@angular/core'
import {Observable} from 'rxjs'
import {RestUrlService} from './rest-url.service'

@Injectable()
export class RestUrlInterceptor implements HttpInterceptor {
    constructor(
        private _rest: RestUrlService
    ) {
        // No-op.
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const nextReq = req.clone({
            url: this._rest.url(req.url)
        })

        return next.handle(nextReq)
    }
}
