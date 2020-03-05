import {NgModule} from '@angular/core'
import {RouterModule, Routes} from '@angular/router'
import {RouterSessionGuard} from './services/router/router-session.guard'
import {LoginComponent} from './ui/login/login.component'
import {MainComponent} from './ui/main/main.component'

const routes: Routes = [
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'main',
        component: MainComponent,
        canActivate: [RouterSessionGuard]
    },
    {
        path: '',
        redirectTo: '/main',
        pathMatch: 'full'
    }
]

@NgModule({
    imports: [RouterModule.forRoot(routes, {useHash: true})],
    exports: [RouterModule]
})
export class AppRoutingModule {
    // No-op.
}
