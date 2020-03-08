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
