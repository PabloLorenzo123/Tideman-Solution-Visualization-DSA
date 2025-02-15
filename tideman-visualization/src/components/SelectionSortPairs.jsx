import React, { useState } from "react";
import { Button, Table, Container } from "react-bootstrap";

const SelectionSortPairs = ({ unOrderedPairs, candidates }) => {
  // Initial array of pairs
  console.log(unOrderedPairs);
  const [pairs, setPairs] = useState(
    unOrderedPairs.map((obj) => Object.values(obj))
  );

  const [steps, setSteps] = useState([]); // Store sorting steps
  const [currentStep, setCurrentStep] = useState(0);

  // Function to calculate the difference
  const getDifference = ([a, b]) => Math.abs(a - b);

  // Selection Sort to generate sorting steps
  const selectionSortSteps = (arr) => {
    let steps = [];
    let newArr = [...arr];

    for (let i = 0; i < newArr.length - 1; i++) {
      let maxIndex = i;

      for (let j = i + 1; j < newArr.length; j++) {
        if (getDifference(newArr[j]) > getDifference(newArr[maxIndex])) {
          maxIndex = j;
        }
      }

      if (maxIndex !== i) {
        [newArr[i], newArr[maxIndex]] = [newArr[maxIndex], newArr[i]];
        steps.push([...newArr]); // Store the step
      }
    }

    return steps;
  };

  // Start sorting and generate steps
  const startSorting = () => {
    const sortingSteps = selectionSortSteps(pairs);
    setSteps(sortingSteps);
    setCurrentStep(0);
    setPairs(sortingSteps.length > 0 ? sortingSteps[0] : pairs);
  };

  // Move to the next step
  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
      setPairs(steps[currentStep + 1]);
    }
  };

  return (
    <Container className="mt-4">
      <h3 className="mb-3">
        Selection Sort Animación (De forma descendendiente)
      </h3>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Par</th>
            <th>Diferencia</th>
          </tr>
        </thead>
        <tbody>
          {pairs.map((pair, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>
                {candidates[pair[0]].name} vence a {candidates[pair[1]].name}
              </td>
              <td>{getDifference(pair)}</td>
            </tr>
          ))}
        </tbody>
      </Table>

      <div className="d-flex gap-2 mb-3">
        <Button variant="primary" onClick={startSorting}>
          Empezar ordenamiento
        </Button>
        <Button
          variant="success"
          onClick={nextStep}
          disabled={currentStep >= steps.length - 1}
        >
          Paso {currentStep + 1}/{steps.length}
        </Button>
      </div>
    </Container>
  );
};

export default SelectionSortPairs;
