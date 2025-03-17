import React, { useState } from 'react';
import NavComponent from '../components/NavComponent';

function Cifra() {
  // Estado para los números aleatorios, el objetivo, la solución y los pasos.
  const [numbers, setNumbers] = useState<number[]>(Array(6).fill(0));
  const [target, setTarget] = useState<number>(0);
  const [solution, setSolution] = useState<string>("");
  const [steps, setSteps] = useState<string[]>([]);

  // Maneja el cambio de valores en los inputs de los números.
  const handleNumberChange = (index: number, value: string) => {
    const newNumbers = [...numbers];
    const parsedValue = Math.max(0, parseInt(value) || 0); // Asegura que no haya negativos.
    newNumbers[index] = parsedValue;
    setNumbers(newNumbers);
  };

  // Genera 6 números aleatorios entre 1 y 99.
  const generateRandomNumbers = () => {
    const randomNumbers = Array.from({ length: 6 }, () => Math.floor(Math.random() * 99) + 1);
    setNumbers(randomNumbers);
  };

  // Resuelve el problema buscando la mejor expresión.
  const solve = (nums: number[]) => {
    let bestExpression = "";
    let closestValue = Infinity;
    let bestSteps: string[] = [];

    // Función recursiva para generar las expresiones posibles.
    const generateExpressions = (
      currentNumbers: number[],
      expression: string = "",
      currentValue: number | null = null,
      currentSteps: string[] = []
    ) => {
      // Cuando ya hay un valor calculado, comparamos la diferencia con el objetivo.
      if (currentValue !== null && expression !== "") {
        const diff = Math.abs(currentValue - target);
        if (diff < Math.abs(closestValue - target)) {
          closestValue = currentValue;
          bestExpression = expression;
          bestSteps = [...currentSteps];
        }
      }

      // Iteramos por los números disponibles y generamos nuevas expresiones.
      for (let i = 0; i < currentNumbers.length; i++) {
        const num = currentNumbers[i];
        const remainingNumbers = [
          ...currentNumbers.slice(0, i),
          ...currentNumbers.slice(i + 1),
        ];

        // Si es el primer número, comenzamos la expresión.
        if (currentValue === null) {
          generateExpressions(remainingNumbers, `${num}`, num, [`${num}`]);
        } else {
          // Operaciones posibles: suma, multiplicación, resta, y división.
          generateExpressions(
            remainingNumbers,
            `(${expression} + ${num})`,
            currentValue + num,
            [...currentSteps, `${currentValue} + ${num} = ${currentValue + num}`]
          );

          generateExpressions(
            remainingNumbers,
            `(${expression} * ${num})`,
            currentValue * num,
            [...currentSteps, `${currentValue} * ${num} = ${currentValue * num}`]
          );

          // Solo restamos si no resulta en un número negativo.
          if (currentValue - num >= 0) {
            generateExpressions(
              remainingNumbers,
              `(${expression} - ${num})`,
              currentValue - num,
              [...currentSteps, `${currentValue} - ${num} = ${currentValue - num}`]
            );
          }

          // Solo dividimos si es divisible exactamente y el divisor no es cero.
          if (num !== 0 && currentValue % num === 0) {
            generateExpressions(
              remainingNumbers,
              `(${expression} / ${num})`,
              currentValue / num,
              [...currentSteps, `${currentValue} / ${num} = ${currentValue / num}`]
            );
          }
        }
      }
    };

    // Llamada inicial para generar las expresiones con los números dados.
    generateExpressions(nums);
    setSolution(`${bestExpression} = ${closestValue}`);
    setSteps(bestSteps.slice(1)); // El primer paso no es necesario porque es el número original.
  };

  // Ejecuta la solución al hacer clic en el botón de resolver.
  const handleSolve = () => {
    solve(numbers);
  };

  return (
    <>
      <NavComponent />

      <div id="app" className="text-center p-8">
        <h1 className="text-2xl font-bold mb-4">Números Aleatorios</h1>

        {/* Muestra los inputs para los números */}
        <div>
          {numbers.map((num, index) => (
            <input
              key={index}
              type="number"
              value={num}
              onChange={(e) => handleNumberChange(index, e.target.value)}
              className="m-2 p-2 border border-gray-300 rounded"
              min="0"
            />
          ))}
        </div>

        {/* Botón para generar números aleatorios */}
        <button
          onClick={generateRandomNumbers}
          className="mb-4 px-3 py-2 rounded"
        >
          Generar Aleatorios
        </button>

        {/* Input para el objetivo */}
        <div className="mt-4">
          <label className="mr-2">Objetivo:</label>
          <input
            type="number"
            value={target}
            onChange={(e) => setTarget(Math.max(0, parseInt(e.target.value) || 0))}
            className="p-2 border border-gray-300 rounded"
            min="0"
          />
        </div>

        {/* Botón para resolver el problema */}
        <button
          onClick={handleSolve}
          className="mb-4 px-3 py-2 rounded"
        >
          Resolver
        </button>

        {/* Mostrar la solución y los pasos */}
        {solution && (
          <div className="mt-8">
            <p><strong>Solución:</strong> {solution}</p>
            <ul className="border border-black d-inline-block p-4 list-unstyled">
              {steps.map((step, index) => (
                <li key={index}>{step}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </>
  );
}

export default Cifra;