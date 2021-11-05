import { BrowserRouter, Route,  Routes } from "react-router-dom";
import Fruits from "./page/fruits";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Fruits />} />
      </Routes>
    </BrowserRouter>
  );
  
}

export default App;
