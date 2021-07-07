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

        const activImg = evt.target;
       
        onOpenModalWindow();
        
        onOpenModalImg(activImg);    
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

document.addEventListener('keydown', function(evt){ 
    if (window.event.keyCode === 27) {   
      onCloseModal();
      onDeleteModalImgAttr();
    }
  })

// ==== right left ====
document.addEventListener('keyup', function(event){
  if (window.event.keyCode === 37) {   
   console.log("right")
  }
  if (window.event.keyCode === 37) {   
    console.log("left")
   }
  // console.log('Key: ', event.key);
  // console.log('keyCode: ', event.keyCode);
});


// document.onkeydown = function(e){ 
//   if (window.event.keyCode == 27) {
//     console.log("444444")
//   }
// };


