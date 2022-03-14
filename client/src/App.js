import "./App.css";
import { Routes, Route } from "react-router-dom";
import { Landing, MyLoot } from "./components/componentsIndex";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/myloot" element={<MyLoot />} />
    </Routes>
  );
};

export default App;
