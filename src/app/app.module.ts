import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppQuestionComponent } from './components/widgets/question/question.component';
import { SectionComponent } from './components/widgets/section/section.component';

@NgModule({
  declarations: [
    AppComponent,
    SectionComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AppQuestionComponent,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
