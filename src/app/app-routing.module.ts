import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminPanelComponent } from './components/admin-panel/admin-panel.component';
import { StartPageComponent } from './components/start-page/start-page.component';
import { SuiteCmpComponent } from './components/suite-cmp/suite-cmp.component';

const routes: Routes = [
  { path: 'adminLogin', component: AdminPanelComponent, pathMatch: 'full' },
  { path: 'suite/:id', component: SuiteCmpComponent },
  { path: '', component: StartPageComponent },
  { path: 'home', component: StartPageComponent },
  { path: 'index', component: StartPageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    enableTracing: true
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
