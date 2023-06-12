import { Route, BrowserRouter, Routes } from "react-router-dom";
import AuthPage from "./pages/Auth";
import RootPage from "./pages/Root";
import Home from "./pages/Home";


function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<RootPage />} />
          <Route path="/home" element={<Home />} />
          <Route path="/auth" element={<AuthPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
