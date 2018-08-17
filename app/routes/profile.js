import Route from '@ember/routing/route';
import ENV from "../config/environment";
import RSVP from 'rsvp';
import $ from 'jquery';

export default Route.extend({
  model(){
    // Request to non-conventional api
    return new RSVP.Promise(function (resolve, reject) {
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
  },
});
