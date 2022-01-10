import './App.scss';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomeScreen from './components/home/HomeScreen';
import BldApp from './components/bldApp/BldApp';

// LOCAL STORAGE DEFAULT
if (localStorage.getItem("LETTERS") === null){
  localStorage.setItem("LETTERS", "ABCDEFGJKLMNOPQRSTUVWX");
} 
// END LOCAL STORAGE MANIPULATION

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<HomeScreen LETTERS={localStorage.getItem("LETTERS")}/>}/>
          <Route path="bld" element={<BldApp LETTERS={localStorage.getItem("LETTERS")}/>}/>
          <Route path="mbld" element={ <h1>Mbld</h1> } />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
