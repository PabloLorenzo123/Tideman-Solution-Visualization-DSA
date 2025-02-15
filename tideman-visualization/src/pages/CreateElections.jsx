import React from 'react';
import { useState } from 'react';

import CreateCandidates from '../components/CreateCandidates';
import CreateBallots from '../components/createBallots';

export const CreateElections = () => {
    const [candidates, setCandidates] = useState([]); // An array of objects : {name, image}.

   
    const [step, setStep] = useState("create_candidates"); // Steps: create_candidates -> create_ballots

    return (
        <>
            <h3 className='fw-bold'>Candidatos : {candidates.map((c, idx) => `${c.name}${idx != candidates.length - 1? ', ': '.'}`)}</h3>

            {step == "create_candidates" &&
             <CreateCandidates candidates={candidates} setCandidates={setCandidates} setStep={setStep}/>
            }
            {step == "sort_pairs" && <CreateBallots />}
            
        </>
    )
}
