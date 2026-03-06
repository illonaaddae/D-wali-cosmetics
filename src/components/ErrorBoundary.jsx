import { Component } from "react";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    // In production, you could send this to an error tracking service
    if (import.meta.env.DEV) {
      console.error("ErrorBoundary caught an error:", error, errorInfo);
    }
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-boundary">
          <div className="error-boundary-content">
            <i className="fas fa-exclamation-triangle"></i>
            <h3>Something went wrong</h3>
            <p>
              We're sorry, but something unexpected happened. Please try
              refreshing the page.
            </p>
            <button
              className="btn btn-primary"
              onClick={this.handleRetry}
            >
              <span>Try Again</span>
              <i className="fas fa-redo"></i>
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
