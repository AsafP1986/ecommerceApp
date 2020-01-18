import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { NgbModule, NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CreditCardDirectivesModule } from "angular-cc-library";
import { MatSliderModule } from "@angular/material/slider";
import {
  MatStepperModule,
  MatFormFieldModule,
  MatButtonModule,
  MatIconModule,
  MatInputModule,
  MatSelectModule,
  MatToolbarModule,
  MatSidenavModule
} from "@angular/material";
import { HttpClientModule } from "@angular/common/http";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { LoginComponent } from "./components/login/login.component";
import { LoginFormComponent } from "./components/login/layouts/login-form/login-form.component";
import { AboutUsComponent } from "./components/login/layouts/about-us/about-us.component";
import { StatusComponent } from "./components/login/layouts/status/status.component";
import { CarouselComponent } from "./components/login/layouts/about-us/carousel/carousel.component";
import { NgbdModal } from "./components/modals/modal.component";
import { StepperComponent } from "./components/stepper/stepper.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { ShopapiService } from "./services/shopapi.service";
import { UsersapiService } from "./services/usersapi.service";
import { NavbarComponent } from "./components/shop/navbar/navbar.component";
import { CartComponent } from "./components/shop/cart/cart.component";
import { AdminComponent } from "./components/shop/admin/admin.component";
import { ProductsviewComponent } from "./components/shop/productsview/productsview.component";
import { ShopComponent } from "./components/shop/shop/shop.component";
import { CartitemComponent } from "./components/shop/cartitem/cartitem.component";
import { AddproductmodalComponent } from "./components/modals/addproductmodal/addproductmodal/addproductmodal.component";
import { AddtocartmodalComponent } from "./components/modals/addtocartmodal/addtocartmodal/addtocartmodal.component";
import { AlertmodalComponent } from "./components/modals/alertmodal/alertmodal.component";
import { OrderComponent } from "./components/shop/order/order.component";
import { OrdernavbarComponent } from "./components/shop/ordernavbar/ordernavbar.component";
import { ReceiptComponent } from "./components/shop/order/receipt/receipt.component";
import { OrderformComponent } from "./components/shop/order/orderform/orderform.component";
import { OrderitemComponent } from "./components/shop/order/receipt/orderitem/orderitem.component";
import { FinishordermodalComponent } from "./components/modals/finishordermodal/finishordermodal.component";
import { CreditcarddirectiveDirective } from "./components/shop/order/creditcarddirective.directive";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LoginFormComponent,
    AboutUsComponent,
    StatusComponent,
    CarouselComponent,
    NgbdModal,
    StepperComponent,
    NavbarComponent,
    CartComponent,
    AdminComponent,
    ProductsviewComponent,
    ShopComponent,
    CartitemComponent,
    AddproductmodalComponent,
    AddtocartmodalComponent,
    AlertmodalComponent,
    OrderComponent,
    OrdernavbarComponent,
    ReceiptComponent,
    OrderformComponent,
    OrderitemComponent,
    FinishordermodalComponent,
    CreditcarddirectiveDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSliderModule,
    MatStepperModule,
    MatSelectModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    MatSidenavModule,
    HttpClientModule,
    CreditCardDirectivesModule
  ],
  providers: [NgbModule, ShopapiService, UsersapiService],
  entryComponents: [
    NgbdModal,
    AddproductmodalComponent,
    AddtocartmodalComponent,
    AlertmodalComponent,
    FinishordermodalComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
