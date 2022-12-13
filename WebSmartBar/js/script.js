




//constantes apis 

const apiItemMenus = "http://localhost/SmartBarApi/clases/GetResponse/ConsultarItemsMenu.php";

const insertPedido = "http://localhost/SmartBarApi/Clases/PostResponse/InsertarPedido.php"

//templates menu
const menu = document.querySelector('.menu');
const cardContainerFood = document.querySelector('.box-container');
const cardContainerDrinks_1 = document.getElementById('container-drinks-1');
const cardContainerDrinks_2 = document.getElementById('container-drinks-2');
const cardContainerPostres = document.getElementById('container-postres');


const tableResumeCarrito = document.querySelector('.carrito')
const templateCard = document.getElementById('template-card').content
const templateFooter = document.getElementById('template-footer').content
const templateCarrito = document.getElementById('template-carrito').content
const items = document.getElementById('items')
const footer = document.getElementById('footer')

const fragment = document.createDocumentFragment();




//index tags
const searchBtn = document.getElementById('search-btn');
const searchForm = document.querySelector('.header .search-form');
//vamos a craer el Objeto contenedor carrito , este contendra una coleccion de Objetos dentro 

let carrito = {}//lo inicializamos como un objeto vacio

let showCounter = document.getElementById('showCounter');
showCounter.textContent = 0;


/*************************************************Index events*****************************************/


searchBtn?.addEventListener('click', () => {

   searchBtn.classList.toggle('fa-times');
   searchForm.classList.toggle('active');
   menuBtn.classList.remove('fa-times');
   navbar.classList.remove('active');

});

let menuBtn = document.querySelector('#menu-btn');
let navbar = document.querySelector('.header .navbar');




if (menuBtn) {
   menuBtn.addEventListener('click', () => {
      menuBtn.classList.toggle('fa-times');
      navbar.classList.toggle('active');
      searchBtn.classList.remove('fa-times');
      searchForm.classList.remove('active');
   });
}



window.onscroll = () => {
   searchBtn.classList.remove('fa-times');
   searchForm.classList.remove('active');
   menuBtn.classList.remove('fa-times');
   navbar.classList.remove('active');
}


//***********************************fetch api item menu**********************************************// 
const getMenuItems = async () => {

   try {

      const res = await fetch(apiItemMenus);
      if (res.status === 200) {

         const data = await res.json();
         console.log(data);
         let availableItems = [];
         let foodItems = [];
         let drinksWithAlcohol = [];
         let drinksWithOutAlcohol = [];
         let desserts = [];

         availableItems = [...filter(data, 'Disponible')];
         //console.log(availableItems);

         foodItems = [...filter(availableItems, 'Comida')]
         //console.log(foodItems);

         drinksWithAlcohol = [...filter(availableItems, 'Bebidas Con Alcohol')]
         //console.log(drinksWithAlcohol);

         drinksWithOutAlcohol = [...filter(availableItems, 'Bebidas Sin Alcohol')]
         console.log(drinksWithOutAlcohol);

         desserts = [...filter(availableItems, 'Postre')]
         console.log(desserts);



         pintarCard(foodItems);
         pintarCard(drinksWithAlcohol);
         pintarCard(drinksWithOutAlcohol);
         pintarCard(desserts);


      } else if (res.status === 401) {

         console.log('pusiste tu api key de manera incorrecta');

      } else if (res.status === 404) {

         console.log('El menu que buscas no existe');

      } else {

         console.log('Hubo Un error Y no sabemos que paso');

      }

   } catch (error) {

      console.log(error);

   }


}


//filtrar 

const filter = (array, key) => {
   let arrayFilter = [];
   switch (key) {

      case 'Disponible':

         arrayFilter = array.filter(e => e.Estado == "Disponible")

         break;

      case 'Comida':
         arrayFilter = array.filter(e => e.Tipo == "Comida")
         break;

      case 'Bebidas Con Alcohol':

         arrayFilter = array.filter(e => e.Tipo == "Bebidas Con Alcohol")
         break;

      case 'Bebidas Sin Alcohol':

         arrayFilter = array.filter(e => e.Tipo == "Bebidas Sin Alcohol")

         break;

      case 'Postre':

         arrayFilter = array.filter(e => e.Tipo == "Postre")
         break;

      default:
         console.log("No existe categoria");


   }
   //console.log(arrayFilter);
   return arrayFilter;

}


//actualizar icono shopping cart 
const updateIcons = (cantidad) => {

   showCounter.textContent = cantidad;

}


//mostrar u ocultar tabla resumen 

const showTable = (cantidad) => {

   if (cantidad == 0) {

      tableResumeCarrito.style.display = "none";

   } else {

      tableResumeCarrito.style.display = "";
      tableResumeCarrito.classList.add('carrito');
   }


}






//pintar menu

const pintarCard = (data) => {

   let tipo = '';
   data.forEach(producto => {

      tipo = producto.Tipo;
      templateCard.querySelector('h3').textContent = producto.Nombre;
      templateCard.querySelector('img').setAttribute('src', producto.Imagen)
      templateCard.querySelector('.price').textContent = producto.Precio
      templateCard.querySelector('.btnAdd').dataset.id = producto.Id
      templateCard.querySelector('button').classList.add('btn');
      templateCard.querySelector('button').dataset.id = producto.Id
      //console.log(producto.Nombre);
      const clone = templateCard.cloneNode(true);

      fragment.appendChild(clone);

   })

   switch (tipo) {

      case 'Comida':
         cardContainerFood.appendChild(fragment);
         break;

      case 'Bebidas Con Alcohol':

         cardContainerDrinks_1.appendChild(fragment);

         break;

      case 'Bebidas Sin Alcohol':

         cardContainerDrinks_2.appendChild(fragment);

         break;

      case 'Postre':

         cardContainerPostres.appendChild(fragment);
         break;

      default:
         console.log("No existe categoria");


   }



}


// *****************agregamos al carrito ************************//

menu.addEventListener('click', (e) => {

   if (e.target.classList.contains('btnAdd')) {

      addCarrito(e);//de esta manera con solo un addEven Listener detectamos cualquier Click

   }
   e.stopPropagation();
})


const addCarrito = e => {

   if (e.target.classList.contains('btnAdd')) {

      setCarrito(e.target.parentElement)

   }

   e.stopPropagation();

}



const setCarrito = objeto => {

   //console.log(objeto)

   //creamos el objeto item Menu
   const producto = {

      id: parseInt(objeto.querySelector('.btnAdd').dataset.id, 10),
      title: objeto.querySelector('.name').textContent,
      precio: objeto.querySelector('.price').textContent,
      cantidad: 1 //la inicializamos en 1 despues hacemos la logica de aumentar can tidad cada vez que se clickea 

   }
   console.log(`el id del producto es ${producto.id}`)
   console.log(producto)

   if (carrito.hasOwnProperty(producto.id)) {

      producto.cantidad = carrito[producto.id].cantidad + 1;

   }

   //ahora si empujamos el objeto al carrito convirtiendo en un arry mediante spread Operator 

   carrito[producto.id] = { ...producto }

   console.log(carrito);
   pintarCarrito()
}




const pintarCarrito = () => {

   items.innerHTML = '';
   Object.values(carrito).forEach(producto => {


      templateCarrito.querySelector('th').textContent = producto.id;
      templateCarrito.querySelectorAll('td')[0].textContent = producto.title;//accedemos al primer td 
      templateCarrito.querySelectorAll('td')[1].textContent = producto.cantidad;//accedemos al primer td 

      //necesitamos agregarle el id del objeto a los botones de igual manera 

      templateCarrito.querySelector('.btn-info').dataset.id = producto.id;
      templateCarrito.querySelector('.btn-danger').dataset.id = producto.id;
      templateCarrito.querySelector('span').textContent = producto.cantidad * producto.precio;

      //una vez que hemos terminado de renderizar nuestro carrito debemos como siempre clonarlo 

      const clone = templateCarrito.cloneNode(true);
      fragment.appendChild(clone)


   })

   items.appendChild(fragment)

   //llmaamos a la funcion pntar Footer 

   pintarFooter()

   localStorage.setItem('carrito', JSON.stringify(carrito))

}



const pintarFooter = () => {

   footer.innerHTML = '';
   if (Object.keys(carrito).length === 0) {
      //aqui como solo haremos una linea en html podemos usar template string 
      showCounter.textContent = 0;
      tableResumeCarrito.style.display = "none"
      footer.innerHTML = `<th scope="row" colspan="5"></th>`;//reiniciaps el footer

      return;

   }


   const ncantidad = Object.values(carrito).reduce((accumulador, { cantidad }) => accumulador + cantidad, 0)//recorda que Object.values no spermite utilizar todas las uncionalidades de un array en una coleccion de objetos
   updateIcons(ncantidad);
   showTable(ncantidad)
   const nPrecio = Object.values(carrito).reduce((acc, { cantidad, precio }) => acc + cantidad * precio, 0)


   templateFooter.querySelectorAll('td')[1].textContent = ncantidad;
   templateFooter.querySelector('span').textContent = nPrecio;

   //una vez que tenemos nuestro template tene,os que clonarlo 

   const clone = templateFooter.cloneNode(true)

   fragment.appendChild(clone)

   //como no es un ciclo lo podemos agregar directamente desde aca 

   footer.appendChild(fragment)

   //logica para vaciar el carrito 

   const btnVaciar = document.getElementById('vaciar-carrito');

   btnVaciar.addEventListener('click', () => {
      carrito = {};
      pintarCarrito();
      tableResumeCarrito.style.display = "none";
      window.location.reload()

   })
}


//para detectar los botonose del vcarrito vamos a utilizar nuevamente el event delegation 

//vaoms a acceder al padre donde estan almacenados los elements del html del carrito 


items.addEventListener('click', e => {

   //hacemos uso de delegate al mandarle el evento a otra funcion 

   btnAccion(e);

})


const btnAccion = e => {

   //   console.log(e.target);
   if (e.target.classList.contains('btn-info')) {

      //sumar
      console.log(carrito[e.target.dataset.id])

      const producto = carrito[e.target.dataset.id];
      // producto.cantidad = carrito[e.target.dataset.id].cantidad +1;
      producto.cantidad++;

      //ahora mediante spread operator reemplazamos el producto dentro del carrito 

      carrito[e.target.dataset.id] = { ...producto }
      pintarCarrito();


   } else if (e.target.classList.contains('btn-danger')) {

      //restar
      const producto = carrito[e.target.dataset.id];
      producto.cantidad--;
      if (producto.cantidad === 0) {

         delete carrito[e.target.dataset.id];
      }
      pintarCarrito();
   }

   e.stopPropagation;

}


/*Json para poder pedir pedidos 

{"CuenCod":"MI1-1-20221014170721",
"ObjId":1,
"ItemsMenu":[{"ItemMenuId":10,"Cantidad":2},
            {"ItemMenuId":46,"Cantidad":1},
            {"ItemMenuId":47,"Cantidad":1}]}
*/


const btnEnviar = document.getElementById("btnEnviar");

btnEnviar.addEventListener('click', () => {

   enviarPedido(carrito);

})


const enviarPedido = (objeto) => {
   let ItemsMenu = [];


   //Obtenemos parametros de la Url para Configurar el Objeto pedido 

   let queryStrings = new URLSearchParams(window.location.search);
   let parametrosGet = Object.fromEntries(queryStrings.entries());

   // Declare three variables:
   let CuenCod = parametrosGet.CuenCod;

   let ObjId = parseInt(parametrosGet.ObjId);


   // desestructuramos el carrito para armar el array de items 
   Object.values(objeto).forEach(element => {

      const { id: ItemMenuId, cantidad: Cantidad } = element

      let item = {
         ItemMenuId,
         Cantidad
      }

      ItemsMenu.push(item);

   })

   const ped = {

      CuenCod,
      ObjId,
      ItemsMenu

   }

   // datos mandados con la solicutud POST


   fetch(insertPedido, {
      method: "POST",
      body: JSON.stringify(ped),


      headers: { "Content-type": "application/json; charset=UTF-8" }
   })
      .then(response => response.json())
      .then(json => console.log(json))
      .catch(err => console.log(err));
}


document.addEventListener('DOMContentLoaded', () => {

   getMenuItems();
   //Obtenemos parametros de la Url para Configurar el Objeto pedido 

   let queryStrings = new URLSearchParams(window.location.search);
   let parametrosGet = Object.fromEntries(queryStrings.entries());
   console.log(parametrosGet);

   if (localStorage.getItem('carrito')) {

      carrito = JSON.parse(localStorage.getItem('carrito'));
      pintarCarrito();

   }

})




/*************************************************end index events*****************************************/
