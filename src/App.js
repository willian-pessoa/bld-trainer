import './App.scss';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomeScreen from './components/home/HomeScreen';
import BldApp from './components/bldApp/BldApp';
import MbldApp from './components/mbldApp/MbldApp';

// LOCAL STORAGE DEFAULT
if (localStorage.getItem("LETTERS") === null){
  localStorage.setItem("LETTERS", "ABCDEFGJKLMNOPQRSTUVWX");
} 
if (localStorage.getItem("level") === null){
  localStorage.setItem("level", 1);
}
if (localStorage.getItem("dataUser") === null){
  localStorage.setItem("dataUser", JSON.stringify([
    {
      isRight: false,
      level: 0,
      time: 0,
    }
  ]))
}
// END LOCAL STORAGE MANIPULATION

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<HomeScreen LETTERS={localStorage.getItem("LETTERS")}/>}/>
          <Route path="bld" element={<BldApp LETTERS={localStorage.getItem("LETTERS")}/>}/>
          <Route path="mbld" element={ <MbldApp/> } />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
