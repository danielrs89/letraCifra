import { useState } from 'react';
import React from 'react';
import NavComponent from '../components/NavComponent';
import { Link } from 'react-router-dom';

const WordFinder = () => {
  // Estados para manejar los inputs, resultados y el estado de carga
  const [letters, setLetters] = useState<string>('');
  const [validWords, setValidWords] = useState<string[]>([]);
  const [numVowels, setNumVowels] = useState<number | null>(null);
  const [generatedWords, setGeneratedWords] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [wordsCombined, setWordsCombined] = useState<string>('');

  // Función principal para validar las letras y buscar las palabras
  const findWords = async () => {
    try {
      const inputLetters = letters.trim() || generatedWords;

      // Validar que haya exactamente 10 letras y solo contenga caracteres alfabéticos
      if (!/^[a-zA-ZáéíóúÁÉÍÓÚ]{10}$/.test(inputLetters)) {
        alert('Introduce exactamente 10 letras (sin caracteres especiales).');
        return;
      }

      setWordsCombined(inputLetters);
      await loadAndFindWords(inputLetters);
    } catch (error) {
      console.error('Error al procesar las letras:', error);
    }
  };

  // Cargar el diccionario y encontrar las combinaciones válidas
  const loadAndFindWords = async (inputLetters: string) => {
    try {
      setIsLoading(true);

      const response = await fetch('/wordList.txt');
      if (!response.ok) throw new Error('Error al cargar el archivo de palabras.');

      const data = await response.text();
      const dictionary = new Set(data.split('\n').map(word => word.trim().toLowerCase()));

      const possibleWords = generateCombinations(inputLetters.toLowerCase());
      const filteredWords = possibleWords.filter(word => word.length >= 5 && dictionary.has(word));

      // Ordenar las palabras por longitud descendente
      setValidWords(filteredWords.sort((a, b) => b.length - a.length));

      if (generatedWords) {
        setGeneratedWords(inputLetters);
        setLetters('');
      }
    } catch (error) {
      console.error('Error al buscar las palabras:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Generar 10 letras aleatorias con un número específico de vocales
  const generateRandomWords = () => {
    try {
      if (numVowels === null || numVowels < 2 || numVowels > 8) {
        alert('Introduce un número válido de vocales (2-8).');
        return;
      }

      const vowels = 'AEIOUÁÉÍÓÚ';
      const consonants = 'BCDFGHJKLMNPQRSTVWXYZ';

      let word = '';

      // Agregar vocales aleatorias
      for (let i = 0; i < numVowels; i++) {
        word += vowels[Math.floor(Math.random() * vowels.length)];
      }

      // Agregar consonantes aleatorias hasta completar 10 letras
      while (word.length < 10) {
        word += consonants[Math.floor(Math.random() * consonants.length)];
      }

      // Mezclar las letras de forma aleatoria
      const randomWords = word.split('').sort(() => Math.random() - 0.5).join('');

      setWordsCombined(randomWords);
      setLetters(randomWords);
      setNumVowels(0);
      setGeneratedWords(randomWords);
    } catch (error) {
      console.error('Error al generar las letras aleatorias:', error);
    }
  };

  // Generar todas las combinaciones posibles de las letras
  const generateCombinations = (letters: string): string[] => {
    try {
      const results = new Set<string>();

      const permute = (arr: string[], current: string) => {
        if (current.length > 1) results.add(current);
        for (let i = 0; i < arr.length; i++) {
          permute([...arr.slice(0, i), ...arr.slice(i + 1)], current + arr[i]);
        }
      };

      permute(letters.split(''), '');
      return Array.from(results);
    } catch (error) {
      console.error('Error al generar combinaciones:', error);
      return [];
    }
  };

  return (
    <>
      <NavComponent />
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
        <button onClick={findWords} className="mb-4 px-4 py-2 rounded">
          Buscar Palabras
        </button>

        <br />

        <input
          type="number"
          value={numVowels ?? ''}
          onChange={(e) => setNumVowels(Number(e.target.value))}
          placeholder="Número de vocales (2-8)"
          className="border p-2 rounded mr-2"
        />
        <button onClick={generateRandomWords} className="mb-4 px-3 py-2 rounded">
          Generar Aleatorio
        </button>

        {isLoading ? (
          <p className="mt-4">Generando palabras...</p>
        ) : (
          <div className="mt-4">
            <h1 className="text-2xl font-bold mb-4">{wordsCombined.toUpperCase()}</h1>
            {validWords.map((word, index) => (
              <p key={index}>
                <Link
                  target="_blank"
                  to={`http://dle.rae.es/srv/search?w=${word}`}
                  className="border-b py-1 btn"
                >
                  {word}
                </Link>
              </p>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default WordFinder;