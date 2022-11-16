


const apiGetSectores="http://localhost/SmartBarApi/Clases/GetResponse/ConsultarSectores.php";

const apiGetMesas="http://localhost/SmartBarApi/Clases/GetResponse/ConsultarObjetosGral.php";



//dashboard tags
const sideMenu = document.querySelector("#aside-dash");
const menuBtnDash = document.getElementById("menu-btn-dash");
const closeBtnDash = document.querySelector("#close-btn");
const themeToggler = document.querySelector(".theme-toggler");
const containerMain = document.querySelector("main");

const templateQrView= document.getElementById("box-container-template").content;
const fragment = document.createDocumentFragment();

//end dashboard tags



//*******************************************variables globales*****************************************//


let arrayMesasCombined=[];




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

         arraySectoresDisponibles = [...filterSector(data,"SecEs_Descripcion")];
         console.log(arraySectoresDisponibles);
         pintarBox(arraySectoresDisponibles);

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
         let arrayMesasLibres= [];
         let arrayMesasRservadas=[];

         arrayMesasLibres = [...filterMesa(data,"Libre")];
         console.log(arrayMesasLibres);

         arrayMesasRservadas = [...filterMesa(data,"Reservado")];
         console.log(arrayMesasRservadas);

         arrayMesasCombined=arrayMesasLibres.concat(arrayMesasRservadas);

         console.log(arrayMesasCombined);


        

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


const pintarBox = (data) => {
   data.forEach(sector => {

    // console.log(`el nombre del sector es : ${sector.Sec_Nombre}`);
    templateQrView.querySelector('h1').textContent = sector.Sec_Nombre;
    const clone = templateQrView.cloneNode(true);
    fragment.appendChild(clone);

   })
   containerMain.appendChild(fragment);
}

 
 //*************************************** end dash events************************************************//

 document.addEventListener('DOMContentLoaded', () => {

  
   getSectores();
   getMesas();
  

   
  


})
