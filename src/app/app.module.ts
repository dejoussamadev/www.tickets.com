import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration, withEventReplay } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TicketListComponent } from './features/tickets/comonents/ticket-list/ticket-list.component';
import { CreateTicketComponent } from './features/tickets/comonents/create-ticket/create-ticket.component';
import { EditTicketComponent } from './features/tickets/comonents/edit-ticket/edit-ticket.component';
import {ReactiveFormsModule} from '@angular/forms';
import {AuthModule} from './features/auth/auth.module';

@NgModule({
  declarations: [
    AppComponent,
    TicketListComponent,
    CreateTicketComponent,
    EditTicketComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthModule,
  ],
  providers: [
    provideClientHydration(withEventReplay())
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
