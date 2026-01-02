import { useState, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";
import { reviewsApi } from "../lib/appwrite";

const Reviews = ({ onOpenReviewModal }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const reviewsPerPage = 3;

  // Fetch reviews from Appwrite
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const data = await reviewsApi.getApproved();
        setReviews(data);
      } catch (error) {
        console.error("Error fetching reviews:", error);
        // Use placeholder reviews if fetch fails
        setReviews(placeholderReviews);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  // Placeholder reviews for display before real data
  const placeholderReviews = [
    {
      $id: "1",
      name: "Jennifer A.",
      rating: 5,
      title: "Life-changing skincare!",
      review:
        "I've tried countless anti-aging creams, but D-Wali is truly different. My skin feels softer, looks brighter, and the fine lines around my eyes have visibly reduced. Absolutely worth every penny!",
      imageId: null,
      createdAt: "2025-12-15T10:00:00.000Z",
    },
    {
      $id: "2",
      name: "Maria S.",
      rating: 5,
      title: "Best cream I've ever used",
      review:
        "After just two weeks of using D-Wali, I noticed a remarkable difference. My hands no longer look dry and aged. The cream absorbs quickly and leaves my skin feeling luxuriously smooth.",
      imageId: null,
      createdAt: "2025-12-20T14:30:00.000Z",
    },
    {
      $id: "3",
      name: "Patricia L.",
      rating: 5,
      title: "My daily essential",
      review:
        "D-Wali has become an essential part of my skincare routine. The moisturizing effect lasts all day, and I love the subtle, elegant fragrance. My friends keep asking what's my secret!",
      imageId: null,
      createdAt: "2025-12-28T09:15:00.000Z",
    },
  ];

  const displayReviews = reviews.length > 0 ? reviews : placeholderReviews;
  const totalPages = Math.ceil(displayReviews.length / reviewsPerPage);
  const currentReviews = displayReviews.slice(
    currentPage * reviewsPerPage,
    (currentPage + 1) * reviewsPerPage
  );

  const nextPage = () => {
    setCurrentPage((prev) => (prev + 1) % totalPages);
  };

  const prevPage = () => {
    setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);
  };

  const renderStars = (rating) => {
    return [...Array(5)].map((_, index) => (
      <i
        key={index}
        className={`fas fa-star ${index < rating ? "filled" : ""}`}
      ></i>
    ));
  };

  const getInitials = (name) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

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
