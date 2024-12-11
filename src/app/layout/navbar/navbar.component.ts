import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  isSearchFocused: boolean = false;
  @Output() dataEmitter = new EventEmitter<string>();

  onKeyUp(event: KeyboardEvent) {
    const inputValue = (event.target as HTMLInputElement).value;
    this.dataEmitter.emit(inputValue); // Emit the input value to the parent
  }
}
