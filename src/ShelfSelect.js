import React, { Component } from 'react';

class ShelfSelect extends Component {

  handleChange = (event) => {
    if (this.props.onChange && typeof this.props.onChange === 'function') {
      const shelf = event.target.value;
      this.props.onChange(shelf);
    }
  };

  render() {
    const { shelf } = this.props;
    const styleClasses = ['book-shelf-changer', `book-shelf-changer-${shelf}`];

    return (
      <div className={styleClasses.join(' ')}>
        <select value={shelf} onChange={this.handleChange}>
          <option value="none" disabled>Move to...</option>
          <option value="currentlyReading">Currently Reading</option>
          <option value="wantToRead">Want to Read</option>
          <option value="read">Read</option>
          <option value="none">None</option>
        </select>
      </div>
    );
  }
}

export default ShelfSelect;