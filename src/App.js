import './App.css';
import Home from './Pages/Home/index.js';
import Header from './components/Header/index.js';
import './index.css';

// ✅ Import these:
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" exact={true} element={<Home />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
