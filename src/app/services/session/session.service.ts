import {HttpClient} from '@angular/common/http'
import {Injectable} from '@angular/core'
import {BehaviorSubject, Observable} from 'rxjs'
import {map, tap} from 'rxjs/operators'
import {LoginResponseDto, Session} from './session.model'

@Injectable()
export class SessionService {
    private static readonly STORE_TOKEN_KEY = 'tok'

    constructor(
        private _http: HttpClient
    ) {
        // No-op.
    }

    private _sessionChanges: BehaviorSubject<Session> = new BehaviorSubject(null)

    get sessionChanges(): Observable<Session> {
        return this._sessionChanges.asObservable()
    }

    get(): Session {
        return this._sessionChanges.getValue()
    }

    hasSession(): boolean {
        return !!this.get()
    }

    login(mail: string, pwd: string): Observable<Session> {
        return this._http.post<LoginResponseDto>('/signin', {
            email: mail,
            passwd: pwd
        }).pipe(
            map(dto => new Session(dto.acsTok)),
            tap(session => {
                this.initSession(session)
            })
        )
    }

    ping(): Promise<Session> {
        const tok = sessionStorage.getItem(SessionService.STORE_TOKEN_KEY)

        if (tok) {
            return this._http
                .post('/check', {
                    acsTok: tok,
                    maxRows: 1
                })
                .pipe(
                    map(() => new Session(tok)),
                    tap(session => {
                        if (!this.hasSession() || this.get().token !== tok) {
                            this.initSession(session)
                        }
                    })
                )
                .toPromise()
        } else {
            return Promise.resolve(null)
        }
    }

    logout(): Promise<any> {
        if (this.hasSession()) {
            try {
                // Use Promise here to force request execution before we clear all the local data.
                return this._http.post('/sigout', {
                    acsTok: this.get().token
                }).toPromise()
            } finally {
                this.clear()
            }
        }

        return Promise.resolve()
    }

    clear() {
        sessionStorage.removeItem(SessionService.STORE_TOKEN_KEY)

        this._sessionChanges.next(null)
    }

    private initSession(session: Session) {
        sessionStorage.setItem(SessionService.STORE_TOKEN_KEY, session.token)

        this._sessionChanges.next(session)
    }
}
