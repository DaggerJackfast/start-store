import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app.routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { TopBarComponent } from './top-bar/top-bar.component';
import { ProductListComponent } from './product-list/product-list.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; 
import { ToastrModule } from 'ngx-toastr';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { AutosizeModule } from 'ngx-autosize';
import { environment } from '../environments/environment';
import { ProductAlertsComponent } from './product-alerts/product-alerts.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { CartComponent } from './cart/cart.component';
import { ShippingComponent } from './shipping/shipping.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { SupportChatComponent } from './support-chat/support-chat.component';
import { UserRegisterComponent } from './authorization/user-register/user-register.component';
import { UserLoginComponent } from './authorization/user-login/user-login.component';
import { AuthorizationModule } from './authorization/authorization.module';
import { CoreModule } from './core/core.module';


const socketConfig: SocketIoConfig = {
  url: environment.APIEndpoint,
  options: { }
};

@NgModule({
  imports: [
    BrowserModule,
    SocketIoModule.forRoot(socketConfig),
    HttpClientModule,
    ReactiveFormsModule,
    AppRoutingModule,
    CoreModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    AutosizeModule,
    NoopAnimationsModule,
    AuthorizationModule
  ],
  declarations: [
    AppComponent,
    TopBarComponent,
    ProductListComponent,
    ProductAlertsComponent,
    ProductDetailsComponent,
    CartComponent,
    ShippingComponent,
    SupportChatComponent,
    UserRegisterComponent,
    UserLoginComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
