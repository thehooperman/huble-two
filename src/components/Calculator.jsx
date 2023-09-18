import { useState, useEffect } from "react";
import "../App.scss";

const initialState = {
  firstNumber: "",
  secondNumber: "",
  operator: "",
  result: 0,
};

const Calculator = () => {
  const [state, setState] = useState(initialState);
  const [input, setInput] = useState("");
  const [operationString, setOperationString] = useState("0");

  useEffect(() => {
    setOperationString(state.firstNumber + state.operator + state.secondNumber);
  }, [state]);

  useEffect(() => {
    handleResult();
  }, [operationString]);

  useEffect(() => {
    const keyDownHandler = (event) => {
      if (event.key === "Escape") {
        event.preventDefault();
        handelEsc();
      }
    };

    document.addEventListener("keydown", keyDownHandler);

    return () => {
      document.removeEventListener("keydown", keyDownHandler);
    };
  }, []);

  const handleInput = (e) => {
    setInput(e.target.value);
    if (state.operator === "") {
      setState({ ...state, firstNumber: e.target.value });
    } else {
      setState({ ...state, secondNumber: e.target.value });
    }
  };

  const handleOperator = (op) => {
    setInput("");
    setState({ ...state, operator: op });
  };

  const handleResult = () => {
    try {
      const calculatedResult = eval(operationString);
      setState({ ...state, result: calculatedResult });
    } catch (error) {
      setState({ ...state, result: 0 });
    }
  };

  const handelEsc = () => {
    console.log("Esc");
    setInput("");
    setState({ ...state, firstNumber: "" });
    setState({ ...state, secondNumber: "" });
    setState({ ...state, operator: "" });
  };

  return (
    <section className="calculator">
      <h2 className="calculator__text">Press "ESC" to clear input</h2>
      <fieldset className="calculator__fieldset calculator__fieldset--inputs">
        <div className="test">
          <input
            className="calculator__input calculator__text"
            type="number"
            name=""
            id=""
            maxLength={9}
            value={input}
            onChange={(e) => handleInput(e)}
            pattern="[0-9]+(\.[0-9]+)?"
          />
        </div>
        <div className="calculator__buttons">
          <button
            className="calculator__button"
            type="button"
            onClick={() => handleOperator("+")}
          >
            +
          </button>
          <button
            className="calculator__button"
            type="button"
            onClick={() => handleOperator("-")}
          >
            -
          </button>
          <button
            className="calculator__button"
            type="button"
            onClick={() => handleOperator("*")}
          >
            *
          </button>
          <button
            className="calculator__button"
            type="button"
            onClick={() => handleOperator("/")}
          >
            /
          </button>
        </div>
      </fieldset>
      <fieldset className="calculator__fieldset calculator__fieldset--outputs">
        <div>
          <h2 className="calculator__text">
            {operationString ? operationString : "0"}
          </h2>
        </div>
        <div>
          <h2 className="calculator__text">
            Result: {state.result ? state.result : 0}
          </h2>
        </div>
      </fieldset>
    </section>
  );
};

export default Calculator;
