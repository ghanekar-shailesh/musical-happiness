import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { NavigationBarComponent } from './navigation-bar/navigation-bar.component';
import { LoginComponent } from './login/login.component';
import { SubscribeComponent } from './subscribe/subscribe.component';
import { PaymentRequestComponent } from './payment-request/payment-request.component';
import { TxnDashboardComponent } from './txn-dashboard/txn-dashboard.component';
import { TxnHistoryComponent } from './txn-history/txn-history.component';
import { BalanceComponent } from './balance/balance.component';

@NgModule({
  declarations: [
    AppComponent,
    NavigationBarComponent,
    LoginComponent,
    SubscribeComponent,
    PaymentRequestComponent,
    TxnDashboardComponent,
    TxnHistoryComponent,
    BalanceComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
