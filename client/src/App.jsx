import { Routes } from "react-router";
import { Route } from "react-router";
import Home from "./pages/Home";

const App = () => {
  return (
  
      <div className="min-h-screen bg-gray-100 p-8">
        <h1 className="text-4xl font-bold text-center mb-8 text-blue-800">RAG-Powered Ed-Tech Platform</h1>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </div>
   
  );
}

export default App