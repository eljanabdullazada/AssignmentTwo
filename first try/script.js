const endpoint = 'https://dummyjson.com/products';

fetch(endpoint)
  .then(response => {
    if (!response.ok) {
      throw new Error('Problem with network response occured');
    }
    return response.json();
  })
  .then(data => {
    console.log('Fetched data:', data);
  })
  .catch(error => {
    console.error('Error fetching data:', error);
  });
