

let backgroundImg = document.querySelector('#background')
let backgroundSelector = document.querySelector('#background-selector')

let characterImg = document.querySelector('#character')
let characterSelector = document.querySelector('#character-selector')


generatePanel()
backgroundSelector.addEventListener('change', generatePanel)
characterSelector.addEventListener('change', generatePanel)


function generatePanel(){
  backgroundImg.setAttribute('src', backgroundSelector.value)
  characterImg.setAttribute('src', characterSelector.value)
  
  
  // Wait for the image to load before we attempt to add it to the canvas
  backgroundImg.addEventListener('load', function(){
    addImage('background')
  })

  character.addEventListener('load', function(){
    addImage('character')
  })

  
  // Adds a new layer to the canvas.
  //Acceptable parameter values: background, character
  function addImage(type){
    var c = document.getElementById("myCanvas");
    var ctx = c.getContext("2d");
    var img = document.querySelector("#" + type);
    ctx.drawImage(img, 0, 0);
  }

}










