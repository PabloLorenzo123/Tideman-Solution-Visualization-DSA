import React, { useState } from "react";
import CreateCandidatesAndBallots from "../components/CreateCandidates";
import CreateBallots from "../components/SelectionSortPairs";
import BallotDisplay from "../components/BallotsDisplay";
import TidemanSteps from "../components/TidemanSteps";

export const CreateElections = () => {
  const [candidates, setCandidates] = useState([]);
  const [ballots, setBallots] = useState([]);
  const [voters, setVoters] = useState(0);

  const [step, setStep] = useState("create_candidates");

  return (
    <div className="create-elections-container">
      <h3 className="fw-bold">Candidatos:</h3>
      <div className="candidates-list mb-5">
        {candidates.map((c, idx) => (
          <div key={idx} className="candidate-item shadow border">
            {c.name}
          </div>
        ))}
      </div>

      <p className="text-white d-flex align-items-center justify-content-center">
        Numero de votantes:{" "}
        <input
          className="form-control w-25 ms-3"
          type="number"
          value={voters}
          onChange={(e) => setVoters(e.target.value)}
        />{" "}
      </p>

      {step === "create_candidates" && (
        <CreateCandidatesAndBallots
          candidates={candidates}
          setCandidates={setCandidates}
          ballots={ballots}
          setBallots={setBallots}
          voters={voters}
          setStep={setStep}
        />
      )}

      {step == "show_ballots" && (
        <BallotDisplay ballots={ballots} setStep={setStep} />
      )}

      {step == "show_algorithm" && (
        <TidemanSteps candidates={candidates} ballots={ballots} />
      )}
    </div>
  );
};
