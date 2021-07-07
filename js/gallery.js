// import galleryItems from './app.js';
console.log(444444444444)

// ==== creat galleri items ====

  const galleryContainerEl = document.querySelector(".js-gallery");

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

  galleryContainerEl.insertAdjacentHTML("afterbegin", galleryItemCards);

  
// ==== open modal and modal img ====

const modalWindowEl = document.querySelector('div.js-lightbox');

const modalWindowImgEl = modalWindowEl.querySelector('img.lightbox__image');
    

galleryContainerEl.addEventListener('click', onOpenBigImag);

  function onOpenBigImag(evt) {

        evt.preventDefault(); 

        if(!evt.target.classList.contains('gallery__image')) {

          return;
        }

        const activeImg = evt.target;
       
        onOpenModalWindow();
        
    onOpenModalImg(activeImg);
    
      }

    function onOpenModalWindow() {
      modalWindowEl.classList.add('is-open');
    }

    function onOpenModalImg (photos) {
      modalWindowImgEl.src = photos.dataset.source; 
      modalWindowImgEl.alt = photos.alt;
    }

// ==== close modal ====

const modalCloseBtnEl = document.querySelector('.lightbox__button');

modalCloseBtnEl.addEventListener('click', onCloseModal);
modalCloseBtnEl.addEventListener('click', onDeleteModalImgAttr);


function onCloseModal(evt)  {  
modalWindowEl.classList.remove('is-open');
}

function onDeleteModalImgAttr(evt) {
modalWindowImgEl.src = '';
modalWindowImgEl.alt = '';
}


const modalOverlayEl = document.querySelector('.lightbox__overlay');

modalOverlayEl.addEventListener('click', onCloseModal);
modalOverlayEl.addEventListener('click', onDeleteModalImgAttr);

document.addEventListener('keydown', onCloseModalEscapeBtn);
  
function onCloseModalEscapeBtn(evt) {
    
  if (window.event.keyCode === 27 &&
    modalWindowEl.classList.contains('is-open')) {
    
    onCloseModal();
    onDeleteModalImgAttr();    
  } 
  }