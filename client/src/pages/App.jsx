import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Home";
import About from "./About";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import Profile from "./Profile";
import Header from '../componets/Header'



export default function App() {
  return <BrowserRouter>
  <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/about" element={<About />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
  </BrowserRouter>;
}


