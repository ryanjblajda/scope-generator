import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-fullscreen-message',
  templateUrl: './fullscreen-message.component.html',
  styleUrls: ['./fullscreen-message.component.scss']
})
export class FullscreenMessageComponent implements OnChanges {
  @Input() header:string = 'header';
  @Input() message:string = 'message';

  ngOnChanges(changes: SimpleChanges): void {
    if (changes != null) {
      if (changes['header'].currentValue != this.header) { this.header == changes['header'].currentValue }
      else if (changes['message'].currentValue != this.message) { this.message == changes['message'].currentValue }
    }
  }
}
