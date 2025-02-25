import { Component, output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-word-finder',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './word-finder.component.html',
  styleUrls: ['./word-finder.component.css']
})
export class WordFinderComponent {
  letters: string = '';
  validWords: string[] = [];
  numVowels: number | null = null;
  generatedWords: string = '';
  isLoading: boolean = false;
  definition = output<string[]>();

  constructor(private http: HttpClient) { }
  
  getRandonWords(){
    this.letters=this.generatedWords;
    }
  findWords() {
    
    this.letters=this.letters.trim();

    if (this.letters.length !== 10) {
      alert('Introduce exactamente 10 letras.');
      return;
    }

    this.loadAndFindWords();
  }

  loadAndFindWords() {
    this.isLoading = true;

    this.http.get('./wordList.txt', { responseType: 'text' }).subscribe({
      next: (data) => {
        const dictionary = new Set(data.split('\n').map(word => word.trim()));
        const possibleWords = this.generateCombinations(this.letters.toLowerCase());
        this.validWords = possibleWords
          .filter(word => word.length >= 5 && dictionary.has(word))
          .sort((a, b) => b.length - a.length);

        this.isLoading = false;
        this.definition.emit(this.validWords);
      },
      error: (err) => {
        console.error("Error al cargar wordList.txt:", err);
        this.isLoading = false;
      }
    });
  }

  generateRandomWords() {
    if (this.numVowels === null || this.numVowels < 0 || this.numVowels > 10) {
      alert('Introduce un número válido de vocales (0-10).');
      return;
    }

    // const vowels = 'AEIOUÁÉÍÓÚ';
    const vowels = 'AEIOU';
    const consonants = 'BCDFGHJKLMNPQRSTVWXYZ';

      let word = '';
      let vowelCount = 0;
      while (vowelCount < this.numVowels) {
        word += vowels[Math.floor(Math.random() * vowels.length)];
        vowelCount++;
      }
      while (word.length < 10) {
        word += consonants[Math.floor(Math.random() * consonants.length)];
      }
      word = word.split('').sort(() => Math.random() - 0.5).join(''); // Shuffle letters
      this.generatedWords=word;
      this.getRandonWords();
  }

  generateCombinations(letters: string): string[] {
    const results = new Set<string>();
    const array = letters.split('');

    const permute = (arr: string[], current: string) => {
      if (current.length > 1) results.add(current); // Add words longer than 1
      for (let i = 0; i < arr.length; i++) {
        permute([...arr.slice(0, i), ...arr.slice(i + 1)], current + arr[i]);
      }
    };

    permute(array, '');
    return Array.from(results);
  }
}