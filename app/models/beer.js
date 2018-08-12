import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr(),
  user: DS.attr(),
  price: DS.attr(),
  location: DS.attr(),
  description: DS.attr(),
  flavour: DS.attr(),
  rating: DS.attr('number'),
  container: DS.attr(),
  cup: DS.attr()
});
