import { galleryItems } from './gallery-items.js';
const gallery = document.querySelector(".gallery");
const galleryTemplate = galleryItems.map(({ preview, original, description }) => {
  return `<li class='gallery__item'>
    <a class='gallery__link' href='${original}'>
      <img class='gallery__image' src='${preview}' data-source='${original}' alt='${description}'/>
    </a>
  </li>`;
}).join("");
gallery.insertAdjacentHTML("afterbegin", galleryTemplate);
gallery.addEventListener("click", imageListener);
function imageListener(event) {
  event.preventDefault();
  const imageClickerTarget = event.target;
  if (imageClickerTarget.classList.contains('gallery__image')) {
    const primaryImageUrl = imageClickerTarget.dataset.source;
    const modal = basicLightbox.create(`<img src="${primaryImageUrl}" width="600" height="600"/>`);
    modal.show();
    document.addEventListener("keydown", closeOnEscape);
    function closeOnEscape(event) {
      if (event.key === "Escape") {
        modal.close();
        document.removeEventListener("keydown", closeOnEscape);
      }
    }
    modal.on("afterClose", () => {
      document.removeEventListener("keydown", closeOnEscape);
    });
  }
}
console.log(galleryItems);
