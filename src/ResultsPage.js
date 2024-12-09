import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

function ResultsPage() {
  const location = useLocation();
  const entertainment = useLocation();
  const dollar = useLocation();
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const city = location.state?.answers?.q3; // Get the location from the passed state
  const thingToDo = entertainment.state?.answers?.q5;
  const price = dollar.state?.answers?.q2;
  const numberOfResults = location.state?.answers?.q4 || 10; // Default to 10 if q4 is not defined

  useEffect(() => {
    if (!city || !thingToDo) return; // If no location or activity, do not fetch

    const fetchResults = async () => {
      setLoading(true);
      setError(null);

      const apiUrl = `https://api.yelp.com/v3/businesses/search?term=${thingToDo}&location=${city}&price=${price}&limit=${numberOfResults}`;

      try {
        const response = await fetch(apiUrl, {
          headers: {
            Authorization: `Bearer oPlbd-ZSfVp_6tJ6ZfdKsAnbCFVEFYI1P76olE2LGpJ95jyhKe8sD-R_WdRFhHBTQDKbKP5b_uBimjjc0Gcd9HOkUcDmxCbwC_H9tvwcSBRjjrDx6SI6msDwsXVWZ3Yx`, // Replace with your Yelp API key
          },
        });

        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }

        const data = await response.json();
        const businesses = data.businesses || [];

        // Fetch reviews for each business
        const businessesWithReviews = await Promise.all(
          businesses.map(async (business) => {
            const reviewResponse = await fetch(`https://api.yelp.com/v3/businesses/${business.id}/reviews`, {
              headers: {
                Authorization: `Bearer oPlbd-ZSfVp_6tJ6ZfdKsAnbCFVEFYI1P76olE2LGpJ95jyhKe8sD-R_WdRFhHBTQDKbKP5b_uBimjjc0Gcd9HOkUcDmxCbwC_H9tvwcSBRjjrDx6SI6msDwsXVWZ3Yx`,
              },
            });

            const reviewData = await reviewResponse.json();
            const reviews = reviewData.reviews || [];
            const containsDate = reviews.some((review) => review.text.toLowerCase().includes('date'));
            const containsFriends = reviews.some((review) => review.text.toLowerCase().includes('friends'));

            return {
              ...business,
              containsDate,
              containsFriends,
            };
          })
        );

        // Sort businesses: prioritize those with reviews mentioning "date" or "friends"
        businessesWithReviews.sort((a, b) => {
          if (a.containsDate || a.containsFriends) return -1;
          if (b.containsDate || b.containsFriends) return 1;
          return 0;
        });

        setResults(businessesWithReviews);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [city, thingToDo, price, numberOfResults]); // Include numberOfResults in the dependency array

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: Can't find a plan for your specific need! Try again. {error}</div>;

  return (
    <div className="results-container">
      <h1>Recommended Entertainment in {city}</h1>
      {results.length > 0 ? (
        <ul>
          {results.map((business) => (
            <li key={business.id} className="business-item">
              {business.image_url && (
                <img src={business.image_url} alt={business.name} className="business-image" />
              )}
              <h2>{business.name}</h2>
              <p>Rating: {business.rating}</p>
              <p>Address: {business.location.address1}, {business.location.city}</p>
              <p>Phone: {business.display_phone}</p>
              <a href={business.url} target="_blank" rel="noopener noreferrer">View on Yelp</a>
            </li>
          ))}
        </ul>
      ) : (
        <p>No results found. Please try different criteria.</p>
      )}
    </div>
  );
}

export default ResultsPage;
