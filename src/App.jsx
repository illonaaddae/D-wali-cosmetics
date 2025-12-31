import { useState, useEffect } from "react";
import Preloader from "./components/Preloader";
import CustomCursor from "./components/CustomCursor";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Products from "./components/Products";
import Benefits from "./components/Benefits";
import VideoShowcase from "./components/VideoShowcase";
import Story from "./components/Story";
import Partners from "./components/Partners";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import BackToTop from "./components/BackToTop";

function App() {
  const [loading, setLoading] = useState(true);
  const [cursorVariant, setCursorVariant] = useState("default");

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {loading && <Preloader />}
      <CustomCursor variant={cursorVariant} />
      <Navbar />
      <main>
        <Hero setCursorVariant={setCursorVariant} />
        <About />
        <Products setCursorVariant={setCursorVariant} />
        <Benefits />
        <VideoShowcase />
        <Story />
        <Partners />
        <Contact />
      </main>
      <Footer />
      <BackToTop />
    </>
  );
}

export default App;
