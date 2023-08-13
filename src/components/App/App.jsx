import React, { Component } from 'react';
import axios from 'axios';


const API_KEY = '37760459-bf670a4af420eae2f9d25b705';

class App extends Component {
  state = {
    query: '',
    images: [],
    page: 1,
    isLoading: false,
    showModal: false,
    largeImageUrl: '',
  };

  componentDidMount() {
    this.fetchImages();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.query !== this.state.query || prevState.page !== this.state.page) {
      this.fetchImages();
    }
  }

  fetchImages = async () => {
    const { query, page } = this.state;
    if (!query) return;

    this.setState({ isLoading: true });

    try {
      const response = await axios.get(
        `https://pixabay.com/api/?q=${query}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
      );
      const newImages = response.data.hits;

      this.setState((prevState) => ({
        images: page === 1 ? newImages : [...prevState.images, ...newImages],
      }));
    } catch (error) {
      console.error('Error fetching images:', error);
    } finally {
      this.setState({ isLoading: false });
    }
  };

  handleQueryChange = (query) => {
    this.setState({ query, page: 1 });
  };

  handleLoadMore = () => {
    this.setState((prevState) => ({ page: prevState.page + 1 }));
  };
 handleImageClick = (largeImageURL) => {
    this.setState({ largeImageUrl: largeImageURL, showModal: true }); 
  };

  handleCloseModal = () => {
    this.setState({ showModal: false });
  };

  render() {
    const { query, images, isLoading, showModal, largeImageUrl } = this.state;

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
              onChange={(e) => this.handleQueryChange(e.target.value)}
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
                onClick={() => this.handleImageClick(image.largeImageURL)}
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
          <button className="Button" onClick={this.handleLoadMore}>
            Load more
          </button>
        )}

        {showModal && (
          <div className="Overlay" onClick={this.handleCloseModal}>
            <div className="Modal">
              <img src={largeImageUrl} alt="" />
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default App;