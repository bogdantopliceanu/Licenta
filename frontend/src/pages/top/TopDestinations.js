import React, { useEffect, useState } from 'react';
import { getUsersDestinations } from '../../services/authService';
import DOMPurify from 'dompurify';
import { useSelector, useDispatch } from 'react-redux';
import { getDestinations } from '../../redux/features/destination/destinationSlice';
import './TopDestinations.scss'; // Import the SCSS file

const TopDestinations = () => {
  const [destinationAverages, setDestinationAverages] = useState({});
  const destinations = useSelector((state) => state.destination.destinations);
  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchAllDestinations() {
      const destinations = await getUsersDestinations();
      setDestinationAverages(calculateDestinationAverages(destinations));
    }
    fetchAllDestinations();
  }, []);

  useEffect(() => {
    async function fetchDestinations() {
      await dispatch(getDestinations());
    }
    fetchDestinations();
  }, [dispatch]);

  const calculateDestinationAverages = (destinations) => {
    const newDestinationAverages = {};
    destinations.forEach(destination => {
      if (!newDestinationAverages[destination.destination]) {
        newDestinationAverages[destination.destination] = {
          count: 1,
          totalRating: destination.rating,
        };
      } else {
        newDestinationAverages[destination.destination].count++;
        newDestinationAverages[destination.destination].totalRating += destination.rating;
      }
    });

    Object.keys(newDestinationAverages).forEach(destination => {
      newDestinationAverages[destination].averageRating =
        newDestinationAverages[destination].totalRating / newDestinationAverages[destination].count;
    });

    return newDestinationAverages;
  };

  const applyTextColor = (value) => {
    if (value >= 8 && value <= 10) {
      return 'green';
    } else if (value >= 6 && value < 8) {
      return '#dd9b22';
    } else if (value >= 0 && value < 6) {
      return 'red';
    } else {
      return 'black';
    }
  };

  const sortDestinations = (destinations) => {
    return destinations.sort((a, b) => {
      // Sort by average rating in descending order
      if (destinationAverages[b]?.averageRating !== destinationAverages[a]?.averageRating) {
        return destinationAverages[b]?.averageRating - destinationAverages[a]?.averageRating;
      }
      // If average ratings are equal, sort by count in descending order
      return destinationAverages[b]?.count - destinationAverages[a]?.count;
    });
  };

  const sortedDestinations = sortDestinations(Object.keys(destinationAverages));

  return (
    <div className="top-destinations">
      <h2>Top Destinations</h2>
      {sortedDestinations.map((destinationName) => {
        const averageRating = destinationAverages[destinationName]?.averageRating;
        const textColor = applyTextColor(averageRating);
        const matchedDestination = destinations.find((dest) => dest.name.toLowerCase() === destinationName.toLowerCase());

        return (
          <div key={destinationName} className="code-frame">
            <p>
              <b>Destination:</b> {destinationName}
            </p>
            <p>
              <b>Average Rating:</b>{' '}
              <span style={{ color: textColor }}>{averageRating || 'N/A'}</span>
            </p>
            {matchedDestination ? (
              <>
                <img
                  src={matchedDestination.image.filePath}
                  alt={matchedDestination.image.fileName}
                  className="image-container"
                />
                <p>
                  <b>Description:</b>{' '}
                  <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(matchedDestination.description) }}></div>
                </p>
                <br></br>
                <p>
                  <b>Recommended activities:</b>{' '}
                  <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(matchedDestination.things_to_do) }}></div>
                </p>
              </>
            ) : (
              <p>No additional details available for this destination.</p>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default TopDestinations;
