import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Home from './pages/home/Home';
import Chat from "./pages/chat/Chat";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />
  },
  {
    path: "/chats",
    element: <Chat />
  }
])

function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  )
}

export default App
