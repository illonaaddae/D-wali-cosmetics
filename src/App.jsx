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
import ClientGallery from "./components/ClientGallery";
import Reviews from "./components/Reviews";
import ReviewModal from "./components/ReviewModal";
import Partners from "./components/Partners";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import BackToTop from "./components/BackToTop";
import { reviewsApi } from "./lib/appwrite";

function App() {
  const [loading, setLoading] = useState(true);
  const [cursorVariant, setCursorVariant] = useState("default");
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  const handleOpenReviewModal = () => {
    setIsReviewModalOpen(true);
  };

  const handleCloseReviewModal = () => {
    setIsReviewModalOpen(false);
  };

  const handleSubmitReview = async (reviewData) => {
    try {
      let imageId = "";

      // Upload image if provided
      if (reviewData.imageFile) {
        imageId = await reviewsApi.uploadImage(reviewData.imageFile);
      }

      // Create review in database
      await reviewsApi.create({
        name: reviewData.name,
        email: reviewData.email,
        rating: reviewData.rating,
        title: reviewData.title,
        review: reviewData.review,
        imageId,
      });

      return true;
    } catch (error) {
      console.error("Failed to submit review:", error);
      throw new Error("Failed to submit review. Please try again.");
    }
  };

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
        <ClientGallery />
        <Reviews onOpenReviewModal={handleOpenReviewModal} />
        <Partners />
        <Contact />
      </main>
      <Footer />
      <BackToTop />
      <ReviewModal
        isOpen={isReviewModalOpen}
        onClose={handleCloseReviewModal}
        onSubmitReview={handleSubmitReview}
      />
    </>
  );
}

export default App;
