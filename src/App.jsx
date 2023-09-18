import "./App.scss";
import Calculator from "./components/Calculator.jsx";

function App() {
  return (
    <div className="container">
      <nav className="navbar"></nav>
      <main className="content">
        <Calculator />
      </main>
    </div>
  );
}

export default App;
