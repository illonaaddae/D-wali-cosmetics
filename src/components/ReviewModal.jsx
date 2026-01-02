 import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const ReviewModal = ({ isOpen, onClose, onSubmitReview }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    rating: 5,
    title: "",
    review: "",
  });
  const [imagePreview, setImagePreview] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const fileInputRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleRatingChange = (rating) => {
    setFormData((prev) => ({
      ...prev,
      rating,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setError("Image size should be less than 5MB");
        return;
      }

      if (!file.type.startsWith("image/")) {
        setError("Please upload an image file");
        return;
      }

      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
      setError("");
    }
  };

  const removeImage = () => {
    setImagePreview(null);
    setImageFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      // Call the parent's submit function which will handle Appwrite
      await onSubmitReview({
        ...formData,
        imageFile,
      });

      setSubmitted(true);

      // Reset form after success
      setTimeout(() => {
        setFormData({
          name: "",
          email: "",
          rating: 5,
          title: "",
          review: "",
        });
        setImagePreview(null);
        setImageFile(null);
        setSubmitted(false);
        onClose();
      }, 3000);
    } catch (err) {
      setError(err.message || "Failed to submit review. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="review-modal-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleBackdropClick}
        >
          <motion.div
            className="review-modal"
            initial={{ opacity: 0, scale: 0.9, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 50 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
          >
            <button
              className="review-modal-close"
              onClick={onClose}
              aria-label="Close modal"
            >
              <i className="fas fa-times"></i>
            </button>

            <div className="review-modal-header">
              <h3>Share Your Experience</h3>
              <p>We'd love to hear about your journey with D-Wali products</p>
            </div>

            {submitted ? (
              <motion.div
                className="review-success"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                <div className="success-icon">
                  <i className="fas fa-check-circle"></i>
                </div>
                <h4>Thank You!</h4>
                <p>Your review has been submitted successfully.</p>
              </motion.div>
            ) : (
              <form className="review-form" onSubmit={handleSubmit}>
                {error && (
                  <div className="review-error">
                    <i className="fas fa-exclamation-circle"></i>
                    {error}
                  </div>
                )}

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="review-name">Your Name *</label>
                    <input
                      type="text"
                      id="review-name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Enter your name"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="review-email">Email Address *</label>
                    <input
                      type="email"
                      id="review-email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Enter your email"
                      required
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label>Your Rating *</label>
                  <div className="rating-input">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        className={`rating-star ${
                          formData.rating >= star ? "active" : ""
                        }`}
                        onClick={() => handleRatingChange(star)}
                        aria-label={`Rate ${star} stars`}
                      >
                        <i className={`fas fa-star`}></i>
                      </button>
                    ))}
                    <span className="rating-text">
                      {formData.rating === 1 && "Poor"}
                      {formData.rating === 2 && "Fair"}
                      {formData.rating === 3 && "Good"}
                      {formData.rating === 4 && "Very Good"}
                      {formData.rating === 5 && "Excellent"}
                    </span>
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="review-title">Review Title *</label>
                  <input
                    type="text"
                    id="review-title"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="Summarize your experience"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="review-text">Your Review *</label>
                  <textarea
                    id="review-text"
                    name="review"
                    value={formData.review}
                    onChange={handleChange}
                    placeholder="Tell us more about your experience with D-Wali products..."
                    rows={4}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Add a Photo (Optional)</label>
                  <div className="image-upload-area">
                    {imagePreview ? (
                      <div className="image-preview">
                        <img src={imagePreview} alt="Preview" />
                        <button
                          type="button"
                          className="remove-image"
                          onClick={removeImage}
                          aria-label="Remove image"
                        >
                          <i className="fas fa-times"></i>
                        </button>
                      </div>
                    ) : (
                      <label
                        className="upload-placeholder"
                        htmlFor="review-image"
                      >
                        <i className="fas fa-camera"></i>
                        <span>Click to upload your photo</span>
                        <small>Max size: 5MB</small>
                      </label>
                    )}
                    <input
                      type="file"
                      id="review-image"
                      ref={fileInputRef}
                      accept="image/*"
                      onChange={handleImageChange}
                      hidden
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="btn btn-primary review-submit"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <span className="spinner"></span>
                      Submitting...
                    </>
                  ) : (
                    <>
                      <i className="fas fa-paper-plane"></i>
                      Submit Review
                    </>
                  )}
                </button>
              </form>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ReviewModal;
