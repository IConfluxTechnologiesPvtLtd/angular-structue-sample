import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [{
  path:'',
  loadChildren:()=> import ('./modules/dashboard/dashboard.module').then(m => m.DashboardModule)
},{
  path:'user',
  loadChildren:()=> import ('./modules/user/user.module').then(m => m.UserModule)
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
