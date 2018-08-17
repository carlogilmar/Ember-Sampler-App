import Route from '@ember/routing/route';

export default Route.extend({

  model(params){
    let newBeer = this.get('store').createRecord('beer', {
      user: params.username
    });
    return newBeer;
  },

  actions:{
    addBeer:function(){
			let beer = this.currentModel;
			beer.save()
      this.transitionTo('index');
    }
  }
});
