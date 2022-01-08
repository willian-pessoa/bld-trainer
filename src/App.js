import './App.scss';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomeScreen from './components/home/HomeScreen';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<HomeScreen />}/>
          <Route path="/bld" element={ <h1>Bld</h1> } />
          <Route path="mbld" element={ <h1>Mbld</h1> } />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
