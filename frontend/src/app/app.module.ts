import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { LoginService } from './login.service';
import { ShopComponent } from './shop/shop.component';
import { ProductsComponent } from './products/products.component';
import { LogoutButtonComponent } from './logout-button/logout-button.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ShopComponent,
    ProductsComponent,
    LogoutButtonComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    LoginService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
