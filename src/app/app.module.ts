import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http'
import {NgModule} from '@angular/core'
import {FormsModule} from '@angular/forms'
import {BrowserModule} from '@angular/platform-browser'
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome'
import {library} from '@fortawesome/fontawesome-svg-core'
import {faCommentSlash, faSignOutAlt, faSpinner, faTrashAlt} from '@fortawesome/free-solid-svg-icons'
import {NgbModule} from '@ng-bootstrap/ng-bootstrap'
import {AppRoutingModule} from './app-routing.module'
import {AppComponent} from './app.component'
import {NlpService} from './services/nlp/nlp.service'
import {RestErrorInterceptor} from './services/rest/rest-error.interceptor'
import {RestUrlInterceptor} from './services/rest/rest-url.interceptor'
import {RestUrlService} from './services/rest/rest-url.service'
import {RouterSessionGuard} from './services/router/router-session.guard'
import {RouterService} from './services/router/router.service'
import {SessionService} from './services/session/session.service'
import {LoginComponent} from './ui/login/login.component'
import {ChatComponent} from './ui/main/chat/chat.component'
import {DetailsComponent} from './ui/main/details/details.component'
import {MainComponent} from './ui/main/main.component'
import {NavbarComponent} from './ui/navbar/navbar.component'
import {ErrorComponent} from './ui/utils/error.component'
import {LoadSpinnerComponent} from './ui/utils/load-spinner.component'

@NgModule({
    declarations: [
        NavbarComponent,
        AppComponent,
        LoginComponent,
        MainComponent,
        ErrorComponent,
        LoadSpinnerComponent,
        ChatComponent,
        DetailsComponent
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        NgbModule,
        FontAwesomeModule,
        AppRoutingModule,
        FormsModule
    ],
    providers: [
        RouterService,
        SessionService,
        RestUrlService,
        NlpService,
        RouterSessionGuard,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: RestUrlInterceptor,
            multi: true
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: RestErrorInterceptor,
            multi: true
        }
    ],
    bootstrap: [
        AppComponent
    ]
})
export class AppModule {
    constructor() {
        library.add(faSpinner)
        library.add(faSignOutAlt)
        library.add(faTrashAlt)
        library.add(faCommentSlash)
    }
}
