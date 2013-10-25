function validateInput(){
  return typeof(document.getElementsByName('subject')) != 'undefined' && typeof(document.getElementsByName('content')) != 'undefined';
}