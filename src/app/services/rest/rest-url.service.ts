import {Injectable} from '@angular/core'

@Injectable()
export class RestUrlService {
    private static readonly API_ENDPOINT_KEY = 'api_endpoint'

    private _apiEndpoint: string

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

        this._apiEndpoint = value

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
