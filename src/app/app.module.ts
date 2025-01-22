import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppQuestionComponent } from 'src/components/widgets/app-question/app-question.component';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AppQuestionComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
