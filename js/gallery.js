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
    import galleryItems from './app.js'; 
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
  