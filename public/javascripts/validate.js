function validateInput(){
  return (document.getElementsByName('subject')[0].value != '' && document.getElementsByName('content')[0].value != '');
}

function submitPost(){
  if(validateInput()){
    document.getElementsByName('blogpost')[0].submit();
  }
  else{
    alert("Please provide both a subject and content");
  }
}