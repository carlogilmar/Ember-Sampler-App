import Route from '@ember/routing/route';
import ENV from "../config/environment";
import RSVP from 'rsvp';
import $ from 'jquery';

export default Route.extend({

  model(){
    // Get current User
    let currentUser = new RSVP.Promise(function (resolve, reject) {
      $.ajax({
        type: 'GET',
        url: ENV.rootURL+'users/current',
        success: function (data) {
          resolve(data);
        },
        error: function (request, textStatus, error) {
          reject(error);
        }
      });
    });
    // Get all bears for show at index
    let allBeers = this.get('store').findAll('beer');
    // Return as hash
    return RSVP.hash({
      currentUser: currentUser,
      beers: allBeers
    });
  }

});
