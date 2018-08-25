# # Ember JS Workshop

Visit [Heroku App](https://drink-my-beer.herokuapp.com/)

## Instructions:

# 1. Setup Bootstrap 4 and the start view
Create a simple app with Ember Cli
```
ember new simple-app
```

Install bootstrap 4

```
ember install ember-bootstrap

ember generate ember-bootstrap —bootstrap-version=4
```

# 2. Set nav-bar menu and init routes
Add new routes for home and bar
```
 ember generate route index
```

Add the follow content in **application.hbs**
```
<div class="d-flex flex-column flex-md-row align-items-center p-3 px-md-4 mb-3 bg-white border-bottom shadow-sm">
  <h5 class="my-0 mr-md-auto font-weight-normal"> Drink My Beer! 🍻</h5>
  <nav class="my-2 my-md-0 mr-md-3">
    {{#link-to 'application' class="p-2 text-dark"}} 🏠 Home {{/link-to}}
  </nav>
</div>

<div class="container">

  <!-- outlet-->
  {{outlet}}

  <footer class="pt-4 my-md-5 pt-md-5 border-top">
    <div class="row">
      <div class="col-12 col-md">
        <small class="d-block mb-3 text-muted">&copy; 2017-2018</small>
      </div>
      <div class="col-6 col-md">
      </div>
      <div class="col-6 col-md">
      </div>
      <div class="col-6 col-md">
      </div>
    </div>
  </footer>
</div>
```

**index.hbs**
```
<div class="container">
  <div class="row">
    <div class="col-md-3">
      <div class="card text-center">
        <div class="card-body">
          <h5 class="card-title"> Aqui va el usuario </h5>
          <img src="http://icons.iconarchive.com/icons/sicons/basic-round-social/512/ember-js-icon.png" width="60%"/>
          <br> Poner aqui link al álbum
        </div>
      </div>
    </div>
    <div class="col-md-9">
      <div class="card text-center">
        <div class="card-body">
          <div class="pricing-header px-3 py-3 pt-md-5 pb-md-4 mx-auto text-center">
            <h1 class="display-4"> Drink My Beer 🍻</h1>
            <p class="lead"> Discover new beers, share and try!</p>
            <button type="button" class="btn btn-dark"> Agregar cerveza </button>
            <button type="button" class="btn btn-dark"> 📍 Ver Bares </button>
            <button type="button" class="btn btn-dark"> 🍺 Mis Bebidas </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

<br><br>

<div class="album py-5 bg-light">
  <h3 class="display-4"> Prueba nuevas experiencias... </h3>
  <div class="container">

    <div class="row">

      <h1> TODO: Aquí visualizar todas las cervezas!</h1>
    </div>

  </div>
</div>
```

# 3. Get all beers in home page
Create beer model

```
ember generate model beer
```

Update the **beer.js**
```
export default DS.Model.extend({
  name: DS.attr(),
  user: DS.attr(),
  price: DS.attr(),
  location: DS.attr(),
  description: DS.attr(),
  flavour: DS.attr(),
  rating: DS.attr(),
  container: DS.attr(),
	img: DS.attr(),
  cup: DS.attr()
});
```

Modify index.js route

```
export default Route.extend({
  model(){
    return this.get('store').findAll('beer');
  }
});
```

This should make a request, and, then an error.

# 4. Install ember mirage for prototype our index route
### Install ember mirage

```
ember install ember-cli-mirage
```

### Add beers fixtures and add to mirage
```
ember generate mirage-fixture beers
```

### Mirage/fixtures/beers.js
```
export default [
    {id:1, name:"Cosaco Guera", user: "@carlogilmar", price: 67, img: "https://goo.gl/T3Zu8n", location: "El Depósito Cuauhtemoc", description: "Sabrosa!", flavour: "IPA", rating: 8, container: "Barril", cup: "Tulipa"},
  {id:2, name:"Cream Stout", user: "@egjimenezg", price: 79, img: "https://goo.gl/EXWain", location: "Fiebre de Malta", description: "Es una cerveza de mucho cuerpo y con sabor a café.", flavour: "Stout", rating: 10, container: "Botella", cup: "Weizen"},
  {id:3, name:"Doble IPA", user: "@luissas", price: 67, img: "https://goo.gl/rQAgCr", location: "Hooters Universidad", description: "Es una cerveza muy amarga, y de color poco traslúcido. Es deliciosa!", flavour: "IPA", rating: 10, container: "Barril", cup: "Caliz"}
];
```

### Mirage/scenarios/default.js
```
export default function( server ) {
  server.loadFixtures('beers');
}
```

### Mirage/config.js
```
export default function() {
  this.get('/beers');
}
```

### Add our adapter
```
ember generate adapter application
```

### Add a serializer
```
ember generate serializer application
```

Ember needs an adapter and a serializer for make requests.

# 5. Show every beer at index route
Add the follow content:

**index.js**

```
import Route from '@ember/routing/route';
import RSVP from 'rsvp';

export default Route.extend({

  model(){
    // Get all bears for show at index
    let allBeers = this.get('store').findAll('beer');
    // Return as hash
    return RSVP.hash({
      beers: allBeers
    });
  }

});

```


**Index.hbs**
```
      {{#each model.beers as |beer|}}
        <div class="col-md-4">
          <div class="card mb-4 shadow-sm">
            <img class="card-img-top" src={{beer.img}} alt="Card image cap">
            <div class="card-body">
              <p class="card-text">
              <h3>{{beer.name}}</h3>
              {{beer.description}}
              </p>
              <div class="d-flex justify-content-between align-items-center">
                <div class="btn-group">
                  <strong class="text-muted">{{beer.user}}</strong>
                </div>
                <small class="text-muted">{{beer.rating}}</small>
              </div>
            </div>
          </div>
        </div>
      {{/each}}
```

# 6. Deploy at Heroku
Enable mirage at production environment:

### Config/environment.js
```
  if (environment === ‘development’) {

    // Add this lines! <-
    ENV[‘ember-cli-mirage’] = {
      enabled: true
    };

  }
```

Create a project in Heroku:

Add the Ember JS Buildpack at **Settings / Buildpacks**

```
 https://codon-buildpacks.s3.amazonaws.com/buildpacks/heroku/emberjs.tgz
```

Install heroku in your computer.

Login and add the heroku referente as remote repository in your project

Push your project to heroku, and see the url at the command line.

# 7. Show every beer as individual view
Create a new route for show a beer

```
ember generate route beer
```

Update the main router

App/router.js
```
 this.route('beer', {path: 'beer/:id'});
```

In the index route add a link to the beer route sending the id as param
```
<br>{{#link-to 'beer' beer.id}} Conocer más {{/link-to}}
```

Receive the id as param in the model section in beer route

**Routes/beer.js**
```
model(beer){
 return this.get('store').findRecord('beer', beer.id);
}
```

This will make a GET request finding the beer with id that we are sending, and this will produce an error because Ember won’t be find a server. Don’t worry, we could respond this request in our Ember Mirage.

**Mirage/config.js**
```
this.get('/beers/:id');
```

Take the beer found in model, and show with the follow template:

```
<main role="main" class="container">
<div class="row">
	<div class="col-md-8 blog-main">
		<h1 class="pb-3 mb-4 border-bottom text-center">
		 🍺 {{model.name}}
		</h1>

		<div class="blog-post text-center">
			<img src={{model.img}} width="70%"/>
		</div><!-- /.blog-post -->
	</div><!-- /.blog-main -->

	<aside class="col-md-4 blog-sidebar">
		<div class="p-3 mb-3 bg-light rounded">
			<h4>Acerca de esta chela...</h4><br>
			<p class="mb-0">
				👤 Certificada por: <strong> {{model.user}} </strong><br>
				💵 Precio: <strong> {{model.price }} </strong> <br>
				📍 Lugar: <strong> {{model.location}} </strong> <br>
				🍻 Tipo: <strong> {{model.flavour}} </strong> <br>
				🥃 Recipiente: <strong> {{model.cup}} </strong> <br>
				⭐️ Calificación: <strong> {{model.rating}} / 10 </strong> <br>
				<br>
				<h3 class="pb-3 mb-4 font-italic border-bottom text-center"> {{model.description}} </h3>
			</p>
		</div>
	</aside><!-- /.blog-sidebar -->

</div><!-- /.row -->

</main><!-- /.container -->

```

# 8. Get the current user ( make a request from non-conventional api)
Modify your **index.js** route:
```
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
```

And add this in your mirage/config.js

```
  this.get('users/current', () => {
    return {
      username: 'carlogilmar',
      email: 'carlogilmar12@gmail.com',
      name: 'Carlo Gilmar'
    };
  });
```

And show the username in index.hbs:

```
<h5 class="card-title">{{model.currentUser.username}}</h5>
```


# 9. Share a beer
Create a new route for share a beer

```
ember generate route share
```

In the index route add a link to the share route
```
{{#link-to 'share' model.currentUser.username class="btn btn-secondary"}} ➕ Agregar Cerveza  {{/link-to}}
```

Update this line here: **router.js**
```
this.route('share', {path: '/new/:username'});
```


**Routes/share.js**
```
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
```

**Templates/share.hbs**
Add inputs with the values for share the beer
```
<main role="main" class="container">
<div class="row">
	<div class="col-md-8 blog-main">
		<h1 class="pb-3 mb-4 border-bottom text-center">
		 🍺 {{model.name}}
		</h1>

		<div class="blog-post text-center">
			<img src={{model.img}} width="70%"/>
		</div><!-- /.blog-post -->
	</div><!-- /.blog-main -->

	<aside class="col-md-4 blog-sidebar">
		<div class="p-3 mb-3 bg-light rounded">
			<h4>Acerca de esta chela...</h4><br>
			<p class="mb-0">
				👤 Certificada por: <strong> {{model.user}} </strong><br>
				💵 Precio: <strong> {{model.price }} </strong> <br>
				📍 Lugar: <strong> {{model.location}} </strong> <br>
				🍻 Tipo: <strong> {{model.flavour}} </strong> <br>
				🥃 Recipiente: <strong> {{model.cup}} </strong> <br>
				⭐️ Calificación: <strong> {{model.rating}} / 10 </strong> <br>
				<br>
				<h3 class="pb-3 mb-4 font-italic border-bottom text-center"> {{model.description}} </h3>
			</p>
		</div>
	</aside><!-- /.blog-sidebar -->

</div><!-- /.row -->

</main><!-- /.container -->

```

**Mirage/config.js**
```
this.post('/beers');
```

This will make a POST request sending the data that we fill in the inputs.

# 10. Make the album view
Make the request for show the album

```
ember generate route profile
```

Modify the main router:
```
  this.route('profile', {path: '/:username'});
```

Add the link to this route in index.hbs view:
```
<br> {{#link-to 'profile' model.currentUser.username class="btn btn-primary btn-sm"}} Mi Álbum{{/link-to}}

```

Modify the profile router for show the beers:

profile.js
```
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

```

profile.hbs
```
<div class="pricing-header px-3 py-3 pt-md-5 pb-md-4 mx-auto text-center">
  <img src="http://icons.iconarchive.com/icons/sicons/basic-round-social/512/ember-js-icon.png" width="15%"/>
  <h1 class="display-4"> {{model.currentUser}} 🍻</h1>
  <p class="lead"> E X P E R T O &nbsp; E N &nbsp; C E R V E Z A</p>
</div>

<div class="container">
  <div class="row">
    {{#each model.beers as |beer|}}
      <div class="col-md-4">
        <div class="card" style="width: 18rem;">
          <img class="card-img-top" src={{beer.img}} alt="Card image cap">
          <div class="card-body pull-right text-muted">
            {{#link-to 'beer' beer.id}} Conocer más...  {{/link-to}}
          </div>
        </div>
      </div>
    {{/each}}
  </div>
</div>
```

# Adding a loader
Add in styles/app.css
```
.loader {
  width: 250px;
  height: 50px;
  line-height: 50px;
  text-align: center;
  position: absolute;
  top: 50%;
  left: 50%;
  -webkit-transform: translate(-50%, -50%);
          transform: translate(-50%, -50%);
  font-family: helvetica, arial, sans-serif;
  text-transform: uppercase;
  font-weight: 900;
  color: #ce4233;
  letter-spacing: 0.2em;
}
.loader::before, .loader::after {
  content: "";
  display: block;
  width: 15px;
  height: 15px;
  background: #ce4233;
  position: absolute;
  -webkit-animation: load .7s infinite alternate ease-in-out;
          animation: load .7s infinite alternate ease-in-out;
}
.loader::before {
  top: 0;
}
.loader::after {
  bottom: 0;
}

@-webkit-keyframes load {
  0% {
    left: 0;
    height: 30px;
    width: 15px;
  }
  50% {
    height: 8px;
    width: 40px;
  }
  100% {
    left: 235px;
    height: 30px;
    width: 15px;
  }
}

@keyframes load {
  0% {
    left: 0;
    height: 30px;
    width: 15px;
  }
  50% {
    height: 8px;
    width: 40px;
  }
  100% {
    left: 235px;
    height: 30px;
    width: 15px;
  }
}

```

Create a template loading.hbs
```
<div class="loader">Loading...</div>
```

# 11. Create share-beer component

Create the new component
```
ember generate share-beer-form component
```
Move the share form HTML code to the component template **components/share-beer-form.hbs**

```
<div class="p-3 mb-3 bg-light rounded">
  <h4>Cuentanos tu experiencia con esa chela...</h4><br>
  <div class="col-auto">
    <div class="input-group mb-2">
      <div class="input-group-prepend">
        <div class="input-group-text"> 🍺 Nombre de la bebida</div>
      </div>
      {{input value=model.name class="form-control"}}
    </div>
  </div>

  <div class="col-auto">
    <div class="input-group mb-2">
      <div class="input-group-prepend">
        <div class="input-group-text"> 💵 Precio </div>
      </div>
      {{input value=model.price class="form-control"}}
    </div>
  </div>

  <div class="col-auto">
    <div class="input-group mb-2">
      <div class="input-group-prepend">
      <div class="input-group-text"> 📍 Lugar </div>
    </div>
    {{input value=model.location class="form-control"}}
  </div>
</div>

<div class="col-auto">
  <div class="input-group mb-2">
    <div class="input-group-prepend">
      <div class="input-group-text"> 🍻 Tipo </div>
    </div>
    {{input value=model.flavour class="form-control"}}
  </div>
</div>

<div class="col-auto">
  <div class="input-group mb-2">
    <div class="input-group-prepend">
      <div class="input-group-text"> Botella o Barril? </div>
    </div>
    {{input value=model.container class="form-control"}}
  </div>
</div>

<div class="col-auto">
  <div class="input-group mb-2">
    <div class="input-group-prepend">
      <div class="input-group-text"> 🥃 Tipo de Vaso </div>
    </div>
    {{input value=model.cup class="form-control"}}
  </div>
</div>

<div class="col-auto">
  <div class="input-group mb-2">
    <div class="input-group-prepend">
       <div class="input-group-text"> ⭐️ Calificación </div>
    </div>
    {{input type='number' min="1" max="10" value=model.rating class="form-control"}}
  </div>
</div>

<div class="col-auto">
  <div class="input-group mb-2">
    <div class="input-group-prepend">
      <div class="input-group-text"> 📸 Imagen (url de la imagen) </div>
    </div>
    {{input value=model.img class="form-control"}}
  </div>
</div>

<div class="col-auto">
  <div class="input-group mb-2">
    <div class="input-group-prepend">
      <div class="input-group-text"> Descripción </div>
    </div>
    {{input value=model.description class="form-control"}}
  </div>
</div>

<br>
  <button class="btn btn-block btn-primary" {{ action "addBeer"}}>Compartir</button>
</div>
```

Add the component in the **share.hbs** template

```
<div class="col-md-8 blog-main">
  {{share-beer-form beer=model didSave="moveAfterSave"}}
</div><!-- /.blog-main -->
```

Move the addBeer function to the **share-beer-form** component actions

```
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
```

Create action in the parent route (**share.js**)

```
actions: {
  moveAfterSave: function(){
    this.transitionTo('index')
  }
}
```


