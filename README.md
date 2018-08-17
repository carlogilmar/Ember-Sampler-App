# Ember JS Workshop

## Instructions:

### Agenda

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
<div class=“d-flex flex-column flex-md-row align-items-center p-3 px-md-4 mb-3 bg-white border-bottom shadow-sm”>
  <h5 class=“my-0 mr-md-auto font-weight-normal”> Drink My Beer! 🍻</h5>
  <nav class=“my-2 my-md-0 mr-md-3”>
    {{#link-to ‘application' class="p-2 text-dark"}} Home {{/link-to}}
  </nav>
</div>

<div class=“container”>

  <!— outlet—>
  {{outlet}}

  <footer class=“pt-4 my-md-5 pt-md-5 border-top”>
    <div class=“row”>
      <div class=“col-12 col-md”>
        <small class=“d-block mb-3 text-muted”>&copy; 2017-2018</small>
      </div>
      <div class=“col-6 col-md”>
        <h5>Features</h5>
        <ul class=“list-unstyled text-small”>
          <li><a class=“text-muted" href="#">Cool stuff</a></li>
          <li><a class=“text-muted" href="#">Random feature</a></li>
          <li><a class=“text-muted" href="#">Team feature</a></li>
          <li><a class=“text-muted" href="#">Stuff for developers</a></li>
          <li><a class=“text-muted" href="#">Another one</a></li>
          <li><a class=“text-muted" href="#">Last time</a></li>
        </ul>
      </div>
      <div class=“col-6 col-md”>
        <h5>Resources</h5>
        <ul class=“list-unstyled text-small”>
          <li><a class=“text-muted" href="#">Resource</a></li>
          <li><a class=“text-muted" href="#">Resource name</a></li>
          <li><a class=“text-muted" href="#">Another resource</a></li>
          <li><a class=“text-muted" href="#">Final resource</a></li>
        </ul>
      </div>
      <div class=“col-6 col-md”>
        <h5>About</h5>
        <ul class=“list-unstyled text-small”>
          <li><a class=“text-muted" href="#">Team</a></li>
          <li><a class=“text-muted" href="#">Locations</a></li>
          <li><a class=“text-muted" href="#">Privacy</a></li>
          <li><a class=“text-muted" href="#">Terms</a></li>
        </ul>
      </div>
    </div>
  </footer>
</div>
```

**index.hbs**
```
<div class=“pricing-header px-3 py-3 pt-md-5 pb-md-4 mx-auto text-center”>
  <h1 class=“display-4”> Drink My Beer 🍻</h1>
  <p class=“lead”> Discover new beers, share and try!</p>
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
  cup: DS.attr()
});
```

Modify index.js route

```
export default Route.extend({
  model(){
    return this.get(‘store’).findAll(‘beer’);
  }
});
```

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
  {id:1, name:”Cosaco Guera”, user: “@carlogilmar”, price: 67, location: “El Depósito Cuauhtemoc”, description: “Sabrosa!”, flavour: “IPA”, rating: 10, container: “barril”, cup: “vaso”},
  {id:2, name:”Cosaco Guera”, user: “@carlogilmar”, price: 67, location: “El Depósito Cuauhtemoc”, description: “Sabrosa!”, flavour: “IPA”, rating: 10, container: “barril”, cup: “vaso”},
  {id:3, name:”Cosaco Guera”, user: “@carlogilmar”, price: 67, location: “El Depósito Cuauhtemoc”, description: “Sabrosa!”, flavour: “IPA”, rating: 10, container: “barril”, cup: “vaso”}
];
```

### Mirage/scenarios/default.js
```
export default function( server ) {
  server.loadFixtures(‘beers’);
}
```

### Mirage/config.js
```
export default function() {
  this.get(‘/beers’);
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
**Index.hbs**
```
<div class=“album py-5 bg-light”>
    <div class=“container”>

        <div class=“row”>

            {{#each model as |beer|}}
                <div class=“col-md-4”>
                    <div class=“card mb-4 shadow-sm”>
                        <img class=“card-img-top” src=“ [https://goo.gl/T3Zu8n](https://goo.gl/T3Zu8n) “ alt=“Card image cap”>
                        <div class=“card-body”>
                            <p class=“card-text”>
                                <h3>{{beer.name}}</h3>
                                {{beer.description}}
                            </p>
                            <div class=“d-flex justify-content-between align-items-center”>
                                <div class=“btn-group”>
                                    <strong class=“text-muted”>{{beer.user}}</strong>
                                </div>
                                <small class=“text-muted”>{{beer.rating}}</small>
                            </div>
                        </div>
                    </div>
                </div>
            {{/each}}

        </div>

    </div>
</div>
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
 this.route(‘beer’, {path: ‘beer/:id’});
```

In the index route add a link to the beer route sending the id as param
```
<br>{{#link-to ‘beer' beer.id}} Conocer más {{/link-to}}
```

Receive the id as param in the model section in beer route

**Routes/beer.js**
```
model(beer){
 return this.get(‘store’).findRecord(‘beer’, beer.id);
}
```

This will make a GET request finding the beer with id that we are sending, and this will produce an error because Ember won’t be find a server. Don’t worry, we could respond this request in our Ember Mirage.

**Mirage/config.js**
```
this.get(‘/beers/:id’);
```

Take the beer found in model, and show with the follow template:

```
<main role=“main” class=“container”>
<div class=“row”>
    <div class=“col-md-8 blog-main”>
        <h1 class=“pb-3 mb-4 border-bottom text-center”>
         🍺 {{model.name}}
        </h1>

        <div class=“blog-post”>
            <img src={{model.img}} />
        </div><!— /.blog-post —>
    </div><!— /.blog-main —>

    <aside class=“col-md-4 blog-sidebar”>
        <div class=“p-3 mb-3 bg-light rounded”>
            <h4>Acerca de esta chela…</h4><br>
            <p class=“mb-0”>
                👤 Certificada por: <strong> {{model.user}} </strong><br>
                💵 Precio: <strong> {{model.price }} </strong> <br>
                📍 Lugar: <strong> {{model.location}} </strong> <br>
                🍻 Tipo: <strong> {{model.flavour}} </strong> <br>
                🥃 Recipiente: <strong> {{model.cup}} </strong> <br>
                ⭐️ Calificación: <strong> {{model.rating}} / 10 </strong> <br>
                <br>
                <h3 class=“pb-3 mb-4 font-italic border-bottom text-center”> {{model.description}} </h3>
            </p>
        </div>
    </aside><!— /.blog-sidebar —>

</div><!— /.row —>

</main><!— /.container —>
```

# 8. Share a beer
Create a new route for share a beer

```
ember generate route share
```

In the index route add a link to the share route
```
<br>{{#link-to ‘share'}} Compartir {{/link-to}}
```

**Routes/share.js**
```
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
```

**Templates/share.hbs**
Add inputs with the values for share the beer
```
{{input value=name}}
{{input value=username}}
{{input value=description}}
{{input value=rating}}...

And the action for button
<button class="btn btn-block btn-primary" {{ action "addBeer"}}>Compartir</button>
```

**Mirage/config.js**
```
this.post(’/beers’);
```

This will make a POST request sending the data that we fill in the inputs.
