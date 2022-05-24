

let backgroundImg = document.querySelector('#background')
let backgroundSelector = document.querySelector('#background-selector')

let characterImg = document.querySelector('#character')

//let locationBtn = document.querySelector('#change-location')
//locationBtn.addEventListener('click', changeLocation)

generatePanel()
backgroundSelector.addEventListener('change', generatePanel)

function generatePanel(){
  //alert('hi!')
  backgroundImg.setAttribute('src', backgroundSelector.value)
  
  // Wait for the image to load before we attempt to add it to the canvas
  backgroundImg.addEventListener('load', function(){
      var c = document.getElementById("myCanvas");
      var ctx = c.getContext("2d");
      var img = document.querySelector("#background");
      ctx.drawImage(img, 0, 0);
  })
  
    // Wait for the image to load before we attempt to add it to the canvas
  backgroundImg.addEventListener('load', function(){
      var c = document.getElementById("myCanvas");
      var ctx = c.getContext("2d");
      var img = document.querySelector("#character");
      ctx.drawImage(img, 0, 0);
  })

}










