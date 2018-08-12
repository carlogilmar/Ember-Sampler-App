import Route from '@ember/routing/route';

export default Route.extend({
  model( beer ) {
    return this.get('store').findRecord('beer', beer.id);
  }
});
