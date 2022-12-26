import React, { useState } from "react";
import "./App.css";

function App() {
  const [input, setInput] = useState({
    firstNum: 0,
    operator: "=",
    nextNum: 0,
  });

  const inputHandler = (e) => {
    console.log(Number(e.target.value), e.target.value, typeof input.firstNum);
    if (
      (input.operator === "" || input.operator === "=") &&
      input.nextNum === 0
    ) {
      console.log("to set firstNum", input);
      if (typeof input.firstNum !== "number") {
        setInput({
          ...input,
          firstNum: `${input.firstNum}` + `${e.target.value}`,
        });
        console.log("inside internal condition >>>", input.firstNum);
      } else {
        console.log("inside internal condition 2 >>>", input.firstNum);

        setInput({
          ...input,
          firstNum:
            input.firstNum === 0
              ? Number(e.target.value)
              : input.firstNum * 10 + Number(e.target.value),
        });
      }

      console.log("after set first num   >>>", input.firstNum);
    } else if (input.firstNum !== 0 && input.operator !== ("" || "=")) {
      console.log(e.target.value);
      if (typeof input.nextNum !== "number") {
        setInput({
          ...input,
          nextNum: `${input.nextNum}` + `${e.target.value}`,
        });
        console.log("inside internal condition >>>", input.nextNum);
      } else {
        setInput({
          ...input,
          nextNum:
            input.nextNum === 0
              ? Number(e.target.value)
              : input.nextNum * 10 + Number(e.target.value),
        });
      }
      console.log("to set next num", input);
    } else if (typeof input.firstNum === "string" && input.nextNum === 0) {
      setInput({
        ...input,
        firstNum: input.firstNum + e.target.value,
      });
    }
  };

  const calculationHandler = (e) => {
    if (input.firstNum !== 0 && input.operator === "" && input.nextNum === 0) {
      console.log(
        "inside operator",
        input.firstNum,
        e.target.id,
        input.nextNum
      );
      if (e.target.value === "=") {
        setInput({
          ...input,
          operator: "",
          firstNum: Number(input.firstNum),
          nextNum: Number(input.nextNum),
        });
      } else {
        setInput({
          ...input,
          operator: e.target.id,
          firstNum: Number(input.firstNum),
          nextNum: Number(input.nextNum),
        });
      }
    } else if (
      input.firstNum !== 0 &&
      input.nextNum !== 0 &&
      input.operator !== ""
    ) {
      switch (input.operator) {
        case "/":
          setInput({
            firstNum: Number(input.firstNum) / Number(input.nextNum),
            operator: e.target.id,
            nextNum: 0,
          });
          console.log("inside switch  /", input, input.res);
          break;
        case "x":
          setInput({
            firstNum: Number(input.firstNum) * Number(input.nextNum),
            operator: e.target.id,
            nextNum: 0,
          });
          console.log("inside switch  x", input, input.res);
          break;
        case "+":
          setInput({
            firstNum: Number(input.firstNum) + Number(input.nextNum),
            operator: e.target.id,
            nextNum: 0,
          });
          console.log("inside switch  +", input, input.res);
          break;
        case "-":
          setInput({
            firstNum: Number(input.firstNum) - Number(input.nextNum),
            operator: e.target.id,
            nextNum: 0,
          });
          console.log("inside switch  -", input, input.res);
          break;
      }
    } else if (
      input.firstNum !== 0 &&
      input.operator !== "" &&
      input.nextNum === 0
    ) {
      console.log("inside third cond   >>>", input);
      setInput({
        ...input,
        operator: e.target.id,
        firstNum: Number(input.firstNum),
        nextNum: Number(input.nextNum),
      });
    }
  };

  const onAddDecimal = () => {
    console.log("in Decimal >>>", Number.isInteger(input.firstNum));

    if (input.nextNum === 0 && Number.isInteger(input.firstNum)) {
      setInput({
        ...input,
        firstNum: Number.isInteger(input.firstNum)
          ? `${input.firstNum}` + "."
          : input.firstNum,
      });
      console.log("first", typeof input.firstNum);
    } else if (input.operator !== "" && Number.isInteger(input.nextNum)) {
      setInput({
        ...input,
        nextNum: Number.isInteger(input.nextNum)
          ? `${input.nextNum}` + "."
          : input.nextNum,
      });
    } else {
      console.log("Already a decimal");
    }
  };
  console.log(input, typeof input.firstNum);

  return (
    <div classNam="App">
      <div className="cal-container">
        <p className="cal-item">
          {input.nextNum !== 0 ? input.nextNum : input.firstNum}
        </p>
      </div>
      <div>
        <div className="button-box">
          <div className="button-container">
            <button
              id="AC"
              className="button"
              value="AC"
              onClick={() => {
                setInput({ firstNum: 0, operator: "", nextNum: 0 });
              }}
            >
              AC
            </button>
          </div>
          <div className="button-container">
            <button
              id="neg"
              className="button"
              onClick={() => {
                if (input.firstNum !== 0 && input.nextNum === 0) {
                  setInput({ ...input, firstNum: input.firstNum * -1 });
                } else {
                  // console.log("something went wrong");
                  setInput({ ...input, nextNum: input.nextNum * -1 });
                }
              }}
            >
              +/-
            </button>
          </div>
          <div className="button-container">
            <button
              id="percent"
              className="button"
              onClick={() => {
                if (input.firstNum !== 0) {
                  setInput({ ...input, firstNum: input.firstNum / 100 });
                }
              }}
            >
              %
            </button>
          </div>
          <div className="button-container">
            <button
              id="/"
              className="button last-column"
              onClick={calculationHandler}
            >
              /
            </button>
          </div>
        </div>
        <div className="button-box">
          <div className="button-container">
            <button className="button" value="7" onClick={inputHandler}>
              7
            </button>
          </div>
          <div className="button-container">
            <button className="button" value="8" onClick={inputHandler}>
              8
            </button>
          </div>
          <div className="button-container">
            <button className="button" value="9" onClick={inputHandler}>
              9
            </button>
          </div>
          <div className="button-container">
            <button
              id="x"
              className="button last-column"
              onClick={calculationHandler}
            >
              x
            </button>
          </div>
        </div>
        <div className="button-box">
          <div className="button-container">
            <button className="button" value="4" onClick={inputHandler}>
              4
            </button>
          </div>
          <div className="button-container">
            <button className="button" value="5" onClick={inputHandler}>
              5
            </button>
          </div>
          <div className="button-container">
            <button className="button" value="6" onClick={inputHandler}>
              6
            </button>
          </div>
          <div id="-" className="button-container">
            <button
              id="-"
              className="button last-column"
              onClick={calculationHandler}
            >
              -
            </button>
          </div>
        </div>
        <div className="button-box">
          <div className="button-container">
            <button className="button" value="1" onClick={inputHandler}>
              1
            </button>
          </div>
          <div className="button-container">
            <button className="button" value="2" onClick={inputHandler}>
              2
            </button>
          </div>
          <div className="button-container">
            <button className="button" value="3" onClick={inputHandler}>
              3
            </button>
          </div>
          <div className="button-container ">
            <button
              id="+"
              className="button last-column"
              onClick={calculationHandler}
            >
              +
            </button>
          </div>
        </div>
        <div className="button-box">
          <div className="button-container zero-button">
            <button className="button" value="0" onClick={inputHandler}>
              0
            </button>
          </div>
          <div className="button-container">
            <button id="point" className="button" onClick={onAddDecimal}>
              .
            </button>
          </div>
          <div className="button-container">
            <button
              id="="
              className="button last-column"
              onClick={calculationHandler}
            >
              =
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
