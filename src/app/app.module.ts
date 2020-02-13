import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { RouterModule } from "@angular/router";
import { ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { AppComponent } from "./app.component";
import { TopBarComponent } from "./top-bar/top-bar.component";
import { ProductListComponent } from "./product-list/product-list.component";
import { NotifierModule, NotifierOptions } from "angular-notifier";
import { SocketIoModule, SocketIoConfig } from "ngx-socket-io";
import { AutosizeModule } from "ngx-autosize";
import { environment } from "../environments/environment";
import { ProductAlertsComponent } from "./product-alerts/product-alerts.component";
import { ProductDetailsComponent } from "./product-details/product-details.component";
import { CartComponent } from "./cart/cart.component";
import { ShippingComponent } from "./shipping/shipping.component";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import { SupportChatComponent } from "./support-chat/support-chat.component";
import { UserRegisterComponent } from "./user-register/user-register.component";

const notifierOptions: NotifierOptions = {
  position: {
    horizontal: {
      position: "left",
      distance: 12
    },
    vertical: {
      position: "bottom",
      distance: 12,
      gap: 10
    }
  },
  theme: "material",
  behaviour: {
    autoHide: 5000,
    onClick: "hide",
    onMouseover: "pauseAutoHide",
    showDismissButton: true,
    stacking: 4
  },
  animations: {
    enabled: true,
    show: {
      preset: "slide",
      speed: 300,
      easing: "ease"
    },
    hide: {
      preset: "fade",
      speed: 300,
      easing: "ease",
      offset: 50
    },
    shift: {
      speed: 300,
      easing: "ease"
    },
    overlap: 150
  }
};

const socketConfig: SocketIoConfig = {
  url: environment.APIEndpoint,
  options: {}
};

@NgModule({
  imports: [
    BrowserModule,
    SocketIoModule.forRoot(socketConfig),
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      { path: "", component: ProductListComponent },
      { path: "products/:productId", component: ProductDetailsComponent },
      { path: "cart", component: CartComponent },
      { path: "shipping", component: ShippingComponent },
      { path: "support", component: SupportChatComponent },
      { path: "sign-up", component: UserRegisterComponent }
    ]),
    NotifierModule.withConfig(notifierOptions),
    AutosizeModule,
    NoopAnimationsModule
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
    UserRegisterComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
