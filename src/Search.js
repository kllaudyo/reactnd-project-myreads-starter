import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types'
import Book from './Book'
import {search} from "./BooksAPI"

/** Class Representa o componente Search. */
class Search extends Component{

  constructor(){
    super();
    this.timming_id = null;
    this.state = {
      books : []
    }
  }

  updateQuery = (query) => {
    query = query.trim();

    this.clearTimming();

    if(query.length > 0){
      this.timming_id = setTimeout(()=>{
        search(query, 10)
          .then(books => {
            if(Array.isArray(books)) {
              this.setState({books: books})
            } else {
              this.clearQuery()
            }
          }).catch(() => this.clearQuery())
      }, 300)
    }else{
      this.clearQuery();
    }
  };

  clearQuery = () => {
    this.setState({books:[]})
  };

  clearTimming = () => {
    if(this.timming_id !== null)
      clearTimeout(this.timming_id)
  };

  static renderBar(onChangeQuery) {
    return (
      <div className="search-books-bar">
        <Link to="/" className="close-search" >Close</Link>
        <div className="search-books-input-wrapper">
          <input type="text" placeholder="Search by title or author" onChange={event => onChangeQuery(event.target.value)} />
        </div>
      </div>
    );
  }

  static renderResult(books, getShelf, onChangeShelf) {
    return (
      <div className="search-books-results">
        <ol className="books-grid">
          {books.map(book => (
              <li key={book.id}>
                <Book id={book.id}
                      title={book.title}
                      authors={book.authors?book.authors:[]}
                      cover={book.imageLinks.smallThumbnail}
                      shelf={getShelf(book.id)}
                      onChangeShelf={onChangeShelf}
                />
              </li>
            )
          )}
        </ol>
      </div>
    );
  }

  render(){
    const {onChangeShelf, getShelf} = this.props;
    return (
      <div className="search-books">
        {Search.renderBar(this.updateQuery)}
        {Search.renderResult(this.state.books, getShelf, onChangeShelf)}
      </div>
    )
  }

}

Search.propTypes = {
  onChangeShelf : PropTypes.func.isRequired,
  getShelf: PropTypes.func.isRequired
};

export default Search;