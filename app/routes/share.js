import Route from '@ember/routing/route';
import { hash } from 'rsvp';

export default Route.extend({
    model(){
        let beer = this.get('store').findRecord('beer', 1);
        return hash({
            beer: beer
        });
    },
    actions:{
        addBeer:function(){
            let shareBeer = this.store.createRecord('beer',{
                name: this.get('controller').get('name'),
                user: this.get('controller').get('user'),
                price: this.get('controller').get('price'),
                img: "https://goo.gl/T3Zu8n",
                location: this.get('controller').get('location'),
                description: this.get('controller').get('description'),
                flavour: this.get('controller').get('flavour'),    
                rating: this.get('controller').get('rating'),
                container: "barril",
                cup: this.get('controller').get('cup')
            })
            shareBeer.save();
            this.transitionTo('index');
        }
    }
});
