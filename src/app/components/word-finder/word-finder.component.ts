import { Component } from '@angular/core';
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

  constructor(private http: HttpClient) {}

  findWords() {
    if (this.letters.length !== 10) {
      alert('Introduce exactamente 10 letras.');
      return;
    }

    // Cargar el JSON correctamente desde assets
    this.http.get<{ words: string[] }>('/wordList.json').subscribe({
      next: (data) => {
        console.log("Archivo JSON cargado:", data); // Verifica que se cargó bien
        const dictionary = new Set(data.words);
        const possibleWords = this.generateCombinations(this.letters);
        this.validWords = possibleWords.filter(word => word.length > 5 && dictionary.has(word));
      },
      error: (err) => {
        console.error("Error al cargar wordList.json:", err);
      }
    });
  }

  private generateCombinations(letters: string): string[] {
    const results = new Set<string>();
    const array = letters.split('');

    const permute = (arr: string[], current: string) => {
      if (current.length > 1) results.add(current);
      for (let i = 0; i < arr.length; i++) {
        permute([...arr.slice(0, i), ...arr.slice(i + 1)], current + arr[i]);
      }
    };

    permute(array, '');
    return Array.from(results);
  }
}
