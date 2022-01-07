import { NgModule } from '@angular/core';
import { LoginComponent } from './login/login.component';
import { RouterModule, Routes } from '@angular/router';
import { SubscribeComponent } from './subscribe/subscribe.component';
import { PaymentRequestComponent } from 'src/app/payment-request/payment-request.component';
import { TxnDashboardComponent } from './txn-dashboard/txn-dashboard.component';
import { TxnHistoryComponent } from './txn-history/txn-history.component';
import { BalanceComponent } from './balance/balance.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'subscribe', component: SubscribeComponent },
  { path: 'payment_request', component: PaymentRequestComponent },
  { path: 'txn_dash', component: TxnDashboardComponent },
  { path: 'txn_history', component: TxnHistoryComponent },
  { path: 'balance', component: BalanceComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
