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

import {OnInit} from '@angular/core'
import {Component, ViewChild} from '@angular/core'
import {NgForm} from '@angular/forms'
import {RestUrlService} from '../../services/rest/rest-url.service'
import {RouterService} from '../../services/router/router.service'
import {SessionService} from '../../services/session/session.service'

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    apiEndpoint: string;

    email: string;

    password: string;

    @ViewChild('loginForm')
    private _loginForm: NgForm;

    private _error: any;

    private _loading = false;

    constructor(
        private _restUrl: RestUrlService,
        private _routing: RouterService,
        private _sessions: SessionService
    ) {
        // No-op.
    }

    get error(): any {
        return this._error
    }

    get loading(): boolean {
        return this._loading
    }

    ngOnInit(): void {
        this.apiEndpoint = this._restUrl.apiEndpoint
    }

    public async login() {
        if (this._loginForm.valid) {
            try {
                this._loading = true;
                this._error = null;

                this._restUrl.apiEndpoint = this.apiEndpoint;

                await this._sessions.login(this.email, this.password).toPromise();

                this._routing.goToMain()
            } catch (e) {
                this._error = e
            } finally {
                this._loading = false
            }
        }
    }
}
