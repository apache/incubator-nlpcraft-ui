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

import {Component, Input, OnDestroy, OnInit} from '@angular/core'
import {NlpModel, NlpProbe, NlpQueryState} from '../../../services/nlp/nlp.model'
import {NlpService} from '../../../services/nlp/nlp.service'

@Component({
    selector: 'app-chat',
    templateUrl: './chat.component.html',
    styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit, OnDestroy {
    queryText: string

    selectedModelId: string

    selectedQuery: NlpQueryState

    @Input()
    allProbes: NlpProbe[]

    private _states: NlpQueryState[]

    private _error: any

    private _timer: number

    constructor(
        private _nlp: NlpService
    ) {
        // No-op.
    }

    get states(): NlpQueryState[] {
        return this._states
    }

    get error(): any {
        return this._error
    }

    get hasModel(): boolean {
        return !!this.selectedModelId
    }

    async ngOnInit() {
        this.trySelectDefaultModel()

        await this.checkStatus()

        this._timer = setInterval(async () => {
            if (this._states && this._states.find(s => s.status === 'QRY_ENLISTED')) {
                await this.checkStatus()
            }
        }, 1000)
    }

    ngOnDestroy(): void {
        clearInterval(this._timer)
    }

    allModels(): NlpModel[] {
        const allModels: NlpModel[] = []

        this.allProbes.forEach(p => {
            p.models.forEach(m => {
                allModels.push(m)
            })
        })

        return allModels
    }

    async checkStatus() {
        try {
            this._states = (await this._nlp.check().toPromise()).states

            if (this.selectedQuery) {
                this.selectQuery(this.selectedQuery.srvReqId)
            }
        } catch (e) {
            this._error = e
        }
    }

    async ask() {
        const query = this.queryText.trim()

        if (this.selectedModelId && query.length > 0) {
            this.queryText = ''

            try {
                this._error = null
                this.selectedQuery = null

                const reqId = (await this._nlp.ask(query, this.selectedModelId).toPromise()).srvReqId

                await this.checkStatus()

                this.selectQuery(reqId)
            } catch (e) {
                this._error = e
            }
        }
    }

    async clear() {
        if (this._states) {
            try {
                this._error = null

                await this._nlp.cancel(this._states.map(it => it.srvReqId)).toPromise()
            } catch (e) {
                this._error = e
            }

            await this.checkStatus()
        }
    }

    async clearConversation() {
        if (this.selectedModelId) {
            try {
                this._error = null

                await this._nlp.clearConversation(this.selectedModelId).toPromise()
            } catch (e) {
                this._error = e
            }
        }
    }

    private selectQuery(id: string) {
        if (this._states) {
            this.selectedQuery = this._states.find(it => it.srvReqId === id)
        }
    }

    private trySelectDefaultModel() {
        if (!this.hasModel && this.allModels() && this.allModels().length > 0) {
            this.selectedModelId = this.allModels()[0].id
        }
    }
}
