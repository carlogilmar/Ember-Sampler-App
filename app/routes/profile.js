import Route from '@ember/routing/route';
import RSVP from 'rsvp';

export default Route.extend({
  model(params){
    return RSVP.hash({
      currentUser: params.username,
      beers: this.get('store').query('beer', {username: params.username})
    });
  },
});
