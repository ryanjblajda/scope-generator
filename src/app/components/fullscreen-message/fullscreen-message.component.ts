import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-fullscreen-message',
  templateUrl: './fullscreen-message.component.html',
  styleUrls: ['./fullscreen-message.component.scss']
})
export class FullscreenMessageComponent {
  @Input() header:string = 'header';
  @Input() message:string = 'message';
}
