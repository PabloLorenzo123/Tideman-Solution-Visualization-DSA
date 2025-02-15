import React, { useState } from "react";

const BallotDisplay = ({ ballots, setStep}) => {
    console.log(ballots);
    return (
        <>
        <div className="container mt-4">
            <div className="row">
                {ballots.map((ballot, index) => (
                    <div key={index} className="col-md-4 mb-3">
                        <div className="card shadow-sm">
                            <div className="card-header bg-white fw-bold">
                                Voto #{index + 1}
                            </div>
                            <div className="card-body">
                                <ol className="mb-0">
                                    {ballot.map((candidate, i) => (
                                        <li key={i}>{candidate.name}</li>
                                    ))}
                                </ol>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>

        {/* Next step button */}
        <button className="btn btn-primary" onClick={() => setStep('show_algorithm')}>Siguiente</button>
        </>
    );
};

export default BallotDisplay;
