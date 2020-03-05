import {HttpClient} from '@angular/common/http'
import {Injectable} from '@angular/core'
import {Observable} from 'rxjs'
import {SessionService} from '../session/session.service'
import {NlpAllProbesResponse, NlpAskResponse, NlpCheckResponse} from './nlp.model'

@Injectable()
export class NlpService {
    constructor(
        private _http: HttpClient,
        private _sessions: SessionService
    ) {
        // No-op.
    }

    check(): Observable<NlpCheckResponse> {
        return this._http.post<NlpCheckResponse>('/check', {
            acsTok: this._sessions.get().token
        })
    }

    cancel(requestIds: string[]): Observable<any> {
        return this._http.post('/cancel', {
            acsTok: this._sessions.get().token,
            srvReqIds: requestIds
        })
    }

    ask(query: string, modelId: string): Observable<NlpAskResponse> {
        return this._http.post<NlpAskResponse>('/ask', {
            acsTok: this._sessions.get().token,
            txt: query,
            mdlId: modelId,
            enableLog: true
        })
    }

    clearConversation(modelId: string): Observable<any> {
        return this._http.post<NlpAskResponse>('/clear/conversation', {
            acsTok: this._sessions.get().token,
            mdlId: modelId
        })
    }

    allProbes(): Observable<NlpAllProbesResponse> {
        return this._http.post<NlpAllProbesResponse>('/probe/all', {
            acsTok: this._sessions.get().token
        })
    }

}
