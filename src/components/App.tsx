import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginForm from "./content/LoginForm";
import Profile from "./content/Profile";
import Bar from "./bar/Bar";

function App() {
  return (
    <BrowserRouter>
      <div>
        <Bar />
        <Routes>
          <Route path="/" element={<LoginForm />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </div>

    </BrowserRouter>
  );
};

export default App;
