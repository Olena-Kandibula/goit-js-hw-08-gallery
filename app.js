const galleryItems = [
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/14/16/43/himilayan-blue-poppy-4202825__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/14/16/43/himilayan-blue-poppy-4202825_1280.jpg',
    description: 'Hokkaido Flower',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677_1280.jpg',
    description: 'Container Haulage Freight',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785_1280.jpg',
    description: 'Aerial Beach View',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619_1280.jpg',
    description: 'Flower Blooms',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334_1280.jpg',
    description: 'Alpine Mountains',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571_1280.jpg',
    description: 'Mountain Lake Sailing',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272_1280.jpg',
    description: 'Alpine Spring Meadows',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255_1280.jpg',
    description: 'Nature Landscape',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843_1280.jpg',
    description: 'Lighthouse Coast Sea',
  },
];

// ==== creat galleri items ====
const refs = {
  galleryEl:document.querySelector(".js-gallery"),
  modalWindowEl:document.querySelector('div.js-lightbox'),    
  modalImgEl: document.querySelector('img.lightbox__image'),
  modalCloseBtnEl:document.querySelector('.lightbox__button'),
  modalOverlayEl: document.querySelector('.lightbox__overlay')
}

const galleryItemCards = creatGalleryItems (galleryItems);

function creatGalleryItems (items) {

  return items.map(({preview, original, description}) => {    
    return `
      <li class="gallery__item">
      <a
        class="gallery__link"
        href='${preview}'
      >
        <img
          class="gallery__image"
          src="${preview}"
          data-source="${original}"
          alt="${description}"
        />
      </a>
      </li>
      `;
  })
  .join(" ")
}

refs.galleryEl.insertAdjacentHTML("afterbegin", galleryItemCards);

// ==== open modal and modal img ====

refs.galleryEl.addEventListener('click', onOpenModalImag);

function onOpenModalImag(evt) {
  evt.preventDefault(); 

  if(!evt.target.classList.contains('gallery__image')) {
    return;
  }

  const activeImg = evt.target;

  onOpenModalWindow();    
  onOpenModalImg(activeImg);      
  document.addEventListener('keydown', onChanchModalImg);    
  
} 


function onOpenModalWindow() {
  refs.modalWindowEl.classList.add('is-open');    
}

function onOpenModalImg (photos) {
  refs.modalImgEl.src = photos.dataset.source; 
  refs.modalImgEl.alt = photos.alt;
}

function onChanchModalImg(evt) {       

  if (window.event.keyCode === 37 &&
    refs.modalWindowEl.classList.contains('is-open')) {          
      onChanchModalImgLeft();       
      }
  
  if (window.event.keyCode === 39 &&
      refs.modalWindowEl.classList.contains('is-open')) {        
        
    onChanchModalImgRight();        
      }              
}

function onChanchModalImgRight () { 

const galleryImgArray = [...document.querySelectorAll('.gallery__image')];// array gallery img 
   
let indexImg = galleryImgArray.findIndex(el => el.dataset.source === 
  refs.modalImgEl.src)//index current Modal img
 
let indexImgRight = indexImg + 1;//index Next Modal img  

  if(indexImgRight !== galleryImgArray.length ) {
    refs.modalImgEl.src = galleryImgArray[indexImgRight].dataset.source;
    refs.modalImgEl.alt = galleryImgArray[indexImgRight].alt;
  
  } else {
    refs.modalImgEl.src = galleryImgArray[0].dataset.source;
    refs.modalImgEl.alt = galleryImgArray[0].alt;
  
  }    
}


function onChanchModalImgLeft () {  
  const galleryImgArray = [...document.querySelectorAll('.gallery__image')];      
   let indexImg = galleryImgArray.findIndex(el => el.dataset.source === 
    refs.modalImgEl.src)//index current Modal img
  let indexImgLeft = indexImg - 1;//index Next Modal img  
    
    if(indexImg === 0 ) {
      refs.modalImgEl.src = galleryImgArray[galleryImgArray.length-1].dataset.source;
             
    } else {
      refs.modalImgEl.src = galleryImgArray[indexImgLeft].dataset.source;
      refs.modalImgEl.alt = galleryImgArray[indexImgLeft].alt;      
    }    
  }
    
// ==== close modal ====

refs.modalCloseBtnEl.addEventListener('click', onCloseModal);
refs.modalCloseBtnEl.addEventListener('click', onDeleteModalImgAttr);

refs.modalOverlayEl.addEventListener('click', onCloseModal);
refs.modalOverlayEl.addEventListener('click', onDeleteModalImgAttr);

function onCloseModal(evt)  {  
refs.modalWindowEl.classList.remove('is-open');
}

function onDeleteModalImgAttr(evt) {
refs.modalImgEl.removeAttribute('src');
refs.modalImgEl.removeAttribute('alt');
}

document.addEventListener('keydown', onCloseModalEscapeBtn);

function onCloseModalEscapeBtn(evt) {
  
if (window.event.keyCode === 27 &&
  refs.modalWindowEl.classList.contains('is-open')) {
  
  onCloseModal();
  onDeleteModalImgAttr();    
} 
}

