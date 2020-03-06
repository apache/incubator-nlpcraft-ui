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

import {Injectable} from '@angular/core'

@Injectable()
export class RestUrlService {
    private static readonly API_ENDPOINT_KEY = 'api_endpoint';

    private _apiEndpoint: string;

    constructor() {
        this._apiEndpoint = localStorage.getItem(RestUrlService.API_ENDPOINT_KEY)
    }

    get apiEndpoint(): string {
        return this._apiEndpoint
    }

    set apiEndpoint(value: string) {
        if (value && value.endsWith('/')) {
            value = value.substring(0, value.length - 1)
        }

        this._apiEndpoint = value;

        if (value) {
            localStorage.setItem(RestUrlService.API_ENDPOINT_KEY, value)
        } else {
            localStorage.removeItem(RestUrlService.API_ENDPOINT_KEY)
        }
    }

    url(path: string): string {
        return this._apiEndpoint + '/api/v1' + path
    }
}
