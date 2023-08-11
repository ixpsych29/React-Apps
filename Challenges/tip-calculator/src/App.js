import { useState } from "react";
import "./index.css";

export default function App() {
  return (
    <div>
      <TipCalculator />
    </div>
  );
}

function TipCalculator() {
  const [bill, setBill] = useState(0);
  const [percentage1, setPercentage1] = useState(0);
  const [percentage2, setPercentage2] = useState(0);

  const tip = bill * ((percentage1 + percentage2) / 2 / 100);
  //tip = bill* (((%age1 + %age2) / 2) / 100) = gives us the percentage based on the bill

  function handleReset() {
    setBill(0);
    setPercentage1(0);
    setPercentage2(0);
  }

  return (
    <div>
      <BillInput bill={bill} onSetBill={setBill} />
      <SelectPercentage percentage={percentage1} onSelect={setPercentage1}>
        How did you like the service? &nbsp;
      </SelectPercentage>

      {/* reusing percentage component brother. */}
      <SelectPercentage percentage={percentage2} onSelect={setPercentage2}>
        How did your friend like the service? &nbsp;
      </SelectPercentage>

      {/* we don't want to show reset button until bill is empty so */}
      {bill > 0 && (
        <>
          <Output bill={bill} tip={tip} />
          <Reset onHandleReset={handleReset} />
        </>
      )}
    </div>
  );
}

//defining components for them.
function BillInput({ bill, onSetBill }) {
  return (
    <div>
      <label>How much was the bill? &nbsp;</label>
      <input
        type="text"
        placeholder="Enter amount"
        value={bill}
        onChange={(e) => onSetBill(Number(e.target.value))}
      />
    </div>
  );
}

function SelectPercentage({ children, percentage, onSelect }) {
  return (
    <div>
      {children}
      <select
        value={percentage}
        onChange={(e) => onSelect(Number(e.target.value))}
      >
        <option value="0">Dissatisfied (0%) </option>
        <option value="5">It was OK (5%) </option>
        <option value="10">It was Good (10%) </option>
        <option value="20">Absolutely Amazing (20%) </option>
      </select>
    </div>
  );
}

function Output({ bill, tip }) {
  return (
    <div>
      <h2>
        You pay ${bill + tip} (${bill} + ${tip} tip){" "}
      </h2>
    </div>
  );
}

function Reset({ onHandleReset }) {
  return <button onClick={onHandleReset}>reset</button>;
}
