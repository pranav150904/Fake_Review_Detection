// App.js
import React, { useState } from 'react'; // Only one import statement
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'; // Ensure this file exists

function App() {
  const [reviews, setReviews] = useState([]);
  const [inputReview, setInputReview] = useState('');
  const [isFake, setIsFake] = useState(null); // Store detection result

  const detectFakeReview = (review) => {
    const keywords = ['fake', 'spam', 'scam'];
    return keywords.some((word) => review.toLowerCase().includes(word));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const reviewText = inputReview.trim();
    if (!reviewText) {
      setIsFake(null);
      return;
    }

    const fake = detectFakeReview(reviewText);
    const newReview = { text: reviewText, fake };
    setReviews((prevReviews) => [...prevReviews, newReview]);

    setIsFake(fake);
    setInputReview('');
  };

  return (
    <div className="container">
      <h1>Fake Review Detection App</h1>
      <link
  rel="stylesheet"
  href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css"
/>


      {/* Review Input Form */}
      <form onSubmit={handleSubmit} className="mb-4">
        <div className="mb-3">
          <label htmlFor="reviewInput" className="form-label text-light">
            Enter Review:
          </label>
          <textarea
            id="reviewInput"
            className="form-control"
            rows="4"
            maxLength="500"
            value={inputReview}
            onChange={(e) => setInputReview(e.target.value)}
            placeholder="Type your review here..."
            required
          ></textarea>
        </div>
        <button type="submit" className="btn">Analyze Review</button>
      </form>

      {/* Alert to show detection result */}
      {isFake !== null && (
        <div className={`alert ${isFake ? 'alert-danger' : 'alert-success'}`}>
          {isFake ? '⚠️ Fake Review Detected!' : '✅ Review is Genuine!'}
        </div>
      )}

      {/* Review Table */}
      {reviews.length > 0 && (
        <table className="table table-striped table-hover mt-4">
          <thead className="table-dark">
            <tr>
              <th>#</th>
              <th>Review</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {reviews.map((review, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{review.text}</td>
                <td>
                  <span
                    className={`badge ${
                      review.fake ? 'bg-danger' : 'bg-success'
                    }`}
                  >
                    {review.fake ? 'Fake' : 'Genuine'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default App;
