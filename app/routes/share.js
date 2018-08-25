import Route from '@ember/routing/route';

export default Route.extend({

  model(params){
    let newBeer = this.get('store').createRecord('beer', {
      user: params.username
    });
    return newBeer;
  },

  actions:{
    moveAfterSave: function(){
      this.transitionTo('index')
    }
  }

});
