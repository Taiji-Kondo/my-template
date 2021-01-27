import 'picturefill';
import 'picturefill/dist/plugins/intrinsic-dimension/pf.intrinsic.min.js';
import 'nodelist-foreach-polyfill';
import objectFitImages from 'object-fit-images';

window.addEventListener('DOMContentLoaded', () => {
  const images: NodeListOf<HTMLImageElement> = document.querySelectorAll('img');
  objectFitImages(images);
});
