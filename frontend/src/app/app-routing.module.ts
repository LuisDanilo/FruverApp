import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ShopComponent } from './shop/shop.component';
import { ProductsComponent } from './products/products.component';
import { AuthGuard } from 'src/utils/authUser';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'shop', component: ShopComponent, canActivate: [AuthGuard] },
  { path: 'products', component: ProductsComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: '/', pathMatch: 'full' }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
