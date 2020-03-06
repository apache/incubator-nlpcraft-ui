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
        });

        return next.handle(nextReq)
    }
}
