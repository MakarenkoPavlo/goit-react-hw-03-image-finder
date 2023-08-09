import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './styles.css';

const API_KEY = '37760459-bf670a4af420eae2f9d25b705';

const App = () => {
  const [query, setQuery] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [largeImageUrl, setLargeImageUrl] = useState('');

  useEffect(() => {
    const fetchImages = async () => {
      if (!query) return;

      setIsLoading(true);

      try {
        const response = await axios.get(
          `https://pixabay.com/api/?q=${query}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
        );
        const newImages = response.data.hits;

        setImages((prevImages) => (page === 1 ? newImages : [...prevImages, ...newImages]));
      } catch (error) {
        console.error('Error fetching images:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchImages();
  }, [query, page]);

  const handleLoadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const handleImageClick = (largeImageURL) => {
    setLargeImageUrl(largeImageURL);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div className="App">
      <header className="Searchbar">
        <form className="SearchForm" onSubmit={(e) => e.preventDefault()}>
          <button type="submit" className="SearchForm-button">
            <span className="SearchForm-button-label">Search</span>
          </button>

          <input
            className="SearchForm-input"
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </form>
      </header>

      <ul className="ImageGallery">
        {images.map((image) => (
          <li className="ImageGalleryItem" key={image.id}>
            <img
              src={image.webformatURL}
              alt=""
              className="ImageGalleryItem-image"
              onClick={() => handleImageClick(image.largeImageURL)}
            />
          </li>
        ))}
      </ul>

      {isLoading && (
        <div className="Loader">
          <div className="Loader-spinner"></div>
        </div>
      )}

      {images.length > 0 && !isLoading && (
        <button className="Button" onClick={handleLoadMore}>
          Load more
        </button>
      )}

      {showModal && (
        <div className="Overlay" onClick={handleCloseModal}>
          <div className="Modal">
            <img src={largeImageUrl} alt="" />
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
