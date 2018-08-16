export default function() {
  this.get('/beers');
  this.get('/beers/:id');
  this.post('/beers');
}
