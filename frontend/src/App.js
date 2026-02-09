import Login from "./Pages/Login";
import Signup from "./Pages/SignUp";
import Dashboard from "./Pages/Dashboard";

function App() {
  const path = window.location.pathname;

  if (path === "/signup") return <Signup />;
  if (path === "/dashboard") return <Dashboard />;
  return <Login />;
}

export default App;
