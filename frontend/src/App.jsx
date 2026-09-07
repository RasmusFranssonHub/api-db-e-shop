import { BrowserRouter, Route, Routes } from "react-router-dom";

import Sidebar from "./components/Sidebar/Sidebar";

import Dashboard from "./pages/Dashboard/Dashboard";
import Products from "./pages/Products/Products";
import Categories from "./pages/Categories/Categories";
import Preview from "./pages/Preview/Preview";
import Login from "./pages/login/Login";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Login - ingen sidebar */}
        <Route path="/" element={<Login />} />

        {/* Alla sidor i systemet - med sidebar */}
        <Route
          path="*"
          element={
            <div className="app">
              <Sidebar />

              <main className="main-content">
                <Routes>
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/products" element={<Products />} />
                  <Route path="/categories" element={<Categories />} />
                  <Route path="/preview" element={<Preview />} />
                </Routes>
              </main>
            </div>
          }
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
