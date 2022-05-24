

let backgroundImg = document.querySelector('#background')
let backgroundSelector = document.querySelector('#background-selector')

let characterImg = document.querySelector('#character')
let characterSelector = document.querySelector('#character-selector')

let poseSelector = document.querySelector('#pose-selector')


let paths ={
  character: 'assets/characters/',
  location: 'assets/locations/'
}

generatePanel()
backgroundSelector.addEventListener('change', generatePanel)
characterSelector.addEventListener('change', generatePanel)


function generatePanel(){
  backgroundImg.setAttribute('src', backgroundSelector.value)
  
  //console.log(paths.character + characterSelector.value + '.png')
  
  // Wait for the image to load before we attempt to add it to the canvas
  backgroundImg.addEventListener('load', function(){
    addImage('background')
  })


  // It shouldn't be necessary to delay this by 1ms but it is...
  window.setTimeout(function(){
    addImage('character')
  },100)


  
  // Adds a new layer to the canvas.
  //Acceptable parameter values: background, character
  function addImage(type){

    var c = document.getElementById("myCanvas");
    var ctx = c.getContext("2d");
    var img = document.querySelector("#" + type);
    ctx.drawImage(img, 0, 0);
  }

}



characterSelector.addEventListener('change', generatePoses)

//The name of the character you want, in surname-forename format.
// Hyphens should be used for multi-word names e.g. van-zieks-barok
function generatePoses(e){

  // Reset the character if we're choosing a new one
  characterImg.src=""
  generatePanel()


  poseSelector.innerHTML = null
  let character = e.target.value

  for (let i=1; i <=3; i++){

    let newRadio = document.createElement('input')
    newRadio.setAttribute('type', 'radio')
    newRadio.setAttribute('id', i)
    newRadio.setAttribute('name', 'pose')
    newRadio.setAttribute('character', character)
    newRadio.value = i
    newRadio.addEventListener('change', selectPose)
    poseSelector.appendChild(newRadio)

    let newLabel = document.createElement('label')
    newLabel.setAttribute('for', i)
    newLabel.textContent = character + '-' + i
    newLabel.style.backgroundImage = 'url("assets/characters/' + character + '/' + i +'.png")'
    poseSelector.appendChild(newLabel)
  }
}

function selectPose(e){
  let url = e.target.getAttribute('character')
  characterImg.setAttribute('src', paths.character + url + '/' + e.target.value + '.png')
  generatePanel()
}












