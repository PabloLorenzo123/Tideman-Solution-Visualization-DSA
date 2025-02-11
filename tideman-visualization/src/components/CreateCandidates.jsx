import React, { useState } from 'react'

function CreateCandidates({ candidates, setCandidates }) {

    const [candidateName, setCandidateName] = useState('');
    const [candidatePhoto, setCandidatePhoto] = useState('');

  

    const addCandidate = (e) => {
        e.preventDefault();

        setCandidates(prev => [
            ...prev,
            {
                name: candidateName,
                photo: candidatePhoto,
            }
        ])
        // Clear the fields.
        setCandidateName('');
        setCandidatePhoto('');
    }

    return (
        <div className="container mt-5" style={{ width: '70%' }}>
            <div className="card p-4 shadow-lg">
                <h2 className="mb-4">Candidato #{candidates.length + 1}</h2>
                <form onSubmit={addCandidate}>
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">Nombre</label>
                        <input
                            type="text"
                            className="form-control"
                            id="name"
                            placeholder="Nombre del candidato"
                            value={candidateName}
                            onChange={(e) => setCandidateName(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="photoUrl" className="form-label">Photo URL</label>
                        <input
                            type="url"
                            className="form-control"
                            id="photoUrl"
                            placeholder="Enter photo URL"
                            value={candidatePhoto}
                            onChange={(e) => setCandidatePhoto(e.target.value)}

                        />
                    </div>
                    <button
                        type="submit"
                        className="btn btn-primary me-2"
                        disabled={!candidateName}
                    >
                        Agregar
                    </button>
                    <button type="button" className='btn btn-secondary' disabled={!candidates}>
                        Listo
                    </button>
                </form>
            </div>
        </div>
    )
}

export default CreateCandidates;
