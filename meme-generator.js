
let canvas = document.querySelector('#myCanvas')


let backgroundImg = document.querySelector('#background')
let backgroundSelector = document.querySelector('#background-selector')
let backgroundPreview = document.querySelector('#background-selector-preview')

let characterImg = document.querySelector('#character')
let characterSelector = document.querySelector('#character-selector')
let characterPreview = document.querySelector('#character-selector-preview')

let poseSelector = document.querySelector('#pose-selector')

let textOverlay = document.querySelector('#text-overlay')

let downloadButton = document.querySelector('#download')

let tag = document.querySelector('#speech-tag')


// Store whether the user has deliberately chosen a character yet.
// This will prevent the default character tag being generated while selecting
// a location
let characterSelected = false

let paths ={
  character: 'assets/characters/',
  location: 'assets/locations/'
}

const locations = [
  {name: '221B Baker Street', id:'baker-street-221b'},
  {name:'Crystal Tower base', id:'crystal-tower-base'},
  {name: 'The Garridebs\' room', id:'garridebs-room'},
  {name: 'Naruhodo\'s Legal Consultancy', id:'naruhodos-legal-consultancy'},
  {name: 'Sholmes\' Suite', id:'sholmes-suite'}
]


const characters = [
  {name: 'Herlock Sholmes', id:'sholmes-herlock', images: 4},
  {name: 'Iris Wilson', id:'wilson-iris', images: 4},
  {name: 'Gina Lestrade', id:'lestrade-gina', images: 4},
  {name: 'Susato Mikotoba', id:'mikotoba-susato', images: 12},
  {name: 'Enoch Drebber', id:'drebber-enoch', images: 4},
  {name: 'Barok van Zieks', id:'van-zieks-barok', images: 6}
]




function generateLocations(){
  locations.forEach(function(location){
    let newOption = document.createElement('option')
    newOption.textContent = location.name
    newOption.setAttribute('value', location.id)
    backgroundSelector.appendChild(newOption)
  })
}

generateLocations()


generatePanel()
backgroundSelector.addEventListener('change', generatePanel)
characterSelector.addEventListener('change', generatePanel)


function generatePanel(){
  backgroundImg.setAttribute('src', paths.location + backgroundSelector.value + '.png')

  if (characterSelected){
    tag.setAttribute('src', paths.character + characterSelector.value + '/tag.png')
  }


  
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
    addImage('speech-tag')
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

    let newOption = document.createElement('option')
    newOption.value = character.id
    characterSelector.appendChild(newOption)

    let icon = generateLabelledIcon('character', character)
    characterPreview.appendChild(icon)

    icon.addEventListener('click', function(e){
      characterSelector.value = e.target.getAttribute('value')
      togglePanel(characterPreview)
      generatePoses()
    })
  })
}

function generateLocationInterface(){
  locations.forEach(function(location){
    console.log(location)
    let icon = generateLabelledIcon('location', location)
    backgroundPreview.appendChild(icon)


    icon.addEventListener('click', function(e){
      backgroundSelector.value = e.target.getAttribute('value')
      togglePanel(backgroundPreview)
      generatePanel()
    })

  })
}

generateLocationInterface()

function generateLabelledIcon(type, object){
  let icon = document.createElement('div')
  icon.classList.add(type + '-icon')
  icon.setAttribute('value', object.id)

  let iconURL = ''

  switch(type) {
    case 'character':
      iconURL = 'url("assets/characters/' + object.id + '/1.png")'
      break
    case 'location':
      iconURL = 'url("assets/locations/' + object.id + '.png")'
      break;
    default:
      // code block
  }
  
  icon.style.backgroundImage = iconURL


  let label = document.createElement('div')
  label.textContent += object.name

  icon.appendChild(label)
  return icon
}

generateCharacterInterface()


characterSelector.addEventListener('change', generatePoses)

//The name of the character you want, in surname-forename format.
// Hyphens should be used for multi-word names e.g. van-zieks-barok
function generatePoses(e){

  characterSelected = true

  let chosenCharacter = e ? e.target.value : characterSelector.value
  console.log(chosenCharacter)


  // Reset the character if we're choosing a new one
  characterImg.src = paths.character + chosenCharacter + '/1.png'

  generatePanel()

  let imageAmount = 1

  characters.forEach(function(character){
    if (chosenCharacter == character.id){
      imageAmount =  character.images
    }
  })

  console.log(imageAmount)


  poseSelector.innerHTML = null

  for (let i=1; i <= imageAmount; i++){

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

    //node.classList.toggle('closed')
  })
})

function togglePanel(associate){
  associate.classList.toggle('hidden')
}








