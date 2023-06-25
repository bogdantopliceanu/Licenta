/*
import React, { useEffect, useState } from 'react';
import DOMPurify from 'dompurify';
import { getUser, getUsersWithSimilarPreferences, getNotCommonDestinations } from '../../services/authService';
import { useDispatch, useSelector } from 'react-redux';
import { getDestinations } from '../../redux/features/destination/destinationSlice';
import './Recommendations.scss';

const Recommendations = () => {
  const [currentUserDestinations, setCurrentUserDestinations] = useState([]);
  const [similarUsers, setSimilarUsers] = useState([]);
  const [notCommonDestinations, setNotCommonDestinations] = useState([]);
  const [destinationAverages, setDestinationAverages] = useState({});
  const allDestinations = useSelector((state) => state.destination.destinations);
  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchCurrentUserDestinations() {
      const currentUser = await getUser();
      setCurrentUserDestinations(currentUser.destinations);
    }
    fetchCurrentUserDestinations();
  }, []);

  useEffect(() => {
    dispatch(getDestinations());
  }, [dispatch]);

  useEffect(() => {
    if (currentUserDestinations.length > 0) {
      const getRecommendations = async () => {
        const usersWithSimilarPreferences = await getUsersWithSimilarPreferences();
        const notCommonDestinationsResponse = await getNotCommonDestinations();

        const similarityCoefficients = usersWithSimilarPreferences.map((user) => {
          const { name, destinations, coefficient } = user;
          const commonDestinations = destinations.filter((destination) =>
            currentUserDestinations.some(
              (currentUserDestination) => currentUserDestination.destination === destination.destination
            )
          );

          return {
            name,
            coefficient,
            commonDestinations,
          };
        });

        const updatedNotCommonDestinations = notCommonDestinationsResponse.map((user) => {
          const { name, destinations } = user;
          const updatedDestinations = destinations.map((destination) => {
            const matchingUser = similarityCoefficients.find((user) => user.name === name);
            if (matchingUser) {
              const matchingCommonDestination = matchingUser.commonDestinations.find(
                (commonDest) => commonDest.destination === destination.destination
              );
              if (!matchingCommonDestination) {
                const updatedRating = destination.rating * matchingUser.coefficient;
                return {
                  ...destination,
                  rating: updatedRating,
                };
              }
            }
            return destination;
          });
          return {
            name,
            destinations: updatedDestinations,
          };
        });

        const newDestinationAverages = {};

        updatedNotCommonDestinations.forEach((user) => {
          user.destinations.forEach((destination) => {
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
        });

        Object.keys(newDestinationAverages).forEach((destination) => {
          newDestinationAverages[destination].averageRating =
            newDestinationAverages[destination].totalRating / newDestinationAverages[destination].count;
        });

        setSimilarUsers(similarityCoefficients);
        setNotCommonDestinations(updatedNotCommonDestinations);
        setDestinationAverages(newDestinationAverages);
      };

      getRecommendations();
    }
  }, [currentUserDestinations]);

  return (
    <div>
      <h2>Current User Destinations</h2>
      {currentUserDestinations.map((destination, index) => (
        <div key={index}>
          <p>
            <b>Destination:</b> {destination.destination}
          </p>
          <p>
            <b>Rating:</b> {destination.rating}
          </p>
        </div>
      ))}
      <h2>Recommended Destinations</h2>
      {similarUsers.map((user, index) => (
        <div key={index}>
          <p>
            <b>Name:</b> {user.name}
          </p>
          <p>
            <b>Similarity Coefficient:</b> {user.coefficient}
          </p>
          <p>
            <b>Common Destinations:</b>
          </p>
          {user.commonDestinations.map((destination, index) => (
            <div key={index}>
              <p>
                <b>Destination:</b> {destination.destination}
              </p>
              <p>
                <b>Rating:</b> {destination.rating}
              </p>
            </div>
          ))}
          <hr />
        </div>
      ))}
      <h2>Not Common Destinations</h2>
      {notCommonDestinations.length > 0 ? (
        notCommonDestinations.map((user, index) => (
          <div key={index}>
            <p>
              <b>User:</b> {user.name}
            </p>
            {user.destinations.map((destination, index) => (
              <div key={index}>
                <p>
                  <b>Destination:</b> {destination.destination}
                </p>
                <p>
                  <b>Rating:</b>{' '}
                  <span
                    className="rating"
                    style={{
                      color: (() => {
                        if (destination.rating >= 8 && destination.rating <= 10) {
                          return 'green';
                        } else if (destination.rating >= 6 && destination.rating < 8) {
                          return 'yellow';
                        } else if (destination.rating > 0 && destination.rating < 6) {
                          return 'red';
                        } else {
                          return 'black';
                        }
                      })(),
                    }}
                  >
                    {destination.rating}
                  </span>
                </p>
              </div>
            ))}
          </div>
        ))
      ) : (
        <p>No not common destinations found.</p>
      )}
      <h2>Average Ratings for Not Common Destinations</h2>
      {Object.keys(destinationAverages)
        .sort(
          (a, b) => destinationAverages[b].averageRating - destinationAverages[a].averageRating
        )
        .map((destinationName, index) => {
          const matchedDestination = allDestinations.find((dest) => dest.name === destinationName);
          const textColor =
            destinationAverages[destinationName].averageRating > 8 && destinationAverages[destinationName].averageRating < 10
              ? 'green'
              : destinationAverages[destinationName].averageRating > 6 &&
                destinationAverages[destinationName].averageRating < 8
              ? 'yellow'
              : destinationAverages[destinationName].averageRating > 0 &&
                destinationAverages[destinationName].averageRating < 6
              ? 'red'
              : 'black';

          if (matchedDestination) {
            return (
              <div key={index}>
                <p>
                  <b>Destination:</b> {matchedDestination.name}
                </p>
                <p>
                  <b>Average Rating:</b>{' '}
                  <span className="rating" style={{ color: textColor }}>
                    {destinationAverages[destinationName].averageRating}
                  </span>
                </p>
                <img
                  src={matchedDestination.image.filePath}
                  alt={matchedDestination.image.fileName}
                  className="image-container"
                />
                <p>
                  <b>Description:</b>{' '}
                  <div
                    dangerouslySetInnerHTML={{
                      __html: DOMPurify.sanitize(matchedDestination.description),
                    }}
                  ></div>
                </p>
                <p>
                  <b>Recommended activities:</b>{' '}
                  <div
                    dangerouslySetInnerHTML={{
                      __html: DOMPurify.sanitize(matchedDestination.things_to_do),
                    }}
                  ></div>
                </p>
              </div>
            );
          } else {
            return (
              <div key={index}>
                <p>
                  <b>Destination:</b> {destinationName}
                </p>
                <p>
                  <b>Average Rating:</b>{' '}
                  <span className="rating" style={{ color: textColor }}>
                    {destinationAverages[destinationName].averageRating}
                  </span>
                </p>
              </div>
            );
          }
        })}
    </div>
  );
};

export default Recommendations;
*/












import React, { useEffect, useState } from 'react';
import DOMPurify from 'dompurify';
import { getUser, getUsersWithSimilarPreferences, getNotCommonDestinations } from '../../services/authService';
import { useDispatch, useSelector } from 'react-redux';
import { getDestinations } from '../../redux/features/destination/destinationSlice';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Recommendations.scss';

const Recommendations = () => {
  const [destinationAverages, setDestinationAverages] = useState({});
  const allDestinations = useSelector((state) => state.destination.destinations);
  const dispatch = useDispatch();
  const [isErrorDisplayed, setIsErrorDisplayed] = useState(false);

  useEffect(() => {
    async function fetchCurrentUserDestinations() {
      const currentUser = await getUser();
      const currentUserDestinations = currentUser.destinations;
      
      if (currentUserDestinations.length >= 3) {
        const usersWithSimilarPreferences = await getUsersWithSimilarPreferences();
        const notCommonDestinationsResponse = await getNotCommonDestinations();

        const similarityCoefficients = usersWithSimilarPreferences.map((user) => {
          const { name, destinations, coefficient } = user;
          const commonDestinations = destinations.filter((destination) =>
            currentUserDestinations.some(
              (currentUserDestination) => currentUserDestination.destination === destination.destination
            )
          );

          return {
            name,
            coefficient,
            commonDestinations,
          };
        });

        const updatedNotCommonDestinations = notCommonDestinationsResponse.map((user) => {
          const { name, destinations } = user;
          const updatedDestinations = destinations.map((destination) => {
            const matchingUser = similarityCoefficients.find((user) => user.name.toLowerCase() === name.toLowerCase());
            if (matchingUser) {
              const matchingCommonDestination = matchingUser.commonDestinations.find(
                (commonDest) => commonDest.destination === destination.destination
              );
              if (!matchingCommonDestination) {
                const updatedRating = destination.rating * matchingUser.coefficient;
                return {
                  ...destination,
                  rating: updatedRating,
                };
              }
            }
            return destination;
          });
          return {
            name,
            destinations: updatedDestinations,
          };
        });

        const newDestinationAverages = {};

        updatedNotCommonDestinations.forEach((user) => {
          user.destinations.forEach((destination) => {
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
        });

        Object.keys(newDestinationAverages).forEach((destination) => {
          newDestinationAverages[destination].averageRating =
            newDestinationAverages[destination].totalRating / newDestinationAverages[destination].count;
        });

        setDestinationAverages(newDestinationAverages);
      } else {
        if (!isErrorDisplayed) {
          toast.info('You need to have at least 3 destinations in your list.', {
            position: toast.POSITION.TOP_RIGHT,
          });
          setIsErrorDisplayed(true);
        }
      }
    };

    fetchCurrentUserDestinations();
    dispatch(getDestinations());
  }, [isErrorDisplayed, dispatch]);

  return (
    <div className="frame">
      <h2>Personalized destination recommendations based on your preferences</h2>
      {Object.keys(destinationAverages)
        .sort((a, b) => destinationAverages[b].averageRating - destinationAverages[a].averageRating)
        .map((destinationName, index) => {
          const matchedDestination = allDestinations.find((dest) => dest.name === destinationName);
          const textColor =
            destinationAverages[destinationName]?.averageRating >= 8 && destinationAverages[destinationName]?.averageRating <= 10
              ? 'green'
              : destinationAverages[destinationName]?.averageRating >= 6 &&
                destinationAverages[destinationName]?.averageRating < 8
              ? 'yellow'
              : destinationAverages[destinationName]?.averageRating >= 0 &&
                destinationAverages[destinationName]?.averageRating < 6
              ? 'red'
              : 'black';

          if (matchedDestination) {
            return (
              <div key={index} className="frame-container">
                <p>
                  <b>Destination:</b> {matchedDestination.name}
                </p>
                <p>
                  <b>Average Rating:</b>{' '}
                  <span className={`rating ${textColor}`}>
                    {destinationAverages[destinationName]?.averageRating.toFixed(1)}
                  </span>
                </p>
                <img
                  src={matchedDestination.image.filePath}
                  alt={matchedDestination.image.fileName}
                  className="image-container"
                />
                <p>
                  <b>Description:</b>{' '}
                  <div
                    dangerouslySetInnerHTML={{
                      __html: DOMPurify.sanitize(matchedDestination.description),
                    }}
                  ></div>
                </p>
                <p>
                  <b>Recommended activities:</b>{' '}
                  <div
                    dangerouslySetInnerHTML={{
                      __html: DOMPurify.sanitize(matchedDestination.things_to_do),
                    }}
                  ></div>
                </p>
              </div>
            );
          } else {
            return (
              <div key={index} className="frame-container">
                <p>
                  <b>Destination:</b> {destinationName}
                </p>
                <p>
                  <b>Average Rating:</b>{' '}
                  <span className={`rating ${textColor}`}>
                    {destinationAverages[destinationName]?.averageRating.toFixed(1)}
                  </span>
                </p>
              </div>
            );
          }
        })}
    </div>
  );
};

export default Recommendations;
