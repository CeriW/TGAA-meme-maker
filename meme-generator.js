
let canvas = document.querySelector('#myCanvas')


let backgroundImg = document.querySelector('#background')
let backgroundSelector = document.querySelector('#background-selector')

let characterImg = document.querySelector('#character')
let characterSelector = document.querySelector('#character-selector')
let characterPreview = document.querySelector('#character-selector-preview')

let poseSelector = document.querySelector('#pose-selector')

let textOverlay = document.querySelector('#text-overlay')

let downloadButton = document.querySelector('#download')

let paths ={
  character: 'assets/characters/',
  location: 'assets/locations/'
}

const locations = [
  ['221B Baker Street', 'baker-street-221b'],
  ['Crystal Tower base', 'crystal-tower-base'],
  ['The Garridebs\' room', 'garridebs-room'],
  ['Naruhodo\'s Legal Consultancy', 'naruhodos-legal-consultancy'],
  ['Sholmes\' Suite', 'sholmes-suite']
]

const characters = [
  {name: 'Herlock Sholmes', id:'sholmes-herlock'},
  {name: 'Iris Wilson', id:'wilson-iris'}
]




function generateLocations(){
  locations.forEach(function(location){
    let newOption = document.createElement('option')
    newOption.textContent = location[0]
    newOption.setAttribute('value', paths.location + location[1] + '.png')
    backgroundSelector.appendChild(newOption)
  })
}

generateLocations()


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
  },50)

  window.setTimeout(function(){
    addImage('speech-box')
  },50)




  
  // Adds a new layer to the canvas.
  //Acceptable parameter values: background, character, speech-box
  function addImage(type){

    var ctx = canvas.getContext("2d");
    var img = document.querySelector("#" + type);
    ctx.drawImage(img, 0, 0);
  }

}



function generateCharacterInterface(){
  characters.forEach(function(character){
    console.log(character)


    let icon = document.createElement('div')
    icon.classList.add('character-icon')
    icon.setAttribute('value', character.id)
    
    icon.style.backgroundImage = 'url("assets/characters/' + character.id + '/1.png")'
  

    let label = document.createElement('div')
    label.textContent += character.name

    characterPreview.appendChild(icon)
    icon.appendChild(label)

    icon.addEventListener('click', function(e){
      characterSelector.value = e.target.getAttribute('value')
      togglePanel(characterPreview)
      generatePoses()
    })
  })
}

generateCharacterInterface()


characterSelector.addEventListener('change', generatePoses)

//The name of the character you want, in surname-forename format.
// Hyphens should be used for multi-word names e.g. van-zieks-barok
function generatePoses(e){

  let chosenCharacter = e ? e.target.value : characterSelector.value


  // Reset the character if we're choosing a new one
  characterImg.src = paths.character + chosenCharacter + '/1.png'

  generatePanel()


  poseSelector.innerHTML = null
  let character = chosenCharacter

  for (let i=1; i <=4; i++){

    let newRadio = document.createElement('input')
    newRadio.setAttribute('type', 'radio')
    newRadio.setAttribute('id', i)
    newRadio.setAttribute('name', 'pose')
    newRadio.setAttribute('character', chosenCharacter)
    newRadio.value = i
    newRadio.addEventListener('change', selectPose)
    poseSelector.appendChild(newRadio)

    let newLabel = document.createElement('label')
    newLabel.setAttribute('for', i)
    //newLabel.textContent = character + '-' + i
    newLabel.style.backgroundImage = 'url("assets/characters/' + chosenCharacter + '/' + i +'.png")'
    poseSelector.appendChild(newLabel)
  }

  poseSelector.querySelector('label').setAttribute('selected', '')

}

function selectPose(e){
  console.log(e.target)
  let url = e.target.getAttribute('character')
  characterImg.setAttribute('src', paths.character + url + '/' + e.target.value + '.png')
  generatePanel()

  selectItem(e)

}

function selectItem(e){
  let label = e.target.nextElementSibling
  console.log(label)

  let siblings = e.target.parentNode.querySelectorAll('label')
  siblings.forEach(function(sibling){
    sibling.removeAttribute('selected')
  })

  e.target.nextElementSibling.setAttribute('selected', '')
}


function download() {

  // Render the text
  var ctx = canvas.getContext("2d");
  ctx.font = "50px Georgia";
  ctx.fillStyle = "#fff";
  ctx.fillText(textOverlay.value, 370, 890);
  

  downloadButton.download = 'ace-attorney-meme-generator.png';
  downloadButton.href = canvas.toDataURL()
}

download()
downloadButton.addEventListener('click', download);


;[].forEach.call(document.querySelectorAll('.toggle-heading'), function(node){
  node.addEventListener('click', function(e){
    let associate = document.querySelector('#' + e.target.getAttribute('associated-panel'))
    togglePanel(associate)
  })
})

function togglePanel(associate){
  associate.classList.toggle('hidden')
}








