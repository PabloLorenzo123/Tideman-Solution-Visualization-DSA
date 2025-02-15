import React, { useEffect, useState } from "react";
import {
  createPairs,
  findWinner,
  lockPairs,
  sortPairs,
  tallyVotes,
} from "../tideman";
import SelectionSortPairs from "./SelectionSortPairs";

const steps = [
  {
    title: "Paso 1: Contar Votos",
    code: `function contarVotos(candidatos, boletas) {
    let cantidadCandidatos = candidatos.length;
    let preferencias = Array.from({ length: cantidadCandidatos }, () => Array(cantidadCandidatos).fill(0));

    for (let boleta of boletas) {
        for (let i = 0; i < boleta.length; i++) {
            for (let j = i + 1; j < boleta.length; j++) {
                let ganadorIdx = boleta[i];
                let perdedorIdx = boleta[j];
                preferencias[ganadorIdx][perdedorIdx]++; // Incrementar la cuenta de preferencias
            }
        }
    }
    return preferencias;
}`,
    description:
      "Esta función cuenta cuántas veces un candidato es preferido sobre otro, formando una matriz de preferencias.",
  },
  {
    title: "Paso 2: Ordenar Parejas",
    code: `function ordenarParejas(preferencias, candidatos) {
    let parejas = [];
    let cantidadCandidatos = candidatos.length;

    for (let i = 0; i < cantidadCandidatos; i++) {
        for (let j = 0; j < cantidadCandidatos; j++) {
            if (preferencias[i][j] > preferencias[j][i]) {
                parejas.push({
                    ganador: i,
                    perdedor: j,
                    fuerza: preferencias[i][j] - preferencias[j][i]
                });
            }
        }
    }
    parejas.sort((a, b) => b.fuerza - a.fuerza);
    return parejas;
}`,
    description:
      "Esta función crea y ordena las parejas de candidatos donde uno es preferido sobre otro, basado en la fuerza de la victoria.",
  },
  {
    title: "Paso 3: Bloquear Parejas",
    code: `function bloquearParejas(parejas, candidatos) {
    let cantidadCandidatos = candidatos.length;
    let grafo = Array.from({ length: cantidadCandidatos }, () => new Set());

    for (let pareja de parejas) {
        if (!creaCiclo(grafo, pareja.ganador, pareja.perdedor)) {
            grafo[pareja.ganador].add(pareja.perdedor);
        }
    }
    return grafo;
}`,
    description:
      "Esta función bloquea las parejas más fuertes evitando ciclos para crear un grafo dirigido.",
  },
  {
    title: "Paso 4: Encontrar Ganador",
    code: `function encontrarGanador(grafo, candidatos) {
    let cantidadCandidatos = candidatos.length;
    let tieneAristaEntrante = Array(cantidadCandidatos).fill(false);

    for (let desde = 0; desde < cantidadCandidatos; desde++) {
        for (let hacia of grafo[desde]) {
            tieneAristaEntrante[hacia] = true;
        }
    }
    for (let i = 0; i < cantidadCandidatos; i++) {
        if (!tieneAristaEntrante[i]) {
            return candidatos[i].nombre;
        }
    }
    return null;
}`,
    description:
      "Esta función encuentra la fuente del grafo (un candidato sin aristas entrantes), quien es el ganador de la elección.",
  },
];

const TidemanSteps = ({ candidates, ballots }) => {
  const [stepIndex, setStepIndex] = useState(0);
  const [unOrderedPairs, setUnOrderedPairs] = useState(null);

  const [winner, setWinner] = useState(null);
  const [showWinner, setShowWinner] = useState(false);

  const transformBallots = (ballots) => {
    // Create a mapping from candidate names to their indices
    let candidatesArr = [];
    ballots.forEach((ballot) => {
      ballot.forEach((candidate) => {
        if (!candidatesArr.includes(candidate.name)) {
          candidatesArr.push(candidate.name);
        }
      });
    });

    // Now map each ballot to an array of indices based on the candidate names
    let transformedBallots = ballots.map((ballot) => {
      return ballot.map((candidate) => candidatesArr.indexOf(candidate.name));
    });

    return transformedBallots;
  };

  useEffect(() => {
    const cleanedCandidates = candidates.map((c) => c.name);
    const cleanedBallots = transformBallots(ballots);

    console.log(cleanedBallots);
    const preferences = tallyVotes(cleanedCandidates, cleanedBallots);
    const pairs = createPairs(preferences, cleanedCandidates);
    setUnOrderedPairs(pairs);
    const sortedPairs = sortPairs(pairs);
    const lockedGraph = lockPairs(sortedPairs, cleanedCandidates);
    const winner = findWinner(lockedGraph, cleanedCandidates);
    console.log(winner);
    setWinner(candidates.find((c) => c.name == winner));
  }, []);

  const nextStep = () => {
    if (stepIndex < steps.length - 1) {
      setStepIndex(stepIndex + 1);
    } else {
      // show winner.
      setShowWinner(true);
    }
  };

  const prevStep = () => {
    setStepIndex(stepIndex - 1);
    if (showWinner) setShowWinner(false);
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        {!showWinner ? (
          <div className="col-md-8">
            <div className="card shadow mt-5">
              <div className="card-header bg-primary text-white fw-bold">
                {steps[stepIndex].title}
              </div>
              <div className="card-body">
                {stepIndex == 1 && (
                  <SelectionSortPairs
                    unOrderedPairs={unOrderedPairs}
                    candidates={candidates}
                  />
                )}
                <pre className="bg-light p-3 rounded border text-start">
                  {steps[stepIndex].code}
                </pre>
                <p>{steps[stepIndex].description}</p>
                {stepIndex - 1 >= 0 && (
                  <button
                    className="btn btn-secondary mt-3 me-2"
                    onClick={prevStep}
                    disabled={stepIndex - 1 < 0}
                  >
                    Paso Previo
                  </button>
                )}

                <button
                  className="btn btn-primary mt-3"
                  onClick={nextStep}
                  disabled={stepIndex === steps.length}
                >
                  {stepIndex === steps.length - 1 ? "Finalizar" : "Siguiente"}
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="card shadow-lg mb-4" style={{ borderRadius: "15px" }}>
            <div
              className="card-header bg-primary text-white text-center fw-bold"
              style={{ fontSize: "1.5rem" }}
            >
              Ganador
            </div>
            <div className="card-body text-center">
              {/* Display candidate's name in large, bold font */}
              <h2 className="display-4 text-primary font-weight-bold">
                {winner.name}
              </h2>

              {/* Conditionally display the candidate's photo */}
              {winner.photoUrl ? (
                <img
                  src={winner.photoUrl}
                  alt={winner.name}
                  className="img-fluid rounded-circle mt-3"
                  style={{ maxWidth: "200px", maxHeight: "200px" }}
                />
              ) : (
                <div className="mt-3">
                  <i
                    className="fas fa-user-circle"
                    style={{ fontSize: "80px", color: "#6c757d" }}
                  ></i>
                </div>
              )}
            </div>
            <div className="card-footer text-center text-muted">
              <small>Ganador</small>
            </div>
            <button
              className="btn btn-secondary mt-3 me-2"
              onClick={prevStep}
              disabled={stepIndex - 1 < 0}
            >
              Paso Previo
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TidemanSteps;
