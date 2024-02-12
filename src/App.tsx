import React, { useState } from "react";
import Header from "./components/Header";
import UserInput from "./components/UserInput";
import { calculateInvestmentResults, formatter } from "./util/investment";
import ResultsTable from "./components/ResultsTable";

const defaultInvestmentParams = {
  initialInvestment: 1000,
  annualInvestment: 100,
  expectedReturn: 5,
  duration: 10,
};

interface Investment {
  year: number;
  investmentValue: number;
  interest: number;
  totalInterest: number;
  investedCapital: number;
}

function App() {
  const [investmentParams, setInvestmentParams] = useState(
    defaultInvestmentParams
  );
  const [investmentResults, setInvestmentResults] = useState<Investment[]>([]);

  const durationError = investmentParams.duration < 1;

  function calculate(name, value) {
    console.log(`${name}: ${value}`);
    setInvestmentParams((prev) => {
      return { ...prev, [name]: parseFloat(value) };
    });
    const results = calculateInvestmentResults({
      ...investmentParams,
      [name]: parseFloat(value),
    });
    console.log(investmentParams);
    console.log({ results });
    setInvestmentResults(results);
  }

  return (
    <>
      <Header />
      <div id="user-input">
        <div className="input-group">
          <UserInput
            name={"initialInvestment"}
            label={"Initial Investment"}
            defaultValue={defaultInvestmentParams.initialInvestment}
            onInputChange={calculate}
          />
          <UserInput
            name={"annualInvestment"}
            label={"Annual Investment"}
            defaultValue={defaultInvestmentParams.annualInvestment}
            onInputChange={calculate}
          />
        </div>
        <div className="input-group">
          <UserInput
            name={"expectedReturn"}
            label={"Expected Return"}
            defaultValue={defaultInvestmentParams.expectedReturn}
            onInputChange={calculate}
          />
          <UserInput
            name={"duration"}
            label={"Duration"}
            defaultValue={defaultInvestmentParams.duration}
            onInputChange={calculate}
          />
        </div>
      </div>
      {durationError && (
        <p className="center">Duration must be at least 1 year</p>
      )}
      <ResultsTable results={investmentResults} />
    </>
  );
}

export default App;
