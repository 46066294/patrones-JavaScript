Extension de clases
https://geekytheory.com/prototipado-y-herencia-en-javascript/
http://classjs.readthedocs.org/en/latest/
http://ringjs.neoname.eu/
https://developer.mozilla.org/es/docs/Web/JavaScript/Guide/Details_of_the_Object_Model



PATRONES
/**
 * Created by Mat on 21/04/2016.
 * Este código permite crear pizzas, entonces dependiendo del
 * tipo de pizza que se solicite al método crearPizza, este
 * método crear una pizza suprema o una pizza vegetariana.
 *
 * Al finalizar la ejecución del código anterior obtendremos un
 * objeto de tipo pizza suprema, pero sin importar que tipo de pizza
 * ordenemos el objeto contara con las propiedades Ingredientes y Precio.
 * - See more at: http://7sabores.com/blog/implementar-patron-diseno-factory-javascript#sthash.BgtuqQXK.dpuf
 *
 * http://7sabores.com/blog/implementar-patron-diseno-factory-javascript
 */
function PizzaFactory(){
    this.crearPizza = function(type){
        if (type === "PizzaSuprema") {
            return PizzaSuprema();
        }else if (type === "PizzaVegetariana"){
            return PizzaVegetariana();
        };
    }

    function Pizza(ing,precio){
        this.Ingredientes =ing;
        this.Precio = precio;
    }

    function PizzaSuprema(){
        return new Pizza(["jamon","queso","salsa","carne"],
            150);
    }

    function PizzaVegetariana(){
        return new Pizza(["tomate","queso","salsa"],
            150);
    }
}

var factory = new PizzaFactory();
var pizza = factory.crearPizza("PizzaSuprema");

console.log(pizza);




//Singleton
//http://www.etnassoft.com/2011/05/20/el-patron-singleton-en-javascript/
Object.defineProperty( namespace, "singleton",
    { writable: false, configurable: false, value: { ... } } );

var namespace = {
    getSingleton: (function() { // BEGIN iife
      var singleton;
      return function() {
        if (!singleton) {
          singleton = {
            amethod: function() {
              console.log("amethod");
            }
          }
        }
        return singleton;
      };
    }()) // END iife
  };
  // Invoke: namespace.getSingleton().amethod()




//Composite
//http://www.dofactory.com/javascript/composite-design-pattern
//https://danielggarcia.wordpress.com/2014/03/31/patrones-estructurales-vi-patron-composite/
  var Node = function (name) {
    this.children = [];
    this.name = name;
}
 
Node.prototype = {
    add: function (child) {
        this.children.push(child);
    },
 
    remove: function (child) {
        var length = this.children.length;
        for (var i = 0; i < length; i++) {
            if (this.children[i] === child) {
                this.children.splice(i, 1);
                return;
            }
        }
    },
 
    getChild: function (i) {
        return this.children[i];
    },
 
    hasChildren: function () {
        return this.children.length > 0;
    }
}
 
// recursively traverse a (sub)tree
 
function traverse(indent, node) {
    log.add(Array(indent++).join("--") + node.name);
 
    for (var i = 0, len = node.children.length; i < len; i++) {
        traverse(indent, node.getChild(i));
    }
}
 
// logging helper
 
var log = (function () {
    var log = "";
 
    return {
        add: function (msg) { log += msg + "\n"; },
        show: function () { alert(log); log = ""; }
    }
})();
 
function run() {
    var tree = new Node("root");
    var left = new Node("left")
    var right = new Node("right");
    var leftleft = new Node("leftleft");
    var leftright = new Node("leftright");
    var rightleft = new Node("rightleft");
    var rightright = new Node("rightright");
 
    tree.add(left);
    tree.add(right);
    tree.remove(right);  // note: remove
    tree.add(right);
 
    left.add(leftleft);
    left.add(leftright);
 
    right.add(rightleft);
    right.add(rightright);
 
    traverse(1, tree);
 
    log.show();
}



//PATRON OBSERVER
//http://blog.aijoona.com/2011/02/11/patrones-de-diseno-y-javascript-observer/
/**
 * Nuestro suscriptor
 */
function Lector(name) {
    this.name = name;
}

Lector.prototype.leer = function(noticia) {
    console.log(this.name + " esta leyendo " + noticia);
}

var douglas = new Lector("Douglas Crockford");
var nicholas = new Lector("Nicholas Zakas");


var Diario = function(name) {
    this.name = name;
    this.suscriptores = [];
}

/**
 * Publica una noticia
 */
Diario.prototype.publicar = function(noticia) {
    noticia = noticia + ' | ' + this.name;
    for(var i = 0, l = this.suscriptores.length; i < l; i++) {
        this.suscriptores[i].leer(noticia);
    }
}

/**
 * Suscribe un lector al diario
 */
Diario.prototype.suscribir = function(lector) {
    this.suscriptores.push(lector);
}

var DiarioAijoona = new Diario('Aijoona');

// Suscribimos los lectores
DiarioAijoona.suscribir(douglas);
DiarioAijoona.suscribir(nicholas);

DiarioAijoona.publicar('Eval is evil');
// Douglas Crockford esta leyendo Eval is evil | Aijoona
// Nicholas Zakas esta leyendo Eval is evil | Aijoona