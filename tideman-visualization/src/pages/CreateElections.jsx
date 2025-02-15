import React, { useState } from 'react';
import CreateCandidates from '../components/CreateCandidates';
import CreateBallots from '../components/createBallots';

export const CreateElections = () => {
    const [candidates, setCandidates] = useState([]);
    const [step, setStep] = useState("create_candidates");

    return (
        <div className="create-elections-container">
            <h3 className='fw-bold'>Candidatos:</h3>
            <div className="candidates-list">
                {candidates.map((c, idx) => (
                    <div key={idx} className="candidate-item">
                        {c.name}
                    </div>
                ))}
            </div>

            {step === "create_candidates" && (
                <CreateCandidates candidates={candidates} setCandidates={setCandidates} />
            )}
        </div>
    );
};
