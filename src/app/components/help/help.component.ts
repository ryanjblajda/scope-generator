import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-help',
  templateUrl: './help.component.html',
  styleUrls: ['./help.component.scss']
})
export class HelpComponent {
  header = 'Help';
  @Output() onclose = new EventEmitter();

  close() {
    this.onclose.emit();
  }
}
