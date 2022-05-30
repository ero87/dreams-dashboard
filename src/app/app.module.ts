import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {FormsModule} from '@angular/forms';
import {RouterModule, Routes} from '@angular/router';
import {SprintBuilderComponent} from './sprint/sprint-bulder/sprint-builder.component';
import {SprintListComponent} from './sprint/sprint-list/sprint-list.component';
import {HttpClientModule} from '@angular/common/http';
import {DashboardComponent} from './dashboard/dashboard.component';

const appRoutes: Routes = [
  { path: 'add-sprint', component: SprintBuilderComponent },
  { path: 'edit-sprint', component: SprintBuilderComponent },
  { path: 'sprints', component: SprintListComponent },
  { path: '', component: DashboardComponent },
];
@NgModule({
  declarations: [
    AppComponent,
    SprintBuilderComponent,
    SprintListComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    )
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
