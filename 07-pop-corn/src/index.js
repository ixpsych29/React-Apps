import React, { useState } from "react";
import ReactDOM from "react-dom/client";
// import "./index.css";
// import App from "./App";
import StarRating from "./StarRating";

function Test() {
  const [movieRating, setMovieRating] = useState(0);
  return (
    <div>
      <StarRating color="magenta" maxRating={10} onSetRating={setMovieRating} />
      <p>This movie has {movieRating} star ratings!</p>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    {/* <App /> */}
    <StarRating
      maxRating={5}
      messages={["Terrible 😑", "Bad 😐", "Okay 🙂", "Good 🥰", "Amazing! 😍"]}
    />
    <StarRating color="green" size={42} className="test" defaultRating={3} />
    <Test />
  </React.StrictMode>
);
