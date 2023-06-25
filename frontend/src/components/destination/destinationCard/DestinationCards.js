import React, { useEffect, useState, useRef } from "react";
import "./DestinationCards.scss";
import { SpinnerImg } from "../../loader/Loader";
import Search from "../../search/Search";
import { useDispatch, useSelector } from "react-redux";
import {
  FILTER_DESTINATIONS,
  selectFilteredDestinations,
} from "../../../redux/features/destination/filterSlice";
import ReactPaginate from "react-paginate";
import DOMPurify from "dompurify";

const DestinationCards = ({ destinations, isLoading }) => {
  const [search, setSearch] = useState("");
  const [selectedCard, setSelectedCard] = useState(null);
  const [isCardExpanded, setIsCardExpanded] = useState(false);

  const filteredDestinations = useSelector(selectFilteredDestinations);

  const dispatch = useDispatch();

  const shortenText = (text, n, isExpanded) => {
    if (!isExpanded && text.length > n) {
      const shortenedText = text.substring(0, n).concat("...");
      return shortenedText;
    }
    return text;
  };

  // Begin Pagination
  const [currentItems, setCurrentItems] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 6;

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;

    setCurrentItems(filteredDestinations.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(filteredDestinations.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, filteredDestinations]);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % filteredDestinations.length;
    setItemOffset(newOffset);
  };
  // End Pagination

  useEffect(() => {
    dispatch(FILTER_DESTINATIONS({ destinations, search }));
  }, [destinations, search, dispatch]);

  const handleCardClick = (cardId) => {
    setSelectedCard(cardId);
    setIsCardExpanded(!isCardExpanded);
  };

  const cardRef = useRef(null);

  useEffect(() => {
    if (isCardExpanded && cardRef.current) {
      cardRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [isCardExpanded]);

  return (
    <div className={`destination-cards ${isCardExpanded ? "expanded" : ""}`}>
      <div className="header">
        <h3 className="title">Destinations</h3>
        <div className="subtitle">
          <Search value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
      </div>
      <hr />
      <div className="destination-list">
        {isLoading && <SpinnerImg />}

        {!isLoading && destinations.length === 0 ? (
          <p>No destinations found.</p>
        ) : (
          currentItems.map((destination, index) => {
            const { _id, name, country, things_to_do, description, image } = destination;
            const isCardSelected = selectedCard === _id;
            const destinationWithCountry = country ? `${name}, ${country}` : name;
          
            return (
              <div
                className={`card ${isCardSelected ? "selected" : ""}`}
                key={_id}
                onClick={() => handleCardClick(_id)}
                ref={isCardSelected ? cardRef : null}
              >
                <img
                  src={image.filePath}
                  alt={image.fileName}
                  className="card-image"
                />
                <div className="card-content">
                  <h3 className="card-title">{shortenText(destinationWithCountry, 30, isCardExpanded)}</h3>
                  <p><b>Recommended activities:</b></p>
                  <p className="card-things-to-do">
                    <div
                      dangerouslySetInnerHTML={{
                        __html: DOMPurify.sanitize(shortenText(things_to_do, 400, isCardExpanded)),
                      }}
                    ></div>
                  </p>
                  {isCardExpanded && isCardSelected && (
                    <p className="card-description">
                      <p><b>Description :</b></p>
                      <div
                        dangerouslySetInnerHTML={{
                          __html: DOMPurify.sanitize(description),
                        }}
                      ></div>
                    </p>
                  )}
                </div>
              </div>
            );
          })
          
        )}
      </div>
      <ReactPaginate
        breakLabel="..."
        nextLabel="Next"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        previousLabel="Prev"
        renderOnZeroPageCount={null}
        containerClassName="pagination"
        pageLinkClassName="page-num"
        previousLinkClassName="page-num"
        nextLinkClassName="page-num"
        activeLinkClassName="activePage"
      />
    </div>
  );
};

export default DestinationCards;


