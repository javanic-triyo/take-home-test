import { useState } from "react";
import "./App.css";

type Domino = [number, number];

const initialData: Domino[] = [
  [6,1], [4,3], [5,1], [3,4], [1,1], [3,4], [1,2]
];

export default function App() {
  const [dominoes, setDominoes] = useState<Domino[]>(initialData);
  const [removeTotal, setRemoveTotal] = useState("");

  const doubleCount = dominoes.filter(([a, b]) => a === b).length;

  const DominoCard = ({ top, bottom }: { top: number; bottom: number }) => (
    <div className="domino">
      <div className="half">{top}</div>
      <div className="divider"></div>
      <div className="half">{bottom}</div>
    </div>
  );

  const sortAsc = () => {
    const sorted = [...dominoes].sort((a, b) => (a[0] + a[1]) - (b[0] + b[1]));
    setDominoes(sorted);
  };

  const sortDesc = () => {
    const sorted = [...dominoes].sort((a, b) => (b[0] + b[1]) - (a[0] + b[1]));
    setDominoes(sorted);
  };

  const flipAll = () => {
    const flipped = dominoes.map(([a, b]) => [b, a] as Domino);
    setDominoes(flipped);
  };

  const removeDuplicates = () => {
    const seen = new Set<string>();
    const unique = dominoes.filter(([a, b]) => {
      const key = `${Math.min(a, b)},${Math.max(a, b)}`;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
    setDominoes(unique);
  };

  const removeByTotal = () => {
    const num = parseInt(removeTotal);
    if (isNaN(num)) return alert("Masukkan angka yang valid!");
    const filtered = dominoes.filter(([a, b]) => a + b !== num);
    setDominoes(filtered);
    setRemoveTotal("");
  };

  const reset = () => setDominoes(initialData);

  return (
    <div>
      <h1>Dominoes</h1>
    <p className="subtitle"> single page Domino
    </p>

    <div className="Source"> 
      <strong>source:</strong> <br />
      <span id="source-data">{JSON.stringify(dominoes)}</span>
    </div>

    <div className="double">
      Double number: <span>{doubleCount}</span>
    </div>

    <div className="domino-container">
      {dominoes.map((domino, index) => (
        <DominoCard key={index} top={domino[0]} bottom={domino[1]} />
      ))}
    </div>

    <div className="buttons">
      <button onClick={sortAsc}>Sort Asc</button>
      <button onClick={sortDesc}>Sort Desc</button>
      <button onClick={flipAll}>Flip All</button>
      <button onClick={removeDuplicates}>Remove Duplicates</button>
      <button onClick={reset}>Reset</button>
    </div>

    {/* Remove total */}
      <div className="remove-total">
        <label>
          Remove dominoes with total:
          <input
            type="number"
            value={removeTotal}
            onChange={(e) => setRemoveTotal(e.target.value)}
            placeholder="Enter Total (ex: 2)"
          />
        </label>
        <button onClick={removeByTotal}>Remove</button>
      </div>
      </div>
    );
  }