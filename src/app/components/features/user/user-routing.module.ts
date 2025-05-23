import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LayoutComponent} from "../../shared/layout/layout.component";
import {UserSettingsComponent} from "./user-settings/user-settings.component";

const routes: Routes = [
    {
        path: '',
        component: LayoutComponent,
        children: [
            {path: 'userSettings', component: UserSettingsComponent}
        ]
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class UserRoutingModule {
}
