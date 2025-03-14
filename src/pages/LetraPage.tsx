import { useState } from 'react';
import React from 'react';
import NavComponent from '../components/NavComponent';
import { Link } from 'react-router-dom';



const WordFinder = () => {
  const [letters, setLetters] = useState<string>('');
  const [validWords, setValidWords] = useState<string[]>([]);
  const [numVowels, setNumVowels] = useState<number | null>(null);
  const [generatedWords, setGeneratedWords] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const findWords = async () => {
    const inputLetters = letters.trim() || generatedWords;

    if (inputLetters.length !== 10) {
      alert('Introduce exactamente 10 letras.');
      return;
    }

    loadAndFindWords(inputLetters);
  };

  const loadAndFindWords = async (inputLetters: string) => {
    setIsLoading(true);

    try {
      const response = await fetch('/wordList.txt');
      const data = await response.text();
      const dictionary = new Set(data.split('\n').map(word => word.trim()));
      const possibleWords = generateCombinations(inputLetters.toLowerCase());
      const filteredWords = possibleWords.filter(word => word.length >= 5 && dictionary.has(word));

      setValidWords(filteredWords.sort((a, b) => b.length - a.length));

      if (generatedWords) {
        setGeneratedWords(inputLetters);
        setLetters('');
      }
    } catch (error) {
      console.error('Error al cargar wordList.txt:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const generateRandomWords = () => {
    if (numVowels === null || numVowels < 2 || numVowels > 8) {
      alert('Introduce un número válido de vocales (2-8).');
      return;
    }

    const vowels = 'AEIOUÁÉÍÓÚ';
    const consonants = 'BCDFGHJKLMNPQRSTVWXYZ';

    let word = '';
    for (let i = 0; i < numVowels; i++) {
      word += vowels[Math.floor(Math.random() * vowels.length)];
    }

    while (word.length < 10) {
      word += consonants[Math.floor(Math.random() * consonants.length)];
    }

    setGeneratedWords(word.split('').sort(() => Math.random() - 0.5).join(''));
  };

  const generateCombinations = (letters: string): string[] => {
    const results = new Set<string>();

    const permute = (arr: string[], current: string) => {
      if (current.length > 1) results.add(current);
      for (let i = 0; i < arr.length; i++) {
        permute([...arr.slice(0, i), ...arr.slice(i + 1)], current + arr[i]);
      }
    };

    permute(letters.split(''), '');

    return Array.from(results);
  };

  return (
    <>
    <NavComponent/>
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Generador de Palabras</h1>
      <input
        type="text"
        value={letters}
        onChange={(e) => setLetters(e.target.value)}
        placeholder="Introduce 10 letras"
        maxLength={10}
        className="border p-2 rounded mr-2"
        />
      <button onClick={findWords} className="bg-blue-500 text-white px-4 py-2 rounded mr-2">
        Buscar Palabras
      </button>

      <input
        type="number"
        value={numVowels ?? ''}
        onChange={(e) => setNumVowels(Number(e.target.value))}
        placeholder="Número de vocales (2-8)"
        className="border p-2 rounded mr-2"
        />
      <button onClick={generateRandomWords} className="bg-green-500 text-white px-4 py-2 rounded">
        Generar Aleatorio
      </button>

      {isLoading ? (
        <p className="mt-4">Cargando...</p>
      ) : (
        <div className="mt-4">
          
          {validWords.map((word, index) => (
            <Link 
              target="_blank" 
              key={index} 
              to={`http://dle.rae.es/srv/search?w=${word}`}
              className="border-b py-1"
            ><p>{word}</p></Link>
          ))}
        </div>
      )}
    </div>
    </>
  );
};

export default WordFinder;
