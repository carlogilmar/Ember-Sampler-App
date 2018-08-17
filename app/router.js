import EmberRouter from '@ember/routing/router';
import config from './config/environment';

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('profile', {path: '/:username'});
  this.route('user');
  this.route('bar');
  this.route('beer', {path: 'beer/:id'});
  this.route('share', {path: '/new/:username'});
});

export default Router;
