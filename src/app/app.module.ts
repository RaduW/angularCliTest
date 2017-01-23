import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {Routes, RouterModule} from '@angular/router';
import {
    TriStateCheckboxModule, CheckboxModule, FieldsetModule, PanelModule, MultiSelectModule,
    DropdownModule, ButtonModule, TreeModule
} from 'primeng/primeng';

import {AppComponent} from './app.component';
import {FirstFormComponent} from './first-form.component';
import {SecondFormComponent} from './second-form.component';


const appRoutes: Routes = [
    {path: "static", component: FirstFormComponent},
    {path: "dynamic", component: SecondFormComponent},
];

@NgModule({
    declarations: [
        AppComponent,
        FirstFormComponent,
        SecondFormComponent,
    ],
    imports: [
        RouterModule.forRoot(appRoutes),
        BrowserModule,
        FormsModule, ReactiveFormsModule,
        HttpModule,
        //PrimeNg modules
        TriStateCheckboxModule, CheckboxModule, FieldsetModule, PanelModule, MultiSelectModule, DropdownModule,
        ButtonModule, TreeModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
