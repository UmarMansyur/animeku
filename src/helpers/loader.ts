const showLoader = () => {
  document.getElementById('layer')!.style.display = '';
}

const hideLoader = () => {
  document.getElementById('layer')!.style.display = 'none';
}

export { showLoader, hideLoader };