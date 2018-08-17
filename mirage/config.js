export default function() {
  this.get('/beers');
  this.get('/beers/:id');
  this.post('/beers');
  this.get('users/current', () => {
    return {
      username: 'carlogilmar',
    };
  });
}
