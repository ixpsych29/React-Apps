import "./index.css";

export default function App() {
  return (
    <div className="App">
      <BillInput />
      <br />
      <SelectPercentage />
      <br />
      <SelectPercentage />
      <br />
      <br />
      <Output />
      <br />
      <Button />
    </div>
  );
}

//defining components for them.
function BillInput() {
  return (
    <div>
      How much was the bill? &nbsp;
      <input type="text" placeholder="Enter amount" />
    </div>
  );
}
function SelectPercentage() {
  return (
    <div>
      How did you like the service? &nbsp;
      <select>
        <option value="">It was OK (5%) </option>
        <option value="">It was Good (10%) </option>
        <option value="">Absolutely Amazing (20%) </option>
      </select>
    </div>
  );
}

function Output() {
  return (
    <div>
      {/* <h2>You pay {totalBIll} {`($${bill}+$${tip}tip)`}{" "}</h2> */}
    </div>
  );
}
function Button() {
  return <Button>Reset</Button>;
}
