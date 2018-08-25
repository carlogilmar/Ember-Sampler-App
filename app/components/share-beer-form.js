import Component from '@ember/component';

export default Component.extend({

  actions: {
    addBeer: function(){
      let beer = this.get('beer')

      beer.save().then(() =>{
        this.sendAction('didSave',beer);
      },function(){
        console.log('There was an error');
      });
    }
  }

});
