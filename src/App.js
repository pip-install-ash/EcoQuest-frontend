import "./styles/index.css";
import Game from "./Game";
import "./firebase.config";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <div className="App">
      <Toaster position="top-right" />
      <Game />
    </div>
  );
}

export default App;
