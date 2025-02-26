import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { WordFinderComponent } from './components/word-finder/word-finder.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, WordFinderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Letra y Cifra';

  validWords: string[] = [];

  setValidWords(e: any) {
    this.validWords = e;
  }
}