import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { LoginService } from './login.service';
import { ShopComponent } from './shop/shop.component';
import { AdminComponent } from './admin/admin.component';
import { LogoutButtonComponent } from './logout-button/logout-button.component';
import { OrderConfirmationModalComponent } from './order-confirmation-modal/order-confirmation-modal.component';
import { ProductCardComponent } from './product-card/product-card.component';
import { ShoppingCartItemCardComponent } from './shopping-cart-item-card/shopping-cart-item-card.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ShopComponent,
    AdminComponent,
    LogoutButtonComponent,
    OrderConfirmationModalComponent,
    ProductCardComponent,
    ShoppingCartItemCardComponent
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
