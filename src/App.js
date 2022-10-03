import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./assets/styles/style.css";
import Main from "./components/main";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main date="1 jul 2023 00:00:00" />}></Route>
          <Route
            path="/alt"
            element={<Main theme="_light" date="22 dec 2022 00:00:00" />}
          ></Route>
          <Route
            path="/lov"
            element={<Main theme="_love" date="3 may 2022 00:00:00" />}
          ></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
