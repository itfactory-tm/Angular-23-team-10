import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-getstarted',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './getstarted.component.html',
  styleUrls: ['./getstarted.component.css']
})
export class GetstartedComponent {
  selectedChoice: string = 'choose1';

  selectChoose(choice: string) {
    this.selectedChoice = choice
  }
}