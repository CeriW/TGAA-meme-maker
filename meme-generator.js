
let canvas = null


let backgroundImg = document.querySelector('#background')
let backgroundSelector = document.querySelector('#background-selector')
let backgroundPreview = document.querySelector('#background-selector-preview')

let characterImg = document.querySelector('#character')
let characterSelector = document.querySelector('#character-selector')
let characterPreview = document.querySelector('#character-selector-preview')

let poseSelector = document.querySelector('#pose-selector')

let textOverlay = document.querySelector('.text-overlay')

let downloadButton = document.querySelector('#download')

let tag = document.querySelector('#speech-tag')

// We'll iterate this each time we make a new panel to give each one a unique ID
let panels = 1

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
  {name: '221B Baker Street (night)', id:'baker-street-221b-night'},
  {name:'Crystal Tower base', id:'crystal-tower-base'},
  {name: 'The Garridebs\' room', id:'garridebs-room'},
  {name: 'Naruhodo\'s Legal Consultancy', id:'naruhodos-legal-consultancy'},
  {name: 'Sholmes\' Suite - fireplace', id:'sholmes-suite'},
  {name: 'Defendant\'s Antechamber - The Old Bailey', id:'defendants-antechamber-the-old-bailey-left'},
  {name: 'Natsume\'s Room', id:'natsumes-room'},
  {name: 'Prison cell', id:'prison-cell'},
  {name: 'Prosecutor\'s Office (left)', id:'prosecutors-office-left'},
  {name: 'Sholmes\' Suite - Iris\' side', id:'sholmes-suite-iris'},
  {name: 'Sholmes\' Suite - Herlock\'s side', id:'sholmes-suite-sholmes'},

]


const characters = [
  {name: 'Herlock Sholmes',     id:'sholmes-herlock',     gender: 'M',     images: 4},
  {name: 'Iris Wilson',         id:'wilson-iris',         gender: 'F',     images: 4},
  {name: 'Gina Lestrade',       id:'lestrade-gina',       gender: 'F',     images: 4},
  {name: 'Susato Mikotoba',     id:'mikotoba-susato',     gender: 'F',     images: 12},
  {name: 'Enoch Drebber',       id:'drebber-enoch',       gender: 'M',     images: 4},
  {name: 'Barok van Zieks',     id:'van-zieks-barok',     gender: 'M',     images: 6}
]

generateCanvas()
canvas = document.querySelector('canvas')


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




document.querySelector('#add-panel').addEventListener('click', generateCanvas)

function generatePanel(){
  backgroundImg.setAttribute('src', paths.location + backgroundSelector.value + '.png')

  if (characterSelected){
    tag.setAttribute('src', paths.character + characterSelector.value + '/tag.png')
  }


  
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

function generateCanvas(){
  let newCanvas = document.createElement('div')
  newCanvas.setAttribute('id', 'canvas-' + panels)
  panels++
  newCanvas.classList.add('canvas-container')
  newCanvas.innerHTML = 
  '<canvas class="myCanvas" width="1920" height="1080"></canvas><textarea class="text-overlay">Type your text here...</textarea>'
  
  let deleteButton = document.createElement('div')
  deleteButton.classList.add('delete-panel')
  deleteButton.innerHTML = '<span class="material-icons md-17">delete</span>Delete panel'
  deleteButton.addEventListener('click', removeCanvas)
  newCanvas.appendChild(deleteButton)

  document.querySelector('#canvas-grid-item > div').appendChild(newCanvas)
  canvas = newCanvas.querySelector('canvas')
  generatePanel(newCanvas)
}

function removeCanvas(e){
  let canvas = e.target.parentNode

  canvas.style.animation = 'shrink 0.5s both'
  window.setTimeout(function(){
    canvas.parentNode.removeChild(canvas)
  },500)
}

function generateCharacterInterface(){
  characters.forEach(function(character){

    let newOption = document.createElement('option')
    newOption.value = character.id
    characterSelector.appendChild(newOption)

    let icon = generateLabelledIcon('character', character)
    icon.setAttribute('gender', character.gender)

    characterPreview.appendChild(icon)

    icon.addEventListener('click', function(e){
      console.log(e.target)

      ;[].forEach.call(document.querySelectorAll('.character-icon'), function(node){
        node.setAttribute('selected', false)
      })
      e.target.setAttribute('selected', true)

      characterSelector.value = e.target.getAttribute('value')
      togglePanel(characterPreview)
      generatePoses()
    })
  })
}

;[].forEach.call(document.querySelectorAll('.filter'), function(node){

  node.addEventListener('click', function(e){
    console.log(e.target)

    let filter = e.target.getAttribute('filter')
    console.log(filter)


    let icons = node.parentNode.querySelectorAll('div[class*="icon"]')
    icons.forEach(function(icon){
      if (filter == 'male' && icon.getAttribute('gender') == 'M'){
        console.log(icon)
      } else if (filter == 'female' && icon.getAttribute('gender') == 'F'){
        console.log(icon)

      }

    })

    /*if (filter == 'male'){
      let males = node.parentNode.querySelectorAll('[gender="M"]')
      console.log(males)
    } else if (filter == 'female'){
      let females = node.parentNode.querySelectorAll('[gender="F"]')
      console.log(females)
    }*/


  })

})



function generateLocationInterface(){
  locations.forEach(function(location){
    let icon = generateLabelledIcon('location', location)
    backgroundPreview.appendChild(icon)


    icon.addEventListener('click', function(e){
      backgroundSelector.value = e.target.getAttribute('value')
      togglePanel(backgroundPreview)
      generatePanel()

      ;[].forEach.call(document.querySelectorAll('.location-icon'), function(node){
        node.setAttribute('selected', false)
      })
      e.target.setAttribute('selected', true)
    })
  })

  // Set the first one as default selected. This only styles it and doesn't
  // do any actual functionality.
  document.querySelector('.location-icon').setAttribute('selected', true)
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

  let allCanvases = document.querySelectorAll('canvas')
  
  if (allCanvases.length){
    let tempCanvas = document.createElement('canvas')
    tempCanvas.classList.add('temp-canvas')
    tempCanvas.setAttribute('width', 1920)
    tempCanvas.setAttribute('height', 1080)
    document.body.appendChild(tempCanvas)
  
    let allCanvases = document.querySelectorAll('canvas:not(.temp-canvas)')
    tempCanvas.setAttribute('height', 1080 * allCanvases.length + 1)
  
  
    let tempCanvasContext = tempCanvas.getContext("2d")
  
  
  
    for (i=0; i < allCanvases.length; i++){
      // Render the text
      let ctx = allCanvases[i].getContext("2d");
      ctx.font = "50px Georgia";
      ctx.fillStyle = "#fff";
      ctx.fillText(allCanvases[i].nextElementSibling.value, 370, 890);
  
  
      tempCanvasContext.drawImage(allCanvases[i], 0, [i * 1080])
  
      /*var ctx = canvas.getContext("2d");
      var img = document.querySelector("#" + type);
      ctx.drawImage(img, 0, 0);*/
  
  
    }
  
    let credits = document.querySelector("#credits");
    tempCanvasContext.drawImage(credits, 0, (allCanvases.length - 1) * 1080);
  
  
    
  
    downloadButton.download = 'ace-attorney-meme-generator.png';
    downloadButton.href = tempCanvas.toDataURL()
  
    tempCanvas.parentNode.removeChild(tempCanvas)
  
  } else{
    alert ('Your meme currently has no panels.')
  }

}


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










