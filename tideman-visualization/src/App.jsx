import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';

// Pages
import { Home } from './pages/Home';
import { CreateElections } from './pages/CreateElections';

function App() {
    return (
        <div className="app-container">
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/create" element={<CreateElections />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
