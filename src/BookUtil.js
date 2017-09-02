export const updateShelfStatus = (books, bookWithNewStatus, shelf) => {
  let updatedBooks = [];
  books.forEach(book => {
    if (book.id === bookWithNewStatus.id) {
      updatedBooks.push({
        ...book,
        shelf
      });
    } else {
      updatedBooks.push(book);
    }
  });
  return updatedBooks;
};