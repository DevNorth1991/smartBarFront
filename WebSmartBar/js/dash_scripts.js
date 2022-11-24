


const apiGetSectores = "http://localhost/SmartBarApi/Clases/GetResponse/ConsultarSectores.php";

const apiGetMesas = "http://localhost/SmartBarApi/Clases/GetResponse/ConsultarObjetosGral.php";



//dashboard tags
const sideMenu = document.querySelector("#aside-dash");
const menuBtnDash = document.getElementById("menu-btn-dash");
const closeBtnDash = document.querySelector("#close-btn");
const themeToggler = document.querySelector(".theme-toggler");
const containerTableQr = document.querySelector(".table-container");
const modal=document.querySelector(".modal");
const modalClose=document.querySelector('.modal_close');
const contenedorQr=document.querySelector('.qr_container');


const templateCardTable = document.getElementById("templateCardTable").content
const fragment = document.createDocumentFragment();



//end dashboard tags



//*******************************************variables globales*****************************************//


let arrayMesasCombined = [];




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
         console.log(data);
         let arrayMesasLibres = [];
         let arrayMesasRservadas = [];

         arrayMesasLibres = [...filterMesa(data, "Libre")];
         console.log(arrayMesasLibres);

         arrayMesasRservadas = [...filterMesa(data, "Reservado")];
         console.log(arrayMesasRservadas);

         arrayMesasCombined = arrayMesasLibres.concat(arrayMesasRservadas);

         // console.log(arrayMesasCombined);
         pintarCardTables(arrayMesasCombined);

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

      default:
         console.log("No existe categoria");


   }
   //console.log(arrayFilter);
   return arrayFilter;

}



//pintar mesas dentro de generador de qr

const pintarCardTables = (data) => {


   data.forEach(mesa => {

      templateCardTable.querySelector('.title-card').textContent = mesa.Obj_Codigo;
      templateCardTable.querySelector('.footer-card').textContent = `CAP.${mesa.Obj_Capacidad}`;
      templateCardTable.querySelector('.idMesa').textContent = mesa.Obj_Id;
   

      if (mesa.ObjEs_Descripcion == "Reservado") {

         templateCardTable.querySelector("div.libre").classList.add("reservada");


      }
      const clone = templateCardTable.cloneNode(true);
      fragment.appendChild(clone);

   })
   containerTableQr.appendChild(fragment);


}




/***********************Agregamos Click al cpntenedor de mesas *************************** */

containerTableQr.addEventListener('click', (e) => {

   
   if (e.target.classList.contains('sales')) {

      console.log(e.target.classList);//de esta manera con solo un addEven Listener detectamos cualquier Click
      generarEvent(e);
   }
   e.stopPropagation();
})


const generarEvent = e => {

   if (e.target.classList.contains('sales')) {

      generarQr(e.target.parentElement)//enviamos el contenido de la card al metodo generar qr 

   }
}





/*Json para poder pedir pedidos 

{"CuenCod":"MI1-1-20221014170721",
"ObjId":1,
"ItemsMenu":[{"ItemMenuId":10,"Cantidad":2},
            {"ItemMenuId":46,"Cantidad":1},
            {"ItemMenuId":47,"Cantidad":1}]}
*/


//watsapp me ---->  https://wa.me/+542474512011?text=frontsmartbar.netlify.app
//url para codigo qr file:///D:/BackUpIssd/TESIS/FrontendSmartBarWeb/WebSmartBar/index.html?CuenCod=MI11

//var qrcode = new QRCode(contenedorQr)
//otras propiedades de la libreria qrCode
// qrcode.clear(); // clear the code.
// qrcode.makeCode("http://naver.com"); // make another code

var qrcode = new QRCode(contenedorQr)

const generarQr = objeto => {

   console.log(objeto)
   modal.classList.add("modal--show");
   // qrcode.clear();

   let url = "https://wa.me/+542474512011?text=D:/BackUpIssd/TESIS/FrontendSmartBarWeb/WebSmartBar/index.html?CuenCod="
   let CuenCod = objeto.querySelector('.title-card').textContent;
   let ObjId = objeto.querySelector('.idMesa').textContent;
   let fechaActual = new Date().toISOString();//2022-11-20T03:42:45.831Z
   let fechaTratada = removeCharacterFromString(fechaActual);
      
   let urlCompleta = url.concat(CuenCod).concat('-').concat(ObjId).concat('-').concat(fechaTratada);
   console.log(`la urlCompleta es : ${urlCompleta}`)

   let url2='frontsmartbar.netlify.app';
   let urlCompleta2= url2.concat('?CuenCod=').concat(CuenCod).concat('-').concat(ObjId).concat('-').concat(fechaTratada);;
   console.log(`La url completa de prueba es : ${urlCompleta2} `)

   
   qrcode.makeCode(url);
   modalClose.addEventListener('click', (e) => {
      qrcode.clear();
      e.preventDefault();
      modal.classList.remove('modal--show');
   })


}





const removeCharacterFromString = (dataString) => { 
   newWord = dataString.replace(/-/g, ''); 
 let cadenaFinal= removeCharacterFromString2(newWord);
 return cadenaFinal
} 

const removeCharacterFromString2 = (dataString) => {     
newWord = dataString.replace(/:/g, ''); 
let cadenaSinT= newWord.replace('T','')
let posicionACortar=cadenaSinT.indexOf('.');
let CadenaFinal=cadenaSinT.slice(0,14);
return CadenaFinal;
} 





//*************************************** end dash events************************************************//

document.addEventListener('DOMContentLoaded', () => {


   // getSectores();
   getMesas();






})
