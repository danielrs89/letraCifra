import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LongestWordComponent } from './components/longest-word/longest-word.component';
import { WordFinderComponent } from './components/word-finder/word-finder.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, LongestWordComponent, WordFinderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'letraCifra';
}
