import React, { useState } from "react";
import { MAX_CANDIDATES, MIN_CANDIDATES } from "../constants";

function CreateCandidatesAndBallots({
  candidates,
  setCandidates,
  ballots,
  setBallots,
  voters,
  setStep,
}) {
  const [candidateName, setCandidateName] = useState("");
  const [candidatePhoto, setCandidatePhoto] = useState("");

  const addCandidate = (e) => {
    e.preventDefault();

    setCandidates((prev) => {
      let newName = candidateName;
      let count = 1;

      // Check for existing candidates with the same name
      const existingNames = prev.map((c) => c.name);
      while (existingNames.includes(newName)) {
        count++;
        newName = `${candidateName} (${count})`;
      }

      return [
        ...prev,
        {
          name: newName,
          photo: candidatePhoto,
        },
      ];
    });

    // Clear the fields.
    setCandidateName("");
    setCandidatePhoto("");
  };

  const generateRandomBallot = (candidates) => {
    const shuffledCandidates = [...candidates].sort(() => Math.random() - 0.5);
    return shuffledCandidates;
  };

  const generateBallots = () => {
    const newBallots = Array.from({ length: voters }, () =>
      generateRandomBallot(candidates)
    );
    setBallots(newBallots);
    setStep("show_ballots");
  };

  return (
    <div className="container mt-5" style={{ width: "50%" }}>
      <div className="card p-4 shadow-lg">
        <h2 className="mb-4">Candidato #{candidates.length + 1}</h2>
        <form onSubmit={addCandidate}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Nombre
            </label>
            <input
              type="text"
              className="form-control"
              id="name"
              placeholder="Nombre del candidato"
              value={candidateName}
              onChange={(e) => setCandidateName(e.target.value)}
              autoComplete="off"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="photoUrl" className="form-label">
              Foto URL
            </label>
            <input
              type="url"
              className="form-control"
              id="photoUrl"
              placeholder="Enter photo URL"
              value={candidatePhoto}
              autoComplete="off"
              onChange={(e) => setCandidatePhoto(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="btn btn-primary me-2"
            disabled={!candidateName || candidates.length >= MAX_CANDIDATES}
          >
            Agregar
          </button>
          <button
            type="button"
            className="btn btn-secondary"
            disabled={candidates.length < MIN_CANDIDATES || !voters}
            onClick={generateBallots}
          >
            Listo
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreateCandidatesAndBallots;
