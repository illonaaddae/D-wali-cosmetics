import { useState, useEffect, useCallback, lazy, Suspense } from "react";
import CustomCursor from "../components/CustomCursor";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import ErrorBoundary from "../components/ErrorBoundary";
import { reviewsApi } from "../lib/appwrite";
import { PRELOADER_DURATION_MS } from "../constants";

// Lazy-load below-the-fold sections
const About = lazy(() => import("../components/About"));
const Products = lazy(() => import("../components/Products"));
const Benefits = lazy(() => import("../components/Benefits"));
const VideoShowcase = lazy(() => import("../components/VideoShowcase"));
const Story = lazy(() => import("../components/Story"));
const ClientGallery = lazy(() => import("../components/ClientGallery"));
const Reviews = lazy(() => import("../components/Reviews"));
const ReviewModal = lazy(() => import("../components/ReviewModal"));
const Partners = lazy(() => import("../components/Partners"));
const Contact = lazy(() => import("../components/Contact"));
const Footer = lazy(() => import("../components/Footer"));
const BackToTop = lazy(() => import("../components/BackToTop"));

const SectionLoader = () => (
  <div className="section-loader">
    <div className="spinner"></div>
  </div>
);

function HomePage() {
  const [cursorVariant, setCursorVariant] = useState("default");
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);

  const handleOpenReviewModal = useCallback(() => {
    setIsReviewModalOpen(true);
  }, []);

  const handleCloseReviewModal = useCallback(() => {
    setIsReviewModalOpen(false);
  }, []);

  const handleSubmitReview = useCallback(async (reviewData) => {
    try {
      let imageId = "";
      if (reviewData.imageFile) {
        imageId = await reviewsApi.uploadImage(reviewData.imageFile);
      }
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
      throw new Error("Failed to submit review. Please try again.");
    }
  }, []);

  return (
    <>
      <CustomCursor variant={cursorVariant} />
      <Navbar />
      <ErrorBoundary>
        <main>
          <Hero setCursorVariant={setCursorVariant} />
          <Suspense fallback={<SectionLoader />}>
            <About />
            <Products setCursorVariant={setCursorVariant} />
            <Benefits />
            <VideoShowcase />
            <Story />
            <ClientGallery />
            <Reviews onOpenReviewModal={handleOpenReviewModal} />
            <Partners />
            <Contact />
          </Suspense>
        </main>
        <Suspense fallback={null}>
          <Footer />
          <BackToTop />
          <ReviewModal
            isOpen={isReviewModalOpen}
            onClose={handleCloseReviewModal}
            onSubmitReview={handleSubmitReview}
          />
        </Suspense>
      </ErrorBoundary>
    </>
  );
}

export default HomePage;
