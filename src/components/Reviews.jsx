import { useState, useEffect, useCallback, useMemo } from "react";
import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";
import { reviewsApi } from "../lib/appwrite";
import { PLACEHOLDER_REVIEWS, REVIEWS_PER_PAGE } from "../constants";

const Reviews = ({ onOpenReviewModal }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);

  // Fetch reviews from Appwrite
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const data = await reviewsApi.getApproved();
        setReviews(data);
      } catch {
        // Fallback to placeholder reviews if fetch fails
        setReviews(PLACEHOLDER_REVIEWS);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  const displayReviews = useMemo(
    () => (reviews.length > 0 ? reviews : PLACEHOLDER_REVIEWS),
    [reviews]
  );

  const totalPages = useMemo(
    () => Math.ceil(displayReviews.length / REVIEWS_PER_PAGE),
    [displayReviews.length]
  );

  const currentReviews = useMemo(
    () =>
      displayReviews.slice(
        currentPage * REVIEWS_PER_PAGE,
        (currentPage + 1) * REVIEWS_PER_PAGE
      ),
    [displayReviews, currentPage]
  );

  const nextPage = useCallback(() => {
    setCurrentPage((prev) => (prev + 1) % totalPages);
  }, [totalPages]);

  const prevPage = useCallback(() => {
    setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);
  }, [totalPages]);

  const renderStars = useCallback((rating) => {
    return [...Array(5)].map((_, index) => (
      <i
        key={index}
        className={`fas fa-star ${index < rating ? "filled" : ""}`}
      ></i>
    ));
  }, []);

  const getInitials = useCallback((name) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  }, []);

  const formatDate = useCallback((dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  }, []);

  return (
    <section className="reviews" id="reviews" ref={ref}>
      <div className="reviews-bg"></div>
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="section-subtitle">Testimonials</span>
          <h2 className="section-title">What Our Customers Say</h2>
          <p className="section-description">
            Discover why thousands of customers trust D-Wali for their skincare
            needs.
          </p>
        </motion.div>

        <motion.div
          className="reviews-container"
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {loading ? (
            <div className="reviews-loading">
              <div className="spinner"></div>
              <p>Loading reviews...</p>
            </div>
          ) : (
            <>
              <div className="reviews-grid">
                {currentReviews.map((review, index) => (
                  <motion.div
                    key={review.$id}
                    className="review-card"
                    initial={{ opacity: 0, y: 30 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.1 * index }}
                  >
                    <div className="review-header">
                      <div className="review-avatar">
                        {review.imageId ? (
                          <img
                            src={reviewsApi.getImageUrl(review.imageId)}
                            alt={review.name}
                          />
                        ) : (
                          <span className="avatar-initials">
                            {getInitials(review.name)}
                          </span>
                        )}
                      </div>
                      <div className="review-meta">
                        <h4 className="review-author">{review.name}</h4>
                        <div className="review-rating">
                          {renderStars(review.rating)}
                        </div>
                      </div>
                      <div className="review-date">
                        {formatDate(review.createdAt)}
                      </div>
                    </div>
                    <h5 className="review-title">{review.title}</h5>
                    <p className="review-text">{review.review}</p>
                    <div className="review-verified">
                      <i className="fas fa-check-circle"></i>
                      Verified Purchase
                    </div>
                  </motion.div>
                ))}
              </div>

              {totalPages > 1 && (
                <div className="reviews-pagination">
                  <button
                    className="pagination-btn"
                    onClick={prevPage}
                    aria-label="Previous reviews"
                  >
                    <i className="fas fa-chevron-left"></i>
                  </button>
                  <div className="pagination-dots">
                    {[...Array(totalPages)].map((_, index) => (
                      <button
                        key={index}
                        className={`pagination-dot ${
                          index === currentPage ? "active" : ""
                        }`}
                        onClick={() => setCurrentPage(index)}
                        aria-label={`Go to page ${index + 1}`}
                      />
                    ))}
                  </div>
                  <button
                    className="pagination-btn"
                    onClick={nextPage}
                    aria-label="Next reviews"
                  >
                    <i className="fas fa-chevron-right"></i>
                  </button>
                </div>
              )}
            </>
          )}
        </motion.div>

        {/* CTA to write review */}
        <motion.div
          className="reviews-cta"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <p>Have you tried D-Wali? Share your experience!</p>
          <button className="btn btn-primary" onClick={onOpenReviewModal}>
            <i className="fas fa-pen"></i>
            Write a Review
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default Reviews;
