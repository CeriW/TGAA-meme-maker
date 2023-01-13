// The current canvas the user is working on. We'll initialise to null and then
// set it to the first panel the code generates.
let currentCanvas = null;

// Canvas generating elements
// Elements we can add various backgrounds to that we'll draw onto the canvas
let backgroundImg;
let characterImg;
let tag;
let speechbox = document.querySelector("#speech-box");
let credits = document.querySelector("#credits");

// Interface elements
let backgroundSelector = document.querySelector("#background-selector");
let backgroundPreview = document.querySelector("#background-selector-preview");
let characterSelector = document.querySelector("#character-selector");
let characterPreview = document.querySelector("#character-selector-preview");
let poseSelector = document.querySelector("#pose-selector");
let downloadButton = document.querySelector("#download");
let aboutButton = document.querySelector('#about-button')

// Store whether the user has deliberately chosen a character yet.
// This will prevent the default character tag being generated
// while selecting a location
let characterSelected = false;
document.body.setAttribute("character-selected", characterSelected);

// The locations to find certain visual elements
let paths = {
  character: "assets/characters/",
  location: "assets/locations/",
};

// A very long list of characters and locations are pulled in from characters.js and locations.js

// ---------------------------------------------------------------------------//

// Create our first canvas, and set it as the selected one.
generateCanvas();
currentCanvas = document.querySelector("canvas-container");

// Check whether the user is okay with spoilers or not, either by bringing up
// the spoiler window or checking whether they've already okayed spoilers
document.querySelector("#spoilers-okay").addEventListener("click", (e) => {
  checkSpoilers(e);
});
checkSpoilers();

// Generate the locations selector panel.
generateLocations();
generateLocationInterface();

// Generates the first panel in our meme, and also tells it to update if anything new is chosen from the background or character panels.
generatePanelArtwork();
backgroundSelector.addEventListener("change", generatePanelArtwork);
characterSelector.addEventListener("change", generatePanelArtwork);

// Tell the 'add panel' button to listen for clicks, and generate a new canvas if so.
document.querySelector("#add-panel").addEventListener("click", generateCanvas);

// Generate the characters dropdown. When the icons are clicked, generate the
// poses to go with the matching character.
generateCharacterInterface();
characterSelector.addEventListener("change", generatePoses);

// Make the download button download the meme when clicked.
downloadButton.addEventListener("click", download);

let toggleHeadings = document.querySelectorAll(".toggle-heading");
toggleHeadings.forEach(function (node) {
  node.addEventListener("click", function (e) {
    let associate = document.querySelector(
      "#" + e.target.getAttribute("associated-panel")
    );
    togglePanel(associate);
  });
});

// ---------------------------------------------------------------------------//

function generateLocations() {
  locations.forEach(function (location) {
    let newOption = document.createElement("option");
    newOption.textContent = location.name;
    newOption.setAttribute("value", location.id);
    backgroundSelector.appendChild(newOption);
  });
}

// Generates our canvas with the chosen backgrounds, characters and text
function generatePanelArtwork(e) {
  // Set the background image
  let backgrounds = document.querySelectorAll(
    ".canvas-container img:first-child"
  );
  backgrounds.forEach(function (background) {
    background.src = paths.location + backgroundSelector.value + ".jpg";
  });

  // If a character has been purposely selected previously then set the character image
  if (characterSelected) {
    tag.src = paths.character + characterSelector.value + "/tag.png";
  }
}

// Creates a new canvas for us, including delete button and event listeners.
function generateCanvas() {
  // Create the new canvas
  let newCanvas = document.createElement("div");
  newCanvas.classList.add("canvas-container");

  backgroundImg = document.createElement("img");
  newCanvas.appendChild(backgroundImg);

  characterImg = characterImg
    ? characterImg.cloneNode()
    : document.createElement("img");
  newCanvas.appendChild(characterImg);

  tag = tag ? tag.cloneNode() : document.createElement("img");
  newCanvas.appendChild(tag);

  newSpeechbox = document.createElement("img");
  newSpeechbox.src = "assets/game-elements/speech-box.png";
  newCanvas.appendChild(newSpeechbox);

  newTextBox = document.createElement("textarea");
  newTextBox.classList.add("text-overlay");
  newTextBox.setAttribute('placeholder', "Type your text here...");
  newTextBox.setAttribute("maxlength", 110);
  newCanvas.appendChild(newTextBox);

  // Generate the delete button and have it run removeCanvas on click.
  let deleteButton = document.createElement("div");
  deleteButton.classList.add("delete-panel");
  deleteButton.innerHTML =
    '<span class="material-icons md-17">delete</span><span class="delete-panel-text">Delete panel</span>';
  deleteButton.addEventListener("click", removeCanvas);
  newCanvas.appendChild(deleteButton);

  // When the canvas is clicked, make it the active one.
  newCanvas.addEventListener("click", function () {
    changeActiveCanvas(newCanvas);
  });

  // Add the canvas onto the page, make it the active one and put artwork in it.
  document.querySelector("#canvas-grid-item > div > div").appendChild(newCanvas);
  changeActiveCanvas(newCanvas);
  generatePanelArtwork(newCanvas);

  // Check whether we still want the canvas to be sticky, based on the height of the canvases total
  determineStickyCanvas()
}

// Make the specified canvas/panel the active one. This could be the result of a click on a canvas, or deleting an adjacent canvas.
// The activeCanvas parameter should be a <canvas> element and not a container.
function changeActiveCanvas(activeCanvas) {
  currentCanvas = activeCanvas;
  backgroundImg = activeCanvas.querySelector("img:nth-child(1)");
  characterImg = activeCanvas.querySelector("img:nth-child(2)");
  tag = activeCanvas.querySelector("img:nth-child(3)");

  let allCanvases = document.querySelectorAll(".canvas-container");
  allCanvases.forEach(function (node) {
    if (node === activeCanvas) {
      node.classList.add("active-canvas");
    } else {
      node.classList.remove("active-canvas");
    }
  });
}

// Remove a canvas/panel from the page.
function removeCanvas(e) {
  e.stopPropagation();
  let deadCanvas = e.target.closest(".canvas-container");

  if (deadCanvas.previousElementSibling) {
    // If the panel has one before it, make that the active one.
    changeActiveCanvas(deadCanvas.previousElementSibling);
  } else if (deadCanvas.nextElementSibling) {
    // If no previous one but there's a next one, make the next one the active one.
    changeActiveCanvas(deadCanvas.nextElementSibling);
  } else {
    // If this function results in there being no panel at all, generate a fresh one.
    generateCanvas();
  }

  // Run a nice animation, then delete the panel.
  deadCanvas.style.animation = "shrink 0.5s both";
  window.setTimeout(function () {
    deadCanvas.remove();
    // Check whether we still want the canvas to be sticky, based on the height of the canvases total
    determineStickyCanvas();

  }, 500);
}

function determineStickyCanvas () {
  if (window.innerWidth > 1450 && document.querySelector("#canvas-grid-item > div").offsetHeight < window.innerHeight - 100){
    document.querySelector("#canvases-container").classList.add('sticky-canvas')
  } else{
    document.querySelector("#canvases-container").classList.remove('sticky-canvas')
  }
}

determineStickyCanvas()
window.addEventListener('resize', determineStickyCanvas)

function padBody(){

  document.body.style.paddingBottom = window.innerWidth < 800
    ? '30px'
    : document.querySelector('#info-bar').offsetHeight + 10 + 'px'

  // document.body.style.marginBottom = document.querySelector('#info-bar').offsetHeight + 'px'
}

window.addEventListener('load', padBody)
window.addEventListener('resize', padBody)



// Generates the character selection window.
// Note that character-selector is a <select> element
function generateCharacterInterface() {
  // Loop through each character and...
  characters.forEach(function (character) {
    // Generate the new option for this character.
    let newOption = document.createElement("option");
    newOption.value = character.id;
    characterSelector.appendChild(newOption);

    let icon = generateLabelledIcon("character", character);
    icon.setAttribute("gender", "gender-" + character.gender); // This is set like this since 'female' contains the string 'male'
    icon.setAttribute("nationality", character.nationality);

    for (i = 0; i < 10; i++) {
      icon.setAttribute("present-in-case-" + i, character.appearsin[i]);
    }

    characterPreview.appendChild(icon);

    // If this icon is clicked....
    icon.addEventListener("click", function (e) {
      // Set an attribute on the icons to allow for selected styling.
      [].forEach.call(
        document.querySelectorAll(".character-icon"),
        function (node) {
          node.setAttribute("selected", false);
        }
      );
      e.target.setAttribute("selected", true);

      // Set the value on the invisible dropdown
      characterSelector.value = e.target.getAttribute("value");

      // Show the character preview panel, and fill it with the poses for the chosen character.
      togglePanel(characterPreview);
      generatePoses();
    });
  });
}

// Generate the interface for the location selection
function generateLocationInterface() {
  // Loop through all the specified locations and...
  locations.forEach(function (location) {
    // Generate an icon
    let icon = generateLabelledIcon("location", location);
    backgroundPreview.appendChild(icon);

    // When the icon is clicked, set the value of the invisible dropdown to match,
    // toggle the location panel off and regenerate our current panel so it can
    // have the new location
    icon.addEventListener("click", function (e) {
      backgroundSelector.value = e.target.getAttribute("value");
      togglePanel(backgroundPreview);
      generatePanelArtwork();

      // Set appropriate attributes for selected styling. Although the selector
      // toggles closed on click, this ensures you can tell which one is selected
      // if you choose to reopen it.
      [].forEach.call(
        document.querySelectorAll(".location-icon"),
        function (node) {
          node.setAttribute("selected", false);
        }
      );
      e.target.setAttribute("selected", true);
    });
  });

  // Set the first one as default selected. This only styles it and doesn't
  // do any actual functionality.
  document.querySelector(".location-icon").setAttribute("selected", true);
}

// Generate a labelled icon. This is used by both the location and character interfaces.
// type may be either 'character' or 'location'
// object should be the object we're using from either the characters or locations array.
function generateLabelledIcon(type, object) {
  let icon = document.createElement("div");
  icon.classList.add(type + "-icon");
  icon.setAttribute("value", object.id);

  // Figure out what the  image for the icon should be.
  let iconURL = "";
  switch (type) {
    case "character":
      // This is set to 1.png so it will use the first image of the character as the preview.
      iconURL = 'url("assets/characters/' + object.id + '/thumbnails/1.png")';

      let genderIcon = document.createElement("span");
      genderIcon.classList.add("character-icon-gender-tag");
      genderIcon.setAttribute("gender", object.gender);
      genderIcon.innerHTML =
        '<span class="gender-icon material-icons">' + object.gender + "</span>";
      icon.appendChild(genderIcon);

      let nationalityIcon = document.createElement("span");
      nationalityIcon.classList.add("character-icon-nationality-tag");
      nationalityIcon.style.backgroundImage =
        'url("assets/icons/flags/' + object.nationality + '.svg")';
      icon.appendChild(nationalityIcon);

      break;
    case "location":
      iconURL = 'url("assets/locations/thumbnails/' + object.id + '.png")';
      break;
  }
  icon.style.backgroundImage = iconURL;

  let label = document.createElement("div");
  label.textContent += object.name;

  if (object.variant) {
    let variantTag = document.createElement("div");
    variantTag.classList.add("variant-tag");
    variantTag.textContent = object.variant;
    label.appendChild(variantTag);
  }
  icon.appendChild(label);

  return icon;
}

// Generate the poses for the desired character.
function generatePoses(e) {
  // This initialises to false. We set this to true to confirm that the user
  // has deliberately chose a character and we're okay to go ahead with it.
  characterSelected = true;
  document.body.setAttribute("character-selected", characterSelected);

  // Figure out if this has been run from an icon click or elsewhere.
  let chosenCharacter = e ? e.target.value : characterSelector.value;

  // Reset the character if we're choosing a new one
  characterImg.src = paths.character + chosenCharacter + "/1.png";
  generatePanelArtwork();

  // Figure out how many times we need to loop through to generate all the poses.
  let imageAmount = 1;
  characters.forEach(function (character) {
    if (chosenCharacter == character.id) {
      imageAmount = character.images;
    }
  });

  // Clear the pose selector.
  poseSelector.innerHTML = null;

  // Generate each icon.
  for (let i = 1; i <= imageAmount; i++) {
    let newRadio = document.createElement("input");
    newRadio.setAttribute("type", "radio");
    newRadio.setAttribute("id", i);
    newRadio.setAttribute("name", "pose");
    newRadio.setAttribute("character", chosenCharacter);
    newRadio.value = i;
    newRadio.addEventListener("click", selectPose);
    poseSelector.appendChild(newRadio);

    let newLabel = document.createElement("label");
    newLabel.setAttribute("for", i);
    newLabel.style.backgroundImage =
      'url("assets/characters/' +
      chosenCharacter +
      "/thumbnails/" +
      i +
      '.png")';
    poseSelector.appendChild(newLabel);
  }

  poseSelector.querySelector("label").setAttribute("selected", "");
}

// When a pose is clicked, put that onto the canvas and mark it as selected.
function selectPose(e) {
  let url = e.target.getAttribute("character");
  characterImg.setAttribute(
    "src",
    paths.character + url + "/" + e.target.value + ".png"
  );
  generatePanelArtwork();
  selectItem(e);
}

// Put appropriate attributes on the specified event target and its siblings to
// be able to apply styling in the CSS.
function selectItem(e) {
  let siblings = e.target.parentNode.querySelectorAll("label");
  siblings.forEach(function (sibling) {
    sibling.removeAttribute("selected");
  });

  e.target.nextElementSibling.setAttribute("selected", "");
}

// Recreate the meme as an image file and download it.
function download() {
  // Generate a temporary canvas that we'll combine all of our individual canvases onto for download
  let downloadableCanvas = document.createElement("canvas");
  downloadableCanvas.classList.add("temp-canvas");
  downloadableCanvas.setAttribute("width", 1920);
  downloadableCanvas.setAttribute("height", 1080);
  document.body.appendChild(downloadableCanvas);

  // Get a list of all the canvases, and set the height of our temporary one to their combined heights.
  //let allCanvases = document.querySelectorAll('canvas:not(.temp-canvas)')
  let allCanvases = document.querySelectorAll(".canvas-container");
  downloadableCanvas.setAttribute("height", 1080 * allCanvases.length + 1);

  // Render the text on each one of our individual canvases, and add it onto
  // our temporary one.
  let downloadableCanvasContext = downloadableCanvas.getContext("2d");
  for (i = 0; i < allCanvases.length; i++) {
    let tempCanvas = document.createElement("canvas");
    tempCanvas.width = 1920;
    tempCanvas.height = 1080;
    let tempCanvasContext = tempCanvas.getContext("2d");


    // If there is no text in the textarea, we don't render the final two layers
    // of the canvas, which display the text box artwork
    let layersToRender = allCanvases[i].querySelector("textarea").value.length === 0 ? 3 : 5

    for (j = 1; j < layersToRender; j++) {
      let imgToDraw = allCanvases[i].querySelector("img:nth-child(" + j + ")");
      tempCanvasContext.drawImage(imgToDraw, 0, 0);
    }

    var myFont = new FontFace("Toplar", 'url("assets/fonts/Toplar.woff")');

    // Render the text

    let textBoxText = allCanvases[i].querySelector("textarea").value;

    myFont.load().then(function (font) {
      document.fonts.add(font);
    });

    let fontSize = 50;

    tempCanvasContext.font = `${fontSize}px Toplar`;
    tempCanvasContext.fillStyle = "#fff";
    wrapText(tempCanvasContext, textBoxText, 365, 882, 1200);
    downloadableCanvasContext.drawImage(tempCanvas, 0, [i * 1080]);

    function wrapText(context, text, x, y, maxWidth) {
      let words = text.split(" ");
      let line = "";

      for (let n = 0; n < words.length; n++) {
        let testLine = line + words[n] + " ";
        let metrics = context.measureText(testLine);
        let testWidth = metrics.width;
        if (testWidth > maxWidth && n > 0) {
          context.fillText(line, x, y);
          line = words[n] + " ";
          y += fontSize * 1.25;
        } else {
          line = testLine;
        }
      }
      context.fillText(line, x, y);
    }
  }

  // Add the credits onto the end.
  downloadableCanvasContext.drawImage(
    credits,
    0,
    (allCanvases.length - 1) * 1080
  );

  // Download the image, then remove the temporary canvas.

  let date = new Date()
  let formattedDate = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + " " +  date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();


  downloadButton.download = `tgaa-meme-maker-${formattedDate}.png`;
  downloadButton.href = downloadableCanvas.toDataURL();
  downloadableCanvas.remove();
}

// Simply takes a panel and toggles a 'hidden' attribute.
function togglePanel(associate) {
  associate.classList.toggle("hidden");
}

let filterButtons = document.querySelectorAll(".filter");
filterButtons.forEach(function (filter) {
  filter.addEventListener("click", function (e) {
    let filterType = e.target.getAttribute("filter-type");
    let filterValue = e.target.getAttribute("filter-value");
    let panel = e.target.closest('div[id*="selector"]');
    let icons = panel.querySelectorAll('div[class*="icon"]');

    if (filterType && filterValue !== "all") {
      icons.forEach(function (icon) {
        //icon.classList.remove('toggled-off')
        if (icon.getAttribute(filterType) == filterValue) {
          icon.setAttribute("toggled", "on");
        } else {
          icon.setAttribute("toggled", "off");
        }
      });
    } else if (filterValue == "all") {
      icons.forEach(function (icon) {
        icon.setAttribute("toggled", "on");
      });
    }
  });
});

document.querySelector(".filter-form").addEventListener("click", filterItems);

function filterItems(e) {
  let panel = e.target.closest(".filter-form");

  let chosenFilterNodes = panel.querySelectorAll('[checked="checked"]');

  let acceptableGenders = [];
  chosenFilterNodes.forEach(function (node) {
    if (
      node.getAttribute("checked") == "checked" &&
      node.getAttribute("filter-type") == "gender"
    ) {
      acceptableGenders.push(node.value);
    }
  });

  let acceptableNationalities = [];
  chosenFilterNodes.forEach(function (node) {
    if (
      node.getAttribute("checked") == "checked" &&
      node.getAttribute("filter-type") == "nationality"
    ) {
      acceptableNationalities.push(node.value);
    }
  });

  let acceptableCases = [];

  chosenFilterNodes.forEach(function (node) {
    if (
      node.getAttribute("checked") == "checked" &&
      node.getAttribute("filter-type") == "present-in"
    ) {
      acceptableCases.push(node.value);
    }
  });

  let icons = panel.parentNode.querySelectorAll('div[class*="icon"]');
  icons.forEach(function (icon) {
    icon.setAttribute("toggled", "false");

    let genderMatch = false;
    let nationalityMatch = false;
    let caseMatch = false;

    acceptableGenders.forEach(function (gender) {
      if (icon.outerHTML.indexOf(gender) > 0) {
        genderMatch = true;
      }
    });

    acceptableNationalities.forEach(function (nationality) {
      if (
        nationality == "other" &&
        icon.outerHTML.indexOf("british") < 0 &&
        icon.outerHTML.indexOf("japanese") < 0
      ) {
        nationalityMatch = true;
      }

      if (icon.outerHTML.indexOf(nationality) > 0) {
        nationalityMatch = true;
      }
    });

    acceptableCases.forEach(function (gamecase) {
      if (
        icon.outerHTML.indexOf("present-in-case-" + gamecase + '="true"') > 0
      ) {
        caseMatch = true;
      }
    });

    if (genderMatch && nationalityMatch && caseMatch) {
      icon.setAttribute("toggled", "on");
    }
  });
}

document
  .querySelector(".reset-filters")
  .addEventListener("click", function (e) {
    e.stopPropagation();
    let checkboxes = e.target
      .closest(".filter-form")
      .querySelectorAll('input[type="checkbox"]');

    checkboxes.forEach(function (checkbox) {
      checkbox.setAttribute("checked", "checked");
      checkbox.checked = true;
    });
    filterItems(e);
  });

let checkboxes = document.querySelectorAll('input[type="checkbox"]');
checkboxes.forEach(function (node) {
  node.addEventListener("click", function (e) {
    if (e.target.getAttribute("checked") == "checked") {
      e.target.setAttribute("checked", "false");
    } else {
      e.target.setAttribute("checked", "checked");
    }
  });
});

function checkSpoilers(e) {
  let spoilerWarning = document.querySelector("#spoiler-warning");

  if (
    document.querySelector("#remember-spoilers-okay").checked ||
    window.localStorage.getItem("reveal-spoilers")
  ) {
    localStorage.setItem("reveal-spoilers", true);
    spoilerWarning.remove();
  }

  // If this is running as the result of an event, it means that the okay
  // button has been clicked, therefore close the spoiler window.
  if (e && spoilerWarning) {
    spoilerWarning.remove();
  }
}

async function displayWeather() {


  let myPromises = [
    fetch(
      'https://api.openweathermap.org/data/2.5/weather?units=metric&lat=51.5200&lon=-0.1566&appid=05b8bf4b22e67da44ad9672eef66e607'
    ), // London weather
    fetch(
      "http://worldtimeapi.org/api/timezone/Europe/London"
    ), // London time
    fetch(
      'https://api.openweathermap.org/data/2.5/weather?units=metric&lat=35.6762&lon=-139.6503&appid=05b8bf4b22e67da44ad9672eef66e607'
    ), // Tokyo weather
    fetch(
      "http://worldtimeapi.org/api/timezone/Asia/Tokyo"
    ), // Tokyo time
  ] // returns array of promises

  const promiseData = Promise.all(myPromises)

  promiseData
    .then((responses) => {
      const jsonResponsePromises = responses.map(r => r.json()) // make the responses into promises with their json values inside
      return jsonResponsePromises;
    })
    .then((data) => {
      
      Promise.all(data)
      .then((info) => {
        displayData(info)
        
        // Update the time every 5 seconds. This is a tradeoff between wanting to
        // keep the time up to date, but not having to keep checking too often
        window.setInterval(updateTime, 5000)
        
        window.addEventListener('resize', updateTime)
      })
    })
    .catch(failure => console.log(failure)) // array of responses


  async function updateTime() {
    
    const localTime = new Date()
    const britishTimeDisplay = document.querySelector('.british-time')
    const japaneseTimeDisplay = document.querySelector('.japanese-time')
    const displayedMinutes = britishTimeDisplay.textContent.slice(3,5)

    if (britishTimeDisplay?.textContent === ''){
      // The time may be blank as a result of a previous failed API call.
      //  If so, we'll try again
      getNewTime()

      // If the minutes we're displaying aren't the same as the real life minutes past the hour
    } else if (localTime.getMinutes().toString() !== displayedMinutes){
  
      // If we're in a new hour, get a new time from the API. This will ensure we
      // are displaying the correct time if daylight savings is happening, rather
      // than us just incrementing the hour.
      if (localTime.getMinutes() === 0){
        getNewTime()
      } else{
        britishTimeDisplay.textContent = britishTimeDisplay.textContent.slice(0, 2) + ':' + localTime.getMinutes().toString().padStart(2, '0')
        japaneseTimeDisplay.textContent = japaneseTimeDisplay.textContent.slice(0, 2) + ':' + localTime.getMinutes().toString().padStart(2, '0')
      }
    }

    // If the minutes are the same, we don't need to update anything.




    async function getNewTime(){
      let myPromises = [
        fetch(
          "http://worldtimeapi.org/api/timezone/Europe/London"
        ), // London time
        fetch(
          "http://worldtimeapi.org/api/timezone/Asia/Tokyo"
        ), // Tokyo time
      ]

      const responses = await Promise.all(myPromises)
        .catch(failure => {
            console.log('failed to update time')
            console.log(failure)

            britishTimeDisplay.textContent = ''
            japaneseTimeDisplay.textContent = ''
          }
        )
        .then((responses) => {
          responses.map(r => r.json())
        })
        .then((data) => {
          britishTimeDisplay.textContent = data[0].datetime.slice(11,16)
          japaneseTimeDisplay.textContent = data[1].datetime.slice(11,16)
        })

    }
  }
  

  function displayData(data){
    let weatherArea = document.querySelector("#weather-bar");
    weatherArea.innerHTML = '';
    displayPanel(data[0], data[1], 'London, Great Britain',)
    displayPanel(data[2], data[3], 'Tokyo, Japan')

    function displayPanel(weather, time, city){
      let panel = document.createElement('div')


      panel.innerHTML = `
          <img class="weather-bar-flag" src="assets/icons/flags/${
              city === "London, Great Britain" ? "british" : "japanese"
          }.svg" width=32>
          <div class="weather-bar-details">
            ${city}<br>
            <span class=${city === "London, Great Britain" ? "british" : "japanese"}-time>${(time.datetime).slice(11,16)}</span>
            <span>${Math.round(weather.main.temp)}&deg;C</span>
            <span>${weather.weather[0].description} <br></span>
          </div>
        <img src="http://openweathermap.org/img/wn/${weather.weather[0].icon}.png">

        
      `

      weatherArea.appendChild(panel)
    }
    
  }
}



displayWeather();


/* About section -------------------------------------------------------------*/

aboutButton.addEventListener('click', () => {
  document.body.classList.toggle('show-about')
})


/* Random quotes -------------------------------------------------------------*/

// url is the address to fetch
// assuming the response returns a json object, the propName is the property we are looking to use.
// If the response is expected to be an array, we put 'array' as the propName
const quoteData = {
  kanye: {
    url: 'https://api.kanye.rest/',
    propName: 'quote',
  },
  dadJoke: {
    url: 'https://icanhazdadjoke.com/',
    options: {
      headers: {
        Accept: "application/json"
      }
    },
    propName: 'joke'
  },
  ronSwanson:{
    url: 'https://ron-swanson-quotes.herokuapp.com/v2/quotes',
    propName: 'array'
  },
  advice: {
    url: 'https://api.adviceslip.com/advice',
    propName: 'slip',
    innerPropName: 'advice'
  }
}


function pasteQuote(type){

  fetch(quoteData[type].url, quoteData[type].options)
    .then((response) => response.json())
    .then((data) => {
      let property = quoteData[type].propName
      let innerProperty = quoteData[type].innerPropName

      let text

      if (property === 'array'){
        text = data[0]
      } else if (innerProperty){
        text = data[property][innerProperty]
      } else{
        text = data[property]
      }


      // If the quote is too long, get a new one.
      // Otherwise go ahead and use it.
      if (text.length > 110){
        pasteQuote(type)
      } else{
        console.log(data)
        document.querySelector('.active-canvas textarea').value = text
      }
    })
    .catch(failure => {
      console.log(failure)
    }
  )
    .finally(() => {
      if (quoteData[type].timeout){
        const quoteButton = document.querySelector('.quote-button[type="' + type + '"]')
        quoteButton.classList.add('disabled')
        window.setTimeout(() => {
          quoteButton.classList.remove('disabled')
        }, quoteData[type].timeout)
      }
    })

}



['kanye', 'dadJoke', 'ronSwanson', 'advice'].forEach((type) => {
  document.querySelector(`.quote-button[type="${type}"]`).addEventListener('click', () => {
    pasteQuote(type)
  })
})

// pasteQuote('advice')


// const url = 'https://api.adviceslip.com/advice'
// const options = {
//   // headers: {
//   //   'Accept': 'application/json'
//   // }
// }


// fetch(url, options)
//   .then((response) => response.json())
//   .then((data) => {
//     console.log(data)
//   })
//   .catch((err) => {
//     console.log(err)
//   })