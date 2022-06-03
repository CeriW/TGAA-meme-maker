
// The current canvas the user is working on. We'll initialise to null and then
// set it to the first panel the code generates.
let currentCanvas = null

// Canvas generating elements
// Elements we can add various backgrounds to that we'll draw onto the canvas
let backgroundImg
let characterImg
let tag
let speechbox = document.querySelector('#speech-box')
let credits = document.querySelector("#credits")

// Interface elements
let backgroundSelector = document.querySelector('#background-selector')
let backgroundPreview = document.querySelector('#background-selector-preview')
let characterSelector = document.querySelector('#character-selector')
let characterPreview = document.querySelector('#character-selector-preview')
let poseSelector = document.querySelector('#pose-selector')
let downloadButton = document.querySelector('#download')


// Store whether the user has deliberately chosen a character yet.
// This will prevent the default character tag being generated
// while selecting a location
let characterSelected = false
document.body.setAttribute('character-selected', characterSelected)

// The locations to find certain visual elements
let paths ={
  character: 'assets/characters/',
  location: 'assets/locations/'
}

// A list of the locations
// name - a user-readable name that will display on the page
// id - the name of the image to go alongside it
const locations = [
  {name: "221B Baker Street",                     id:"baker-street-221b"},
  {name: "221B Baker Street",                     id:"baker-street-221b-night",                         variant:"night"},
  {name: "Sholmes' Suite",                        id:"sholmes-suite",                                   variant: "Fireplace"},
  {name: "Sholmes' Suite",                        id:"sholmes-suite-iris",                              variant:"Iris' side"},
  {name: "Sholmes' Suite",                        id:"sholmes-suite-sholmes",                           variant:"Herlock's side"},
  {name: "Crystal Tower base",                    id:"crystal-tower-base"},
  {name: "The Garridebs' room",                   id:"garridebs-room"},
  {name: "Naruhodo's Legal Consultancy",          id:"naruhodos-legal-consultancy"},
  {name: "Defendant's Antechamber",               id:"defendants-antechamber-the-old-bailey-left",      variant:'The Old Bailey'},
  {name: "Natsume's Room",                        id:"natsumes-room"},
  {name: "Prison cell",                           id:"prison-cell"},
  {name: "Prosecutor's Office",                   id:"prosecutors-office-left"},
  {name: "Windibank's Pawnbrokery",               id:"windibanks"},
]

// A list of the available characters
// name - a user-readable name that will display on the page
// id - the name of the image to go alongside it. Usually surname-forename-variant format, with hyphens also for multiple word surnames or forenames e.g van-zieks-barok
// gender - the gender of the character, for filtering purposes
// images - the number of images in the folder to go with this character. The code depends on them being named sequentially beginning at 1 and can't work if there are any numbers missing.
const characters = [
  {name: 'Ryunosuke Naruhodo',                    id:'naruhodo-ryunosuke',          gender: 'male',       images: 7},
  {name: 'Herlock Sholmes',                       id:'sholmes-herlock-default',     gender: 'male',       images: 12,      variant: 'default'},
  {name: 'Herlock Sholmes',                       id:'sholmes-herlock-casual',      gender: 'male',       images: 9,       variant: 'casual'},
  {name: 'Susato Mikotoba',                       id:'mikotoba-susato',             gender: 'female',     images: 12},
  {name: 'Barok van Zieks',                       id:'van-zieks-barok',             gender: 'male',       images: 6},
  {name: 'Iris Wilson',                           id:'wilson-iris',                 gender: 'female',     images: 4},
  {name: 'Tobias Gregson',                        id:'gregson-tobias',              gender: 'male',       images: 4},
  {name: 'Gina Lestrade',                         id:'lestrade-gina',               gender: 'female',     images: 4},
  {name: 'Soseki Natsume',                        id:'natsume-soseki',              gender: 'male',       images: 9},
  {name: 'Enoch Drebber',                         id:'drebber-enoch',               gender: 'male',       images: 4},
]

// ---------------------------------------------------------------------------//

// Create our first canvas, and set it as the selected one.
generateCanvas()
currentCanvas = document.querySelector('canvas-container')

// Generate the locations selector panel.
generateLocations()
generateLocationInterface()

// Generates the first panel in our meme, and also tells it to update if anything new is chosen from the background or character panels.
generatePanelArtwork()
backgroundSelector.addEventListener('change', generatePanelArtwork)
characterSelector.addEventListener('change', generatePanelArtwork)

// Tell the 'add panel' button to listen for clicks, and generate a new canvas if so.
document.querySelector('#add-panel').addEventListener('click', generateCanvas)

// Generate the characters dropdown. When the icons are clicked, generate the 
// poses to go with the matching character.
generateCharacterInterface()
characterSelector.addEventListener('change', generatePoses)

// Make the download button download the meme when clicked.
downloadButton.addEventListener('click', download);


let toggleHeadings = document.querySelectorAll('.toggle-heading')
toggleHeadings.forEach(function(node){
  
  node.addEventListener('click', function(e){
    let associate = document.querySelector('#' + e.target.getAttribute('associated-panel'))
    togglePanel(associate)
  })

})

// ---------------------------------------------------------------------------//

function generateLocations(){
  locations.forEach(function(location){
    let newOption = document.createElement('option')
    newOption.textContent = location.name
    newOption.setAttribute('value', location.id)
    backgroundSelector.appendChild(newOption)
  })
}


// Generates our canvas with the chosen backgrounds, characters and text
function generatePanelArtwork(e){
  
  // Set the background image
  let backgrounds = document.querySelectorAll('.canvas-container img:first-child')
  backgrounds.forEach(function(background){
    background.src = paths.location + backgroundSelector.value + '.png'
  })

  // If a character has been purposely selected previously then set the character image
  if (characterSelected){
    tag.src = paths.character + characterSelector.value + '/tag.png'
  }
}

// Creates a new canvas for us, including delete button and event listeners.
function generateCanvas(){

  // Create the new canvas
  let newCanvas = document.createElement('div')
  newCanvas.classList.add('canvas-container')
  

  backgroundImg = document.createElement('img')
  newCanvas.appendChild(backgroundImg)

  characterImg = characterImg ? characterImg.cloneNode() : document.createElement('img')
  newCanvas.appendChild(characterImg)

  tag = tag ? tag.cloneNode() : document.createElement('img')
  newCanvas.appendChild(tag)

  newSpeechbox = document.createElement('img')
  newSpeechbox.src = 'assets/game-elements/speech-box.png'
  newCanvas.appendChild(newSpeechbox)

  newTextBox = document.createElement('textarea')
  newTextBox.classList.add('text-overlay')
  newTextBox.innerHTML = 'Type your text here...'
  newCanvas.appendChild(newTextBox)

  // Generate the delete button and have it run removeCanvas on click.
  let deleteButton = document.createElement('div')
  deleteButton.classList.add('delete-panel')
  deleteButton.innerHTML = '<span class="material-icons md-17">delete</span>Delete panel'
  deleteButton.addEventListener('click', removeCanvas)
  newCanvas.appendChild(deleteButton)

  // When the canvas is clicked, make it the active one.
  newCanvas.addEventListener('click', function(){
    changeActiveCanvas(newCanvas)
  })

  // Add the canvas onto the page, make it the active one and put artwork in it.
  document.querySelector('#canvas-grid-item > div').appendChild(newCanvas)
  changeActiveCanvas(newCanvas)
  generatePanelArtwork(newCanvas)
  //tag.src = ''
}

// Make the specified canvas/panel the active one. This could be the result of a click on a canvas, or deleting an adjacent canvas.
// The activeCanvas parameter should be a <canvas> element and not a container.
function changeActiveCanvas(activeCanvas){

  currentCanvas = activeCanvas
  console.log(activeCanvas)

  backgroundImg = activeCanvas.querySelector('img:nth-child(1)')
  characterImg = activeCanvas.querySelector('img:nth-child(2)')
  tag = activeCanvas.querySelector('img:nth-child(3)')

  
  let allCanvases = document.querySelectorAll('.canvas-container')
  allCanvases.forEach(function(node){
    if (node === activeCanvas){
      node.classList.add('active-canvas')
    } else{
      node.classList.remove('active-canvas')
    }
  })
}

// Remove a canvas/panel from the page.
function removeCanvas(e){
  e.stopPropagation()
  let deadCanvas = e.target.closest('.canvas-container')

  
  if (deadCanvas.previousElementSibling){ // If the panel has one before it, make that the active one.
    changeActiveCanvas(deadCanvas.previousElementSibling)
  } else if (deadCanvas.nextElementSibling){ // If no previous one but there's a next one, make the next one the active one.
    changeActiveCanvas(deadCanvas.nextElementSibling)
  } else{ // If this function results in there being no panel at all, generate a fresh one.
    generateCanvas()
  }
  
  // Run a nice animation, then delete the panel.
  deadCanvas.style.animation = 'shrink 0.5s both'
  window.setTimeout(function(){
    deadCanvas.remove()
  },500)
}

// Generates the character selection window.
// Note that character-selector is a <select> element
function generateCharacterInterface(){

  // Loop through each character and...
  characters.forEach(function(character){

    // Generate the new option for this character.
    let newOption = document.createElement('option')
    newOption.value = character.id
    characterSelector.appendChild(newOption)

    let icon = generateLabelledIcon('character', character)
    icon.setAttribute('gender', character.gender)

    characterPreview.appendChild(icon)

    // If this icon is clicked....
    icon.addEventListener('click', function(e){

      // Set an attribute on the icons to allow for selected styling.
      ;[].forEach.call(document.querySelectorAll('.character-icon'), function(node){
        node.setAttribute('selected', false)
      })
      e.target.setAttribute('selected', true)

      // Set the value on the invisible dropdown
      characterSelector.value = e.target.getAttribute('value')


      // Show the character preview panel, and fill it with the poses for the chosen character.
      togglePanel(characterPreview)
      generatePoses()
    })
  })
}


// Generate the interface for the location selection
function generateLocationInterface(){

  // Loop through all the specified locations and...
  locations.forEach(function(location){

    // Generate an icon
    let icon = generateLabelledIcon('location', location)
    backgroundPreview.appendChild(icon)

    // When the icon is clicked, set the value of the invisible dropdown to match,
    // toggle the location panel off and regenerate our current panel so it can
    // have the new location
    icon.addEventListener('click', function(e){
      backgroundSelector.value = e.target.getAttribute('value')
      togglePanel(backgroundPreview)
      generatePanelArtwork()

      // Set appropriate attributes for selected styling. Although the selector
      // toggles closed on click, this ensures you can tell which one is selected
      // if you choose to reopen it.
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

// Generate a labelled icon. This is used by both the location and character interfaces.
// type may be either 'character' or 'location'
// object should be the object we're using from either the characters or locations array.
function generateLabelledIcon(type, object){
  let icon = document.createElement('div')
  icon.classList.add(type + '-icon')
  icon.setAttribute('value', object.id)

  // Figure out what the  image for the icon should be.
  let iconURL = ''
  switch(type) {
    case 'character':
      // This is set to 1.png so it will use the first image of the character as the preview.
      iconURL = 'url("assets/characters/' + object.id + '/thumbnails/1.png")'
      break
    case 'location':
      iconURL = 'url("assets/locations/thumbnails/' + object.id + '.png")'
      break;
  }  
  icon.style.backgroundImage = iconURL

  let label = document.createElement('div')
  label.textContent += object.name

  if (object.variant){
    console.log(object.variant)
    let variantTag = document.createElement('div')
    variantTag.classList.add('variant-tag')
    variantTag.textContent = object.variant
    label.appendChild(variantTag)
  }
  icon.appendChild(label)

  return icon
}


// Generate the poses for the desired character.
function generatePoses(e){

  // This initialises to false. We set this to true to confirm that the user
  // has deliberately chose a character and we're okay to go ahead with it.
  characterSelected = true
  document.body.setAttribute('character-selected', characterSelected)

  // Figure out if this has been run from an icon click or elsewhere.
  let chosenCharacter = e ? e.target.value : characterSelector.value

  // Reset the character if we're choosing a new one
  characterImg.src = paths.character + chosenCharacter + '/1.png'
  generatePanelArtwork()

  // Figure out how many times we need to loop through to generate all the poses.
  let imageAmount = 1
  characters.forEach(function(character){
    if (chosenCharacter == character.id){
      imageAmount =  character.images
    }
  })

  // Clear the pose selector.
  poseSelector.innerHTML = null

  // Generate each icon.
  for (let i=1; i <= imageAmount; i++){
    let newRadio = document.createElement('input')
    newRadio.setAttribute('type', 'radio')
    newRadio.setAttribute('id', i)
    newRadio.setAttribute('name', 'pose')
    newRadio.setAttribute('character', chosenCharacter)
    newRadio.value = i
    newRadio.addEventListener('click', selectPose)
    poseSelector.appendChild(newRadio)

    let newLabel = document.createElement('label')
    newLabel.setAttribute('for', i)
    newLabel.style.backgroundImage = 'url("assets/characters/' + chosenCharacter + '/thumbnails/' + i +'.png")'
    poseSelector.appendChild(newLabel)
  }

  poseSelector.querySelector('label').setAttribute('selected', '')

}

// When a pose is clicked, put that onto the canvas and mark it as selected.
function selectPose(e){
  let url = e.target.getAttribute('character')
  characterImg.setAttribute('src', paths.character + url + '/' + e.target.value + '.png')   
  generatePanelArtwork()
  selectItem(e)
}


// Put appropriate attributes on the specified event target and its siblings to
// be able to apply styling in the CSS.
function selectItem(e){
  let siblings = e.target.parentNode.querySelectorAll('label')
  siblings.forEach(function(sibling){
    sibling.removeAttribute('selected')
  })

  e.target.nextElementSibling.setAttribute('selected', '')
}

// Recreate the meme as an image file and download it.
function download() {
  // Generate a temporary canvas that we'll combine all of our individual canvases onto for download
  let downloadableCanvas = document.createElement('canvas')
  downloadableCanvas.classList.add('temp-canvas')
  downloadableCanvas.setAttribute('width', 1920)
  downloadableCanvas.setAttribute('height', 1080)
  document.body.appendChild(downloadableCanvas)

  // Get a list of all the canvases, and set the height of our temporary one to their combined heights.
  //let allCanvases = document.querySelectorAll('canvas:not(.temp-canvas)')
  let allCanvases = document.querySelectorAll('.canvas-container')
  console.log(allCanvases)
  downloadableCanvas.setAttribute('height', 1080 * allCanvases.length + 1)


  // Render the text on each one of our individual canvases, and add it onto
  // our temporary one.
  let downloadableCanvasContext = downloadableCanvas.getContext("2d")
  for (i=0; i < allCanvases.length; i++){

    console.log(allCanvases[i])

    let tempCanvas = document.createElement('canvas')
    tempCanvas.width = 1920
    tempCanvas.height = 1080
    //document.body.appendChild(tempCanvas)
    let tempCanvasContext = tempCanvas.getContext("2d");

    for (j = 1; j < 5; j++){
      console.log(allCanvases[i].querySelector('img:nth-child(' + j + ')'))
      let imgToDraw = allCanvases[i].querySelector('img:nth-child(' + j + ')')
      tempCanvasContext.drawImage(imgToDraw, 0, 0)
    }

    // Render the text
    tempCanvasContext.font = "50px Georgia";
    tempCanvasContext.fillStyle = "#fff";
    tempCanvasContext.fillText(allCanvases[i].querySelector('textarea').value, 370, 890);
    downloadableCanvasContext.drawImage(tempCanvas, 0, [i * 1080] )
  }


  // Add the credits onto the end.
  downloadableCanvasContext.drawImage(credits, 0, (allCanvases.length - 1) * 1080);

  // Download the image, then remove the temporary canvas.
  downloadButton.download = 'ace-attorney-meme-generator.png';
  downloadButton.href = downloadableCanvas.toDataURL()
  downloadableCanvas.remove()
}

// Simply takes a panel and toggles a 'hidden' attribute.
function togglePanel(associate){
  associate.classList.toggle('hidden')
}




let filterButtons = document.querySelectorAll('.filter')
filterButtons.forEach(function(filter){


  filter.addEventListener('click', function(e){
    console.log(e)
    console.log(e.target.getAttribute('filter-value'))

    let filterType = e.target.getAttribute('filter-type')
    let filterValue = e.target.getAttribute('filter-value')
    let panel = e.target.closest('div[id*="selector"]')
    let icons = panel.querySelectorAll('div[class*="icon"]')



    if (filterType && filterValue !== 'all'){
      icons.forEach(function(icon){
        //icon.classList.remove('toggled-off')
        if (icon.getAttribute(filterType) == filterValue){
          icon.setAttribute('toggled', 'on')
        } else{
          icon.setAttribute('toggled', 'off')
        }
      })
    } else if (filterValue == 'all'){
      icons.forEach(function(icon){
        icon.setAttribute('toggled', 'on')
      })
    }


  })
})