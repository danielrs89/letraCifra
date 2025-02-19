import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LongestWordService } from '../../services/longest-word.service';

@Component({
  selector: 'app-longest-word',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './longest-word.component.html',
  styleUrl: './longest-word.component.css'
})
export class LongestWordComponent {

  letters='';
  longestWord='';

  constructor(private longestWordService: LongestWordService){}

  findLongestWord(){
    this.longestWord = this.longestWordService.findLongestWord(this.letters);
  }
}
