


const apiGetSectores = "http://localhost/SmartBarApi/Clases/GetResponse/ConsultarSectores.php";

const apiGetMesas = "http://localhost/SmartBarApi/Clases/GetResponse/ConsultarMesas.php";


const apiChangeEStadosMesas = "http://localhost/SmartBarApi/Clases/PutResponse/ActualizarEstadoObjeto.php"


const apiGetMesasConPedidosListos = "http://localhost/SmartBarApi/Clases/GetResponse/ConsultarMesaByPedido.php";


const apiGetEStadoYPedidosById = "http://localhost/SmartBarApi/Clases/GetResponse/ConusltarEstadoCuentaMasPedidosById.php?ObjId=";

//dashboard tags
const sideMenu = document.querySelector("#aside-dash");
const menuBtnDash = document.getElementById("menu-btn-dash");
const closeBtnDash = document.querySelector("#close-btn");
const themeToggler = document.querySelector(".theme-toggler");
const containerTableQr = document.querySelector(".table-container");
const containerTableOrders = document.querySelector(".vista-pedidos-container");
const modal = document.querySelector(".modal");
const modalClose = document.querySelector('.modal_close');
const contenedorQr = document.querySelector('.qr_container');


const templateCardTable = document.getElementById("templateCardTable").content
const fragment = document.createDocumentFragment();



//end dashboard tags



//*******************************************variables globales*****************************************//
const Estados = {


   "Libre": 1,
   "Ocupado": 2,
   "Reservado": 3,
   "Inhabilitado": 4,

}



//*************************************************dash events********************************************//



//show menu
if (menuBtnDash) {

   menuBtnDash.addEventListener('click', () => {

      sideMenu.style.display = 'block'

   });
}


//hide menu

if (closeBtnDash) {
   closeBtnDash.addEventListener('click', () => {

      sideMenu.style.display = 'none'

   });

}

//change theme

if (themeToggler) {
   themeToggler.addEventListener('click', (e) => {

      console.log(e.target);
      console.log('aca deberia cambiar ');
      document.body.classList.toggle('dark-theme-variables');

      themeToggler.querySelector('span:nth-child(1)').classList.toggle('active');
      themeToggler.querySelector('span:nth-child(2)').classList.toggle('active');

      themeToggler.stopPropagation();
   });



}


//  //fill orders in table 

//  Orders.forEach(order => {


//     const tr = document.createElement('tr');
//     const trContent = `
//     <td> ${order.productName}</td>
//     <td> ${order.productNumber} </td>
//     <td> ${order.paymentStatus} </td>
//     <td class="${order.shipping === 'Declined' ? 'danger' :
//           order.shipping === 'pending' ? 'warning' :
//              'success'}">${order.shipping}</td>

//     <td class="primary">detalle</td>`

//     tr.innerHTML = trContent;
//     document.querySelector('table tbody').appendChild(tr);
//  });




//***********************************************REQUEST SECTORES****************************************** */

const getSectores = async () => {

   try {

      const res = await fetch(apiGetSectores);
      if (res.status === 200) {

         const data = await res.json();
         console.log(data);

         let arraySectoresDisponibles = [];

         arraySectoresDisponibles = [...filterSector(data, "SecEs_Descripcion")];
         //console.log(arraySectoresDisponibles);


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

//filtrado de sectores

const filterSector = (array, key) => {
   let arrayFilter = [];
   switch (key) {

      case 'SecEs_Descripcion':

         arrayFilter = array.filter(e => e.SecEs_Descripcion == "Con Disponibilidad")

         break;

      default:
         console.log("No existe categoria");


   }
   //console.log(arrayFilter);
   return arrayFilter;

}


/*********************************************REQUEST MESAS************************************************ */



const getMesas = async () => {

   try {

      const res = await fetch(apiGetMesas);
      if (res.status === 200) {

         const data = await res.json();

         let arrayMesasRservadas = [];
         let arrayMesasOcupadas = [];
         let arrayMesasLibres = [];

         arrayMesasOcupadas = [...filterMesa(data, "Ocupado")];

         arrayMesasRservadas = [...filterMesa(data, "Reservado")];

         arrayMesasLibres = [...filterMesa(data, "Libre")];

         return arrayMesasCombined = [...arrayMesasOcupadas, ...arrayMesasRservadas, ...arrayMesasLibres];



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

const getTablesWithOrders = async () => {

   try {

      const res = await fetch(apiGetMesasConPedidosListos)
      const data = await res.json()
      pintarCardTablesOrders(data);

   } catch (error) {

      console.log('ha ocurrido el sgte error: ' + error)

   }


}


const pintarCardTablesOrders = (data) => {

   data.forEach(mesa => {

      templateCardTable.getElementById("qrTableContainer").classList.add("ocupada");
      templateCardTable.getElementById("qrTableContainer").classList.add("pedidoListo");
      templateCardTable.querySelector(".templateCardTables-accion").style.visibility = "hidden";
      templateCardTable.querySelector('.title-card').textContent = mesa.Obj_Codigo;
      templateCardTable.querySelector('.footer-card').textContent = `CAP.${mesa.Obj_Capacidad}`;
      templateCardTable.querySelector('.idMesa').textContent = mesa.Obj_Id;

      const clone = templateCardTable.cloneNode(true);
      fragment.appendChild(clone);

   })

   containerTableOrders.appendChild(fragment);

}



// const getMesasConPedidosListos = async () => {

//    try {


//       fetch(apiGetMesasConPedidosListos)
//       .then(response => response.json())
//       .then(data => {
//       // data es un array de objetos JSON
//        const arrayOfObjects = JSON.parse(data);
//       // arrayOfObjects es ahora un array de objetos JavaScript
//       console.log(arrayOfObjects);
//     });

//       // const res = await fetch(apiGetMesasConPedidosListos);
//       // if (res.status === 200) {

//       //    const data = await res.json();

//       //    const arrayMesasConPedidosListos = JSON.parse(data);

//       //    console.log("array de mesas con pedidos Listos");
//       //    console.log(arrayMesasConPedidosListos);
//       //   return arrayMesasConPedidosListos;


//       // } else if (res.status === 401) {

//       //    console.log('pusiste tu api key de manera incorrecta');

//       // } else if (res.status === 404) {

//       //    console.log('El menu que buscas no existe');

//       // } else {

//       //    console.log('Hubo Un error Y no sabemos que paso');

//       // }

//    } catch (error) {

//       console.log(error);

//    }


// }



//filtrado 

const filterMesa = (array, key) => {
   let arrayFilter = [];
   switch (key) {

      case 'Libre':

         arrayFilter = array.filter(e => e.ObjEs_Descripcion == "Libre")

         break;

      case 'Reservado':
         arrayFilter = array.filter(e => e.ObjEs_Descripcion == "Reservado")
         break;
      case 'Ocupado':
         arrayFilter = array.filter(e => e.ObjEs_Descripcion == "Ocupado")
         break;

      default:
         console.log("No existe categoria");


   }
   //console.log(arrayFilter);
   return arrayFilter;

}



//pintar mesas dentro de generador de qr

async function pintarCardTables() {

   const data = await getMesas();


   data.forEach(mesa => {

      templateCardTable.querySelector('.title-card').textContent = mesa.Obj_Codigo;
      templateCardTable.querySelector('.footer-card').textContent = `CAP.${mesa.Obj_Capacidad}`;
      templateCardTable.querySelector('.idMesa').textContent = mesa.Obj_Id;


      console.log(`el estado de la mesa ${mesa.Obj_Codigo} es igual a => ${mesa.ObjEs_Descripcion}`);

      let EstadoDeMesa = mesa.ObjEs_Descripcion;

      switch (EstadoDeMesa) {

         case 'Libre':

            templateCardTable.getElementById("qrTableContainer").classList.remove("reservada");
            templateCardTable.getElementById("qrTableContainer").classList.remove("ocupada");
            templateCardTable.getElementById("qrTableContainer").classList.remove("cancelada");
            templateCardTable.getElementById("qrTableContainer").classList.add("libre");
            templateCardTable.querySelector(".templateCardTables-accion").style.visibility = "visible";
            templateCardTable.querySelector('.turnStatusCheck').dataset.id = mesa.Obj_Id;
            console.log(`el id de la mesa ${mesa.Obj_Codigo} es ${mesa.Obj_Id}`)
            break;

         case 'Reservado':

            templateCardTable.getElementById("qrTableContainer").classList.remove("libre");
            templateCardTable.getElementById("qrTableContainer").classList.remove("ocupada");
            templateCardTable.getElementById("qrTableContainer").classList.remove("cancelada");
            templateCardTable.getElementById("qrTableContainer").classList.add("reservada");
            templateCardTable.querySelector(".templateCardTables-accion").style.visibility = "visible";
            templateCardTable.querySelector('.turnStatusCheck').dataset.id = mesa.Obj_Id;
            break;

         case 'Ocupado':

            templateCardTable.getElementById("qrTableContainer").classList.remove("libre");
            templateCardTable.getElementById("qrTableContainer").classList.remove("reservada");
            templateCardTable.getElementById("qrTableContainer").classList.remove("cancelada");
            templateCardTable.getElementById("qrTableContainer").classList.add("ocupada");
            templateCardTable.querySelector(".templateCardTables-accion").style.visibility = "hidden";
            break;

         case 'Inhabilitado':

            templateCardTable.getElementById("qrTableContainer").classList.remove("libre");
            templateCardTable.getElementById("qrTableContainer").classList.remove("reservada");
            templateCardTable.getElementById("qrTableContainer").classList.remove("ocupada");
            templateCardTable.getElementById("qrTableContainer").classList.add("cancelada");
            templateCardTable.querySelector(".templateCardTables-accion").style.visibility = "hidden";
            break;

         default: alert('falla el renderizado')
            break;

      }

      const clone = templateCardTable.cloneNode(true);
      fragment.appendChild(clone);

   })

   containerTableQr.appendChild(fragment);

}

/***********************Agregamos Click al contenedor de mesas *************************** */

containerTableQr.addEventListener('click', (e) => {


   if (e.target.classList.contains('sales')) {

      console.log(e.target.classList);//de esta manera con solo un addEven Listener detectamos cualquier Click
      generarEvent(e);


      /*********************************************evento para cambiar de estado a las mesas *********************/

   } else if (e.target.classList.contains('turnStatusCheck')) {

      generateEventTwo(e);

   }
   e.stopPropagation();
})




const generateEventTwo = e => {

   if (e.target.classList.contains('turnStatusCheck')) {

      changeStatus(e.target.parentElement)//enviamos el contenido de la card al metodo generar qr 

   }


}

const changeStatus = objeto => {

   let idObj = objeto.querySelector('.turnStatusCheck').dataset.id;
   let idEst = Estados.Ocupado;

   const params = {
      idObj,
      idEst
   };

   objeto.querySelector('.turnStatusCheck').disabled = true;

   fetch(apiChangeEStadosMesas, {
      method: 'POST',
      body: JSON.stringify(params),
      headers: { "Content-type": "application/json; charset=UTF-8" }
   })
      .then(response => response.json())
      .then(data => {
         const esExito = data.exito;
         console.log(esExito); // imprime "true"

         if (esExito) {
            alert("se ha cambiado el estado de la mesa Con exito")
            while (containerTableQr.firstChild) {
               containerTableQr.removeChild(containerTableQr.firstChild);
            }

            pintarCardTables();


         } else {

            alert("No se pudo actualizar el objeto")
         }
      })
      .catch(err => console.log(err));
}

const generarEvent = e => {

   if (e.target.classList.contains('sales')) {

      generarQr(e.target.parentElement)//enviamos el contenido de la card al metodo generar qr 

   }
}




var qrcode = new QRCode(contenedorQr)

const generarQr = objeto => {



   let ObjId = objeto.querySelector('.idMesa').textContent;

   let CuentaAbierta = false;
   let pedidosSinEntregar = false;

   if (objeto.classList.contains("ocupada")) {


      const getMesaById = async () => {


         fetch(apiGetEStadoYPedidosById + ObjId)
            .then(response => response.json())
            .then(data => {
               const [mesaConsultada] = data;

               isOk = Validar(mesaConsultada);


            });

      }

      getMesaById();


      function Validar(mesa) {

         console.log(mesa);
         console.log(`el objeto tiene cuenta: ${mesa.CuenEs_Descripcion}`);
         console.log(`y el estado del ultimo pedido es : ${mesa.pedEs_Descripcion}`);

         if (mesa.CuenEs_Descripcion == "Abierta") {


            alert("la cuenta Esta abierta");

            return false;

         } else if (mesa.pedEs_Descripcion != "Entregado" && mesa.pedEs_Descripcion != "Cancelado") {

            alert("la mesa posee pedidos sin entregar");
            return false;


         } else if (mesa.CuenEs_Descripcion == "Cerrada" && mesa.pedEs_Descripcion == "Entregado") {

            modal.classList.add("modal--show");

            let url = "https://wa.me/+542474512011?text=frontsmartbar.netlify.app/?CuenCod="
            let CuenCod = objeto.querySelector('.title-card').textContent;
            let ampersand = "%26ObjId=";
            let fechaActual = new Date().toISOString(); //2022-11-20T03:42:45.831Z
            let fechaTratada = removeCharacterFromString(fechaActual);

            let urlCompleta = url.concat(CuenCod).concat('-').concat(ObjId).concat('-').concat(fechaTratada).concat(ampersand).concat(ObjId)
            console.log(`la urlCompleta es : ${urlCompleta}`)

            qrcode.makeCode(urlCompleta);
            modalClose.addEventListener('click', (e) => {
               qrcode.clear();
               e.preventDefault();
               modal.classList.remove('modal--show');
            })

            return true;

         }



      }

   } else {

      alert("Debes Pasar la mesa a Ocupada para poder generar Un qr")


   }
}


const removeCharacterFromString = (dataString) => {
   newWord = dataString.replace(/-/g, '');
   let cadenaFinal = removeCharacterFromString2(newWord);
   return cadenaFinal
}

const removeCharacterFromString2 = (dataString) => {
   newWord = dataString.replace(/:/g, '');
   let cadenaSinT = newWord.replace('T', '')
   let posicionACortar = cadenaSinT.indexOf('.');
   let CadenaFinal = cadenaSinT.slice(0, posicionACortar);
   return CadenaFinal;
}





//*************************************** end dash events************************************************//

document.addEventListener('DOMContentLoaded', () => {

   getTablesWithOrders();
   pintarCardTables();


})
