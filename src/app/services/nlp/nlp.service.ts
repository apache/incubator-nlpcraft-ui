/*
 * Licensed to the Apache Software Foundation (ASF) under one or more
 * contributor license agreements.  See the NOTICE file distributed with
 * this work for additional information regarding copyright ownership.
 * The ASF licenses this file to You under the Apache License, Version 2.0
 * (the "License"); you may not use this file except in compliance with
 * the License.  You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

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
