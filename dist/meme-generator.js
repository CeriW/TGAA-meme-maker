var _a;
// Version info
const versionInfo = '4.1.0 - 2023-03-24';
import { locations } from "./locations.js";
import { characters } from "./characters.js";
import { setTheme } from "./themes.js";
import { michaelScott, deadpool } from "./random-quotes.js";
const theme = setTheme();
console.log(`The Great Ace Attorney Meme Maker by CherryLestrade v${versionInfo} - theme: ${(_a = theme.name) !== null && _a !== void 0 ? _a : 'none'}`);
const versionInfoDiv = document.querySelector('#version-info');
versionInfoDiv.innerHTML = `Version ${versionInfo} - theme: none`;
// ---------------------------------------------------------------------------//
// The current canvas the user is working on. We'll initialise to null and then
// set it to the first panel the code generates.
let currentCanvas;
// Canvas generating elements
// Elements we can add various backgrounds to that we'll draw onto the canvas
let backgroundImg;
let characterImg;
let tag;
let characterOverlay;
let characterOverlayID = null;
let speechbox = document.querySelector("#speech-box");
let credits = document.querySelector("#credits");
// Name related variables
const existingNamesInUse = window.localStorage.getItem('alternateNamesInUse');
let alternateNamesInUse = existingNamesInUse ? JSON.parse(existingNamesInUse) : {}; // An object storing the alternate names the user has chosen.
let prefersJapaneseNames = window.localStorage.getItem('prefersJapaneseNames') === "true"; // If this is true, names will default to Japanese for characters that have them.
// Interface elements
const backgroundSelector = document.querySelector("#background-selector");
const backgroundPreview = document.querySelector("#background-selector-preview");
const characterSelector = document.querySelector("#character-selector"); // an invisible select element that stores what character we've selected
const characterPreview = document.querySelector("#character-selector-preview");
const poseSelector = document.querySelector("#pose-selector");
const downloadButton = document.querySelector("#download");
const aboutButton = document.querySelector('#about-button');
const modalContent = document.querySelector('#modal-content');
// Store whether the user has deliberately chosen a character yet.
// This will prevent the default character tag being generated
// while selecting a location
let characterSelected = false;
document.body.setAttribute("character-selected", String(characterSelected));
let charactersInUse = [];
// The locations to find certain visual elements
const paths = {
    character: "assets/characters/",
    location: "assets/locations/",
};
// How many days we show 'new' tags for on icons
const daysForNew = 14;
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
// If the theme isn't a spoiler, change the theme immediately.
if (theme.name && !theme.isSpoiler) {
    document.body.setAttribute('theme', theme.name);
}
;
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
        let associate = document.querySelector("#" + e.target.getAttribute("associated-panel"));
        if (associate) {
            togglePanel(associate);
        }
    });
});
togglePanel(document.querySelector('#filter-form'));
document.querySelector('#filter-toggle').addEventListener('click', () => {
    togglePanel(document.querySelector('#filter-form'));
});
document.querySelectorAll('#modal .material-symbols-sharp').forEach((button) => {
    button.addEventListener('click', () => {
        togglePanel(document.querySelector('#modal'));
    });
});
document.querySelector('#edit-names-toggle').addEventListener('click', () => {
    togglePanel(document.querySelector('#modal'));
    generateNameSelectorWindow();
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
function generatePanelArtwork() {
    // Set the background image
    let backgrounds = document.querySelectorAll(".canvas-container img:first-child");
    backgrounds.forEach(function (background) {
        background.src = paths.location + backgroundSelector.value + ".jpg";
    });
    characterOverlay.src = `/assets/locations/${characterOverlayID}.png`;
    let overlays = document.querySelectorAll(".canvas-container img:nth-child(3)");
    overlays.forEach(function (overlay) {
        overlay.src = characterOverlay.src;
    });
    // If a character has been purposely selected previously then set the character image
    if (characterSelected) {
        let currentCharacter = getCharacterFromID(characterSelector.value);
        if (currentCharacter) {
            if (currentCharacter.alternateNames) {
                generateNameSelectorWindow();
                tag.setAttribute('character', currentCharacter.alternateNames[0]);
            }
            else {
                tag.setAttribute('character', currentCharacter.id);
            }
        }
        propagateAlternateNames();
        getCharactersInUse();
        let charactersInUseHaveAlternateNames = false;
        charactersInUse.forEach((char) => {
            if (!getCharacterFromID(char)) {
                charactersInUseHaveAlternateNames = true;
            }
        });
        if (charactersInUseHaveAlternateNames) {
            document.querySelector('#edit-names-toggle').classList.remove('hidden');
        }
        else {
            document.querySelector('#edit-names-toggle').classList.add('hidden');
        }
    }
}
export function getCharacterFromID(characterID) {
    return characters.find((character) => character.id === characterID);
}
// Loop through all of the character tag artwork and update accordingly.
function propagateAlternateNames() {
    let tagImages = document.querySelectorAll('.tag-image');
    tagImages.forEach((image) => {
        var _a;
        let thisCharacter = image.getAttribute('character');
        if (thisCharacter) {
            let currentCharacter = (_a = characters.find((character) => { var _a; return ((_a = character.alternateNames) !== null && _a !== void 0 ? _a : []).includes(String(image.getAttribute('character'))); })) !== null && _a !== void 0 ? _a : getCharacterFromID(thisCharacter);
            let tagPath = alternateNamesInUse[thisCharacter] ? ("/tag-" + alternateNamesInUse[thisCharacter] + '.png').toLowerCase() : "/tag-default.png";
            if (currentCharacter) {
                image.src = paths.character + currentCharacter.id + tagPath;
            }
        }
    });
}
// Creates a new canvas for us, including delete button and event listeners.
function generateCanvas() {
    var _a;
    // Create the new canvas
    let newCanvas = document.createElement("div");
    newCanvas.classList.add("canvas-container");
    backgroundImg = document.createElement("img");
    newCanvas.appendChild(backgroundImg);
    characterImg = characterImg
        ? characterImg.cloneNode()
        : document.createElement("img");
    newCanvas.appendChild(characterImg);
    characterOverlay = characterOverlay ? characterOverlay.cloneNode() : document.createElement("img");
    characterOverlay.classList.add("character-overlay");
    characterOverlay.src = `/assets/locations/${characterOverlayID}.png`;
    newCanvas.appendChild(characterOverlay);
    tag = tag ? tag.cloneNode() : document.createElement("img");
    tag.classList.add('tag-image');
    newCanvas.appendChild(tag);
    let newSpeechbox = document.createElement("img");
    newSpeechbox.src = "assets/game-elements/speech-box.png";
    newCanvas.appendChild(newSpeechbox);
    let newTextBox = document.createElement("textarea");
    newTextBox.classList.add("text-overlay");
    newTextBox.setAttribute('placeholder', "Type your text here...");
    newTextBox.setAttribute("maxlength", '115');
    newCanvas.appendChild(newTextBox);
    let textColourRadios = document.createElement('div');
    textColourRadios.classList.add("text-colour-selector");
    let groupCode = Date.now();
    textColourRadios.innerHTML = `
    <input type="radio" name="group${groupCode}" id="default${groupCode}" value="default" checked></input>
    <label for="default${groupCode}" value="default">
      <span class="material-symbols-sharp">done</span>
    </label>
    <input type="radio" name="group${groupCode}" id="thought${groupCode}" value="thought"></input>
    <label for="thought${groupCode}" value="thought">
      <span class="material-symbols-sharp">done</span>
    </label>
  `;
    newCanvas.appendChild(textColourRadios);
    textColourRadios.addEventListener('click', (e) => {
        var _a;
        const target = e.target;
        const value = target.value;
        const targetTextArea = (_a = textColourRadios.parentNode) === null || _a === void 0 ? void 0 : _a.querySelector('textarea.text-overlay');
        if (value && targetTextArea) {
            targetTextArea.setAttribute('type', value); // previousElementSibling should be the textarea
        }
    });
    // Generate the delete button and have it run removeCanvas on click.
    let deleteButton = document.createElement("div");
    deleteButton.classList.add("delete-panel");
    deleteButton.innerHTML =
        '<span class="material-symbols-sharp md-17">delete</span><span class="delete-panel-text">Delete panel</span>';
    deleteButton.addEventListener("click", removeCanvas);
    newCanvas.appendChild(deleteButton);
    // When the canvas is clicked, make it the active one.
    newCanvas.addEventListener("click", function () {
        changeActiveCanvas(newCanvas);
    });
    // Add the canvas onto the page, make it the active one and put artwork in it.
    (_a = document.querySelector("#canvas-grid-item > div > div")) === null || _a === void 0 ? void 0 : _a.appendChild(newCanvas);
    changeActiveCanvas(newCanvas);
    generatePanelArtwork();
    // Check whether we still want the canvas to be sticky, based on the height of the canvases total
    determineStickyCanvas();
}
// Make the specified canvas/panel the active one. This could be the result of a click on a canvas, or deleting an adjacent canvas.
// The activeCanvas parameter should be a <canvas> element and not a container.
function changeActiveCanvas(activeCanvas) {
    currentCanvas = activeCanvas;
    backgroundImg = activeCanvas.querySelector("img:nth-child(1)");
    characterImg = activeCanvas.querySelector("img:nth-child(2)");
    characterOverlay = activeCanvas.querySelector("img:nth-child(3)");
    tag = activeCanvas.querySelector("img:nth-child(4)");
    let allCanvases = document.querySelectorAll(".canvas-container");
    allCanvases.forEach(function (node) {
        if (node === activeCanvas) {
            node.classList.add("active-canvas");
        }
        else {
            node.classList.remove("active-canvas");
        }
    });
}
// Remove a canvas/panel from the page.
function removeCanvas(e) {
    e.stopPropagation();
    let deadCanvas = e.target.closest(".canvas-container");
    if (deadCanvas) {
        if (deadCanvas.previousElementSibling && deadCanvas.previousElementSibling.id !== "download") {
            // If the panel has one before it, make that the active one.
            changeActiveCanvas(deadCanvas.previousElementSibling);
        }
        else if (deadCanvas.nextElementSibling) {
            // If no previous one but there's a next one, make the next one the active one.
            changeActiveCanvas(deadCanvas.nextElementSibling);
        }
        else {
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
}
function determineStickyCanvas() {
    var _a, _b, _c;
    if (window.innerWidth > 1450 && ((_a = document.querySelector("#canvas-grid-item > div")) === null || _a === void 0 ? void 0 : _a.offsetHeight) < window.innerHeight - 100) {
        (_b = document.querySelector("#sticky-panel")) === null || _b === void 0 ? void 0 : _b.classList.add('sticky-canvas');
    }
    else {
        (_c = document.querySelector("#sticky-panel")) === null || _c === void 0 ? void 0 : _c.classList.remove('sticky-canvas');
    }
}
determineStickyCanvas();
window.addEventListener('resize', determineStickyCanvas);
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
        if (theme.name && character.tags.includes(theme.name)) {
            icon.style.order = '-' + new Date().getTime() * 2; // A crude way of making sure that theme characters take precedence over new characters
        }
        for (let i = 0; i < 10; i++) {
            icon.setAttribute("present-in-case-" + i, String(character.appearsIn[i]));
        }
        characterPreview.appendChild(icon);
        // If this icon is clicked....
        icon.addEventListener("click", function (e) {
            // Set an attribute on the icons to allow for selected styling.
            [].forEach.call(document.querySelectorAll(".character-icon"), function (node) {
                node.setAttribute("selected", 'false');
            });
            e.target.setAttribute("selected", 'true');
            // Set the value on the invisible dropdown
            let value = e.target.getAttribute("value");
            if (value) {
                characterSelector.value = value;
            }
            // If the user has not used this character before and has indicated they like the Japanese names, store their new name in the alternate names object.
            if (character.alternateNames && !alternateNamesInUse[character.alternateNames[0]] && prefersJapaneseNames) {
                alternateNamesInUse[character.alternateNames[0]] = character.alternateNames[1];
                window.localStorage.setItem('alternateNamesInUse', JSON.stringify(alternateNamesInUse));
            }
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
        if (location.tags && (theme === null || theme === void 0 ? void 0 : theme.name) && location.tags.includes(theme.name)) {
            icon.style.order = '-' + new Date().getTime() * 2;
        }
        // When the icon is clicked, set the value of the invisible dropdown to match,
        // toggle the location panel off and regenerate our current panel so it can
        // have the new location
        icon.addEventListener("click", function (e) {
            var _a, _b;
            let myTarget = e.target;
            let value = myTarget.getAttribute("value");
            if (value) {
                backgroundSelector.value = value;
                characterOverlayID = (_b = (_a = locations.find((location) => location.id === backgroundSelector.value)) === null || _a === void 0 ? void 0 : _a.characterOverlay) !== null && _b !== void 0 ? _b : null;
            }
            togglePanel(backgroundPreview);
            generatePanelArtwork();
            // Set appropriate attributes for selected styling. Although the selector
            // toggles closed on click, this ensures you can tell which one is selected
            // if you choose to reopen it.
            let icons = document.querySelectorAll(".location-icon");
            if (icons.length > 0) {
                icons.forEach((icon) => {
                    icon.setAttribute("selected", 'false');
                });
            }
            myTarget.setAttribute("selected", 'true');
        });
    });
    // Set the first one as default selected. This only styles it and doesn't
    // do any actual functionality.
    document.querySelector(".location-icon").setAttribute("selected", 'true');
}
// Generate a labelled icon. This is used by both the location and character interfaces.
// type may be either 'character' or 'location'
// object should be the object we're using from either the characters or locations array.
function generateLabelledIcon(type, object) {
    var _a;
    let icon = document.createElement("div");
    icon.classList.add(type + "-icon");
    icon.setAttribute("value", object.id);
    // Figure out what the  image for the icon should be.
    let iconURL = "";
    switch (type) {
        case "character":
            const myCharacter = object;
            // This is set to 1.png so it will use the first image of the character as the preview.
            iconURL = 'url("assets/characters/' + object.id + '/thumbnails/1.png")';
            let genderIcon = document.createElement("span");
            genderIcon.classList.add("character-icon-gender-tag");
            genderIcon.setAttribute("gender", myCharacter.gender);
            genderIcon.innerHTML =
                '<span class="gender-icon material-icons">' + myCharacter.gender + "</span>";
            icon.appendChild(genderIcon);
            let nationalityIcon = document.createElement("span");
            nationalityIcon.classList.add("character-icon-nationality-tag");
            nationalityIcon.style.backgroundImage =
                'url("assets/icons/flags/' + myCharacter.nationality + '.svg")';
            icon.appendChild(nationalityIcon);
            if (myCharacter.lastUpdated && (new Date().getTime() - new Date(myCharacter.lastUpdated).getTime()) / 86400000 < daysForNew) {
                let newIcon = document.createElement('img');
                newIcon.classList.add('new-icon');
                newIcon.src = "/assets/icons/new-icon.svg";
                newIcon.width = 50;
                icon.appendChild(newIcon);
                icon.style.order = '-' + new Date(myCharacter.lastUpdated).getTime() / 10000;
            }
            if (theme.name && myCharacter.tags.includes(theme.name)) {
                let themeIcon = document.createElement('div');
                themeIcon.classList.add('theme-star');
                icon.appendChild(themeIcon);
            }
            break;
        case "location":
            const myLocation = object;
            iconURL = 'url("assets/locations/thumbnails/' + object.id + '.png")';
            if (myLocation.addedDate && (new Date().getTime() - new Date(myLocation.addedDate).getTime()) / 86400000 < daysForNew) {
                let newIcon = document.createElement('img');
                newIcon.classList.add('new-icon');
                newIcon.src = "/assets/icons/new-icon.svg";
                newIcon.width = 50;
                icon.appendChild(newIcon);
                icon.style.order = '-' + new Date(myLocation.addedDate).getTime() / 10000;
            }
            if (theme.name && ((_a = myLocation.tags) === null || _a === void 0 ? void 0 : _a.includes(theme.name))) {
                let themeIcon = document.createElement('div');
                themeIcon.classList.add('theme-star');
                icon.appendChild(themeIcon);
            }
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
    var _a, _b, _c;
    // This initialises to false. We set this to true to confirm that the user
    // has deliberately chose a character and we're okay to go ahead with it.
    characterSelected = true;
    document.body.setAttribute("character-selected", 'characterSelected');
    // Figure out if this has been run from an icon click or elsewhere.
    let chosenCharacter = e ? e.target.value : characterSelector.value;
    // Reset the character if we're choosing a new one
    characterImg.src = paths.character + chosenCharacter + "/1.png";
    characterImg.classList.add('character-img');
    characterImg.setAttribute('character', chosenCharacter);
    let currentCharacter = getCharacterFromID(chosenCharacter);
    if ((currentCharacter === null || currentCharacter === void 0 ? void 0 : currentCharacter.alternateNames) && !alternateNamesInUse[currentCharacter.alternateNames[0]]) {
        alternateNamesInUse[currentCharacter.alternateNames[0]] = (_a = currentCharacter.alternateNames[0]) !== null && _a !== void 0 ? _a : 'default';
        window.localStorage.setItem('alternateNamesInUse', JSON.stringify(alternateNamesInUse));
    }
    document.querySelector('#theme-music').innerHTML =
        (currentCharacter === null || currentCharacter === void 0 ? void 0 : currentCharacter.theme)
            ? `<iframe style="border-radius:12px" src="
    ${(_b = currentCharacter.theme) !== null && _b !== void 0 ? _b : ''}
    &theme=0" width="100%" height="100" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>
    `
            : '';
    generatePanelArtwork();
    // Figure out how many times we need to loop through to generate all the poses.
    let imageAmount = 1;
    characters.forEach(function (character) {
        if (chosenCharacter == character.id) {
            imageAmount = character.images;
        }
    });
    // Clear the pose selector.
    poseSelector.innerHTML = '';
    // Generate each icon.
    for (let i = 1; i <= imageAmount; i++) {
        let newRadio = document.createElement("input");
        newRadio.setAttribute("type", "radio");
        newRadio.setAttribute("id", String(i));
        newRadio.setAttribute("name", "pose");
        newRadio.setAttribute("character", chosenCharacter);
        newRadio.value = String(i);
        newRadio.addEventListener("click", selectPose);
        poseSelector.appendChild(newRadio);
        let newLabel = document.createElement("label");
        newLabel.setAttribute("for", String(i));
        newLabel.style.backgroundImage =
            'url("assets/characters/' +
                chosenCharacter +
                "/thumbnails/" +
                i +
                '.png")';
        poseSelector.appendChild(newLabel);
        if (currentCharacter
            && currentCharacter.posesAddedOnLastUpdate
            && currentCharacter.lastUpdated
            && i > (currentCharacter.images - currentCharacter.posesAddedOnLastUpdate)
            && (new Date().getTime() - new Date(currentCharacter.lastUpdated).getTime()) / (1000 * 60 * 60 * 24) < daysForNew) {
            let newIcon = document.createElement('img');
            newIcon.classList.add('new-icon');
            newIcon.src = "/assets/icons/new-icon.svg";
            newIcon.width = 50;
            newLabel.style.order = '-' + new Date(currentCharacter.lastUpdated).getTime() / 1000;
            newLabel.appendChild(newIcon);
        }
    }
    (_c = poseSelector.querySelector("label")) === null || _c === void 0 ? void 0 : _c.setAttribute("selected", "");
}
// When a pose is clicked, put that onto the canvas and mark it as selected.
function selectPose(e) {
    let myTarget = e.target;
    let url = myTarget.getAttribute("character");
    characterImg.setAttribute("src", paths.character + url + "/" + myTarget.value + ".png");
    generatePanelArtwork();
    selectItem(e);
}
// Put appropriate attributes on the specified event target and its siblings to
// be able to apply styling in the CSS.
function selectItem(e) {
    var _a, _b;
    let siblings = (_a = e.target.parentNode) === null || _a === void 0 ? void 0 : _a.querySelectorAll("label");
    if (siblings && siblings.length > 0) {
        siblings.forEach(function (sibling) {
            sibling.removeAttribute("selected");
        });
    }
    (_b = e.target.nextElementSibling) === null || _b === void 0 ? void 0 : _b.setAttribute("selected", "");
}
// Recreate the meme as an image file and download it.
function download(e) {
    e.preventDefault();
    // Generate a temporary canvas that we'll combine all of our individual canvases onto for download
    let downloadableCanvas = document.createElement("canvas");
    downloadableCanvas.classList.add("temp-canvas");
    downloadableCanvas.setAttribute("width", '1920');
    downloadableCanvas.setAttribute("height", '1080');
    // document.body.appendChild(downloadableCanvas);
    // Get a list of all the canvases, and set the height of our temporary one to their combined heights.
    //let allCanvases = document.querySelectorAll('canvas:not(.temp-canvas)')
    let allCanvases = document.querySelectorAll(".canvas-container");
    downloadableCanvas.setAttribute("height", String(1080 * allCanvases.length));
    // Render the text on each one of our individual canvases, and add it onto
    // our temporary one.
    let downloadableCanvasContext = downloadableCanvas.getContext("2d");
    if (allCanvases.length > 0) {
        for (let i = 0; i < allCanvases.length; i++) {
            let tempCanvas = document.createElement("canvas");
            tempCanvas.width = 1920;
            tempCanvas.height = 1080;
            let tempCanvasContext = tempCanvas.getContext("2d");
            // If there is no text in the textarea, we don't render the final two layers
            // of the canvas, which display the text box artwork
            let layersToRender = allCanvases[i].querySelector("textarea").value.length === 0 ? 4 : 6;
            for (let j = 1; j < layersToRender; j++) {
                let imgToDraw = allCanvases[i].querySelector("img:nth-child(" + j + ")");
                tempCanvasContext === null || tempCanvasContext === void 0 ? void 0 : tempCanvasContext.drawImage(imgToDraw, 0, 0);
            }
            var myFont = new FontFace("Toplar", 'url("assets/fonts/Toplar.woff")');
            // Render the text
            let textBoxText = allCanvases[i].querySelector("textarea").value;
            myFont.load().then(function (font) {
                document.fonts.add(font);
            });
            let fontSize = 50;
            tempCanvasContext.font = `${fontSize}px Toplar`;
            tempCanvasContext.fillStyle = allCanvases[i].querySelector("textarea").getAttribute('type') === "thought" ? "#07bff0" : "#fff";
            wrapText(tempCanvasContext, textBoxText, 365, 882, 1200);
            downloadableCanvasContext.drawImage(tempCanvas, 0, i * 1080);
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
                    }
                    else {
                        line = testLine;
                    }
                }
                context.fillText(line, x, y);
            }
        }
    }
    // Add the credits onto the end.
    downloadableCanvasContext.drawImage(credits, 0, (allCanvases.length - 1) * 1080);
    // Download the image, then remove the temporary canvas.
    let date = new Date();
    let formattedDate = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
    downloadableCanvas.toBlob((blob) => {
        if (!blob) {
            return;
        }
        const newImg = document.createElement('img');
        const url = URL.createObjectURL(blob);
        const downloadLink = document.createElement('a');
        newImg.onload = () => {
            // no longer need to read the blob so it's revoked
            downloadLink.href = url;
            downloadLink.target = "_blank";
            downloadLink.download = `tgaa-meme-maker - ${formattedDate} - #tgaaMemeMaker.png`;
            downloadLink.click();
            URL.revokeObjectURL(url);
        };
        newImg.src = url;
        newImg.style.display = 'none';
        document.body.appendChild(newImg);
        document.body.appendChild(downloadLink);
        downloadLink.remove();
        newImg.remove();
        downloadableCanvas.remove();
    });
}
// Simply takes a panel and toggles a 'hidden' attribute.
function togglePanel(associate) {
    associate.classList.toggle("hidden");
}
let filterButtons = document.querySelectorAll(".filter");
filterButtons.forEach(function (filter) {
    filter.addEventListener("click", function (e) {
        var _a, _b;
        let myTarget = e.target;
        let filterType = (_a = myTarget.getAttribute("filter-type")) !== null && _a !== void 0 ? _a : '';
        let filterValue = (_b = myTarget.getAttribute("filter-value")) !== null && _b !== void 0 ? _b : '';
        let panel = myTarget.closest('div[id*="selector"]');
        let icons = panel === null || panel === void 0 ? void 0 : panel.querySelectorAll('div[class*="icon"]');
        if (filterType && filterValue !== "all" && icons) {
            icons.forEach(function (icon) {
                //icon.classList.remove('toggled-off')
                if (icon.getAttribute(filterType) == filterValue) {
                    icon.setAttribute("toggled", "on");
                }
                else {
                    icon.setAttribute("toggled", "off");
                }
            });
        }
        else if (filterValue == "all" && icons) {
            icons.forEach(function (icon) {
                icon.setAttribute("toggled", "on");
            });
        }
    });
});
document.querySelector("#filter-form").addEventListener("click", filterItems);
function filterItems(e) {
    let panel = e.target.closest("#filter-form");
    let chosenFilterNodes = panel.querySelectorAll('[checked="checked"]');
    let acceptableGenders = [];
    chosenFilterNodes.forEach(function (node) {
        if (node.getAttribute("checked") == "checked" &&
            node.getAttribute("filter-type") == "gender") {
            acceptableGenders.push(node.value);
        }
    });
    let acceptableNationalities = [];
    chosenFilterNodes.forEach(function (node) {
        if (node.getAttribute("checked") == "checked" &&
            node.getAttribute("filter-type") == "nationality") {
            acceptableNationalities.push(node.value);
        }
    });
    let acceptableCases = [];
    chosenFilterNodes.forEach(function (node) {
        if (node.getAttribute("checked") == "checked" &&
            node.getAttribute("filter-type") == "present-in") {
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
            if (nationality == "other" &&
                icon.outerHTML.indexOf("british") < 0 &&
                icon.outerHTML.indexOf("japanese") < 0) {
                nationalityMatch = true;
            }
            if (icon.outerHTML.indexOf(nationality) > 0) {
                nationalityMatch = true;
            }
        });
        acceptableCases.forEach(function (gamecase) {
            if (icon.outerHTML.indexOf("present-in-case-" + gamecase + '="true"') > 0) {
                caseMatch = true;
            }
        });
        if (genderMatch && nationalityMatch && caseMatch) {
            icon.setAttribute("toggled", "on");
        }
    });
}
document
    .querySelector(".reset-filters").addEventListener("click", function (e) {
    e.stopPropagation();
    let checkboxes = e.target
        .closest("#filter-form")
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
        }
        else {
            e.target.setAttribute("checked", "checked");
        }
    });
});
function checkSpoilers(e) {
    let spoilerWarning = document.querySelector("#spoiler-warning");
    if (document.querySelector("#remember-spoilers-okay").checked ||
        window.localStorage.getItem("reveal-spoilers")) {
        window.localStorage.setItem("reveal-spoilers", 'true');
        spoilerWarning.remove();
        document.body.setAttribute('accept-spoilers', 'true');
        if (theme.name) {
            document.body.setAttribute('theme', theme.name);
        }
    }
    // If this is running as the result of an event, it means that the okay
    // button has been clicked, therefore close the spoiler window.
    if (e && spoilerWarning) {
        spoilerWarning.remove();
        document.body.setAttribute('accept-spoilers', 'true');
        if (theme.name) {
            document.body.setAttribute('theme', theme.name);
        }
    }
}
async function displayWeather() {
    let myPromises = [
        fetch('https://api.openweathermap.org/data/2.5/weather?units=metric&lat=51.5200&lon=-0.1566&appid=05b8bf4b22e67da44ad9672eef66e607'),
        fetch("https://worldtimeapi.org/api/timezone/Europe/London"),
        fetch('https://api.openweathermap.org/data/2.5/weather?units=metric&lat=35.6762&lon=-139.6503&appid=05b8bf4b22e67da44ad9672eef66e607'),
        fetch("https://worldtimeapi.org/api/timezone/Asia/Tokyo"), // Tokyo time
    ]; // returns array of promises
    const promiseData = Promise.all(myPromises);
    promiseData
        .then((responses) => {
        const jsonResponsePromises = responses.map(r => r.json()); // make the responses into promises with their json values inside
        return jsonResponsePromises;
    })
        .then((data) => {
        Promise.all(data)
            .then((info) => {
            displayData(info);
            // Update the time every 5 seconds. This is a tradeoff between wanting to
            // keep the time up to date, but not having to keep checking too often
            window.setInterval(updateTime, 5000);
            window.addEventListener('resize', updateTime);
        });
    })
        .catch(failure => console.log(failure)); // array of responses
    async function updateTime() {
        const localTime = new Date();
        const britishTimeDisplay = document.querySelector('.british-time');
        const japaneseTimeDisplay = document.querySelector('.japanese-time');
        const displayedMinutes = britishTimeDisplay.textContent ? britishTimeDisplay.textContent.slice(3, 5) : '';
        if ((britishTimeDisplay === null || britishTimeDisplay === void 0 ? void 0 : britishTimeDisplay.textContent) === '') {
            // The time may be blank as a result of a previous failed API call.
            //  If so, we'll try again
            getNewTime();
            // If the minutes we're displaying aren't the same as the real life minutes past the hour
        }
        else if (localTime.getMinutes().toString() !== displayedMinutes) {
            // If we're in a new hour, get a new time from the API. This will ensure we
            // are displaying the correct time if daylight savings is happening, rather
            // than us just incrementing the hour.
            if (localTime.getMinutes() === 0) {
                getNewTime();
            }
            else {
                britishTimeDisplay.textContent = britishTimeDisplay.textContent ? britishTimeDisplay.textContent.slice(0, 2) + ':' + localTime.getMinutes().toString().padStart(2, '0') : '';
                japaneseTimeDisplay.textContent = japaneseTimeDisplay.textContent ? japaneseTimeDisplay.textContent.slice(0, 2) + ':' + localTime.getMinutes().toString().padStart(2, '0') : '';
            }
        }
        // If the minutes are the same, we don't need to update anything.
        async function getNewTime() {
            let myPromises = [
                fetch("https://worldtimeapi.org/api/timezone/Europe/London"),
                fetch("https://worldtimeapi.org/api/timezone/Asia/Tokyo"), // Tokyo time
            ]; // returns array of promises
            const promiseData = Promise.all(myPromises);
            promiseData
                .then((responses) => {
                const jsonResponsePromises = responses.map(r => r.json()); // make the responses into promises with their json values inside
                return jsonResponsePromises;
            })
                .then((data) => {
                Promise.all(data)
                    .then((info) => {
                    britishTimeDisplay.textContent = info[0].datetime.slice(11, 16);
                    japaneseTimeDisplay.textContent = info[1].datetime.slice(11, 16);
                });
            })
                .catch(failure => {
                console.log('failed to update time');
                console.log(failure);
                britishTimeDisplay.textContent = '';
                japaneseTimeDisplay.textContent = '';
            });
        }
    }
    function displayData(data) {
        let weatherArea = document.querySelector("#weather-bar");
        weatherArea.innerHTML = '';
        displayPanel(data[0], data[1], 'London, Great Britain');
        displayPanel(data[2], data[3], 'Tokyo, Japan');
        function displayPanel(weather, time, city) {
            let panel = document.createElement('div');
            panel.innerHTML = `
          <img class="weather-bar-flag" src="assets/icons/flags/${city === "London, Great Britain" ? "british" : "japanese"}.svg" width=32>
          <div class="weather-bar-details">
            ${city}<br>
            <span class=${city === "London, Great Britain" ? "british" : "japanese"}-time>${(time.datetime).slice(11, 16)}</span>
            <span>${Math.round(weather.main.temp)}&deg;C</span>
            <span>${weather.weather[0].description} <br></span>
          </div>
        <img src="https://openweathermap.org/img/wn/${weather.weather[0].icon}.png">
      `;
            weatherArea.appendChild(panel);
        }
    }
}
displayWeather();
/* About section -------------------------------------------------------------*/
aboutButton.addEventListener('click', () => {
    document.body.classList.toggle('show-about');
});
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
    ronSwanson: {
        url: 'https://ron-swanson-quotes.herokuapp.com/v2/quotes',
        propName: 'array'
    },
    advice: {
        url: 'https://api.adviceslip.com/advice',
        propName: 'slip',
        innerPropName: 'advice'
    }
};
function pasteQuote(type) {
    fetch(quoteData[type].url, quoteData[type].options)
        .then((response) => response.json())
        .then((data) => {
        let property = quoteData[type].propName;
        let innerProperty = quoteData[type].innerPropName;
        let text;
        if (property === 'array') {
            text = data[0];
        }
        else if (innerProperty) {
            text = data[property][innerProperty];
        }
        else {
            text = data[property];
        }
        // If the quote is too long, get a new one.
        // Otherwise go ahead and use it.
        if (text.length > 115 || text.indexOf('fuck') > -1) {
            pasteQuote(type);
        }
        else {
            document.querySelector('.active-canvas textarea').value = text;
        }
    })
        .catch(failure => {
        console.log(failure);
    });
}
;
function pasteQuoteFromArray(type) {
    let array;
    if (type === "michaelScott") {
        array = michaelScott;
    }
    else if (type === "deadpool") {
        array = deadpool;
    }
    if (!array) {
        return;
    }
    let text = array[Math.floor((Math.random() * array.length))];
    // If the quote is too long, get a new one.
    // Otherwise go ahead and use it.
    if (text.length < 115 && text.indexOf('fuck') === -1) {
        document.querySelector('.active-canvas textarea').value = text;
    }
}
['kanye', 'dadJoke', 'ronSwanson', 'advice'].forEach((type) => {
    document.querySelector(`.quote-button[type="${type}"]`).addEventListener('click', () => {
        pasteQuote(type);
    });
});
['michaelScott', 'deadpool'].forEach((type) => {
    document.querySelector(`.quote-button[type="${type}"]`).addEventListener('click', () => {
        pasteQuoteFromArray(type);
    });
});
/* Name selectors ------------------------------------------------------------*/
// Generate the modal content for the name selector
function generateNameSelectorWindow() {
    modalContent.innerHTML = `
    <h2>Alternate names</h2>
    <div id="name-selector-choices"></div>

    <div class="name-language-selector-container">
      <div class="name-language-selector name-reset" language="english">
        <span class="material-icons">restart_alt</span> Reset
      </div>
      <div class="name-language-selector" language="english"><img src="assets/icons/flags/british.svg" width=38>Make all names English</div>
      <div class="name-language-selector" language="japanese"><img src="assets/icons/flags/japanese.svg" width=38>Make all names Japanese</div>
    </div>
  `;
    document.querySelectorAll('.name-language-selector-container').forEach((sel) => {
        sel.addEventListener('click', updateNamesLanguage);
    });
    // Update all characters to their English or Japanese names.
    function updateNamesLanguage(e) {
        let clickedButton = e.target.closest('[language]');
        // Figure out what language we're wanting to change to.
        let language = clickedButton === null || clickedButton === void 0 ? void 0 : clickedButton.getAttribute('language');
        prefersJapaneseNames = language === 'japanese';
        window.localStorage.setItem('prefersJapaneseNames', String(language === 'japanese'));
        Object.keys(alternateNamesInUse).forEach((altName) => {
            // Get the character object so we can reference it
            let character = characters.find((character) => { var _a; return ((_a = character.alternateNames) !== null && _a !== void 0 ? _a : []).includes(altName); });
            if (character && character.alternateNames) {
                // The first name in the alternate names property should be the English name, the second should be the Japanese name
                let nameIndex = language === "english" ? 0 : 1;
                alternateNamesInUse[altName] = character.alternateNames[nameIndex];
                window.localStorage.setItem('alternateNamesInUse', JSON.stringify(alternateNamesInUse));
                // Make all of the appropriate radio buttons checked.
                let radioButtons = document.querySelectorAll(`.name-selector-form[for=${character.alternateNames[0]}] input[type="radio"]`);
                radioButtons.forEach((btn) => {
                    btn.removeAttribute('checked');
                    let buttonValue = btn.getAttribute('value');
                    if (alternateNamesInUse[altName] == buttonValue) {
                        btn.setAttribute('checked', 'true');
                        btn.click();
                    }
                });
            }
        });
        propagateAlternateNames();
    }
    getCharactersInUse();
    for (const [key] of Object.entries(alternateNamesInUse)) {
        let myCharacter = characters.find((character) => { var _a; return ((_a = character.alternateNames) !== null && _a !== void 0 ? _a : []).includes(key); });
        let characterId = myCharacter === null || myCharacter === void 0 ? void 0 : myCharacter.id;
        if (myCharacter
            && characterId
            && myCharacter.alternateNames
            && charactersInUse.length > 0
            && (charactersInUse.includes(myCharacter.id) || charactersInUse.includes(myCharacter === null || myCharacter === void 0 ? void 0 : myCharacter.alternateNames[0]))) {
            modalContent.querySelector('#name-selector-choices').appendChild(generateCharacterNameListInterface(characterId));
        }
    }
}
function getCharactersInUse() {
    charactersInUse = [];
    document.querySelectorAll('img.tag-image').forEach((img) => charactersInUse.push(img.getAttribute('character')));
}
;
// Generate the names interface for each individual character.
function generateCharacterNameListInterface(characterID) {
    var _a, _b;
    let myCharacter = getCharacterFromID(characterID);
    const namePanel = document.createElement('fieldset');
    namePanel.classList.add("name-selector-form");
    if (!myCharacter) {
        return namePanel;
    }
    const alternateNames = (_a = myCharacter.alternateNames) !== null && _a !== void 0 ? _a : [];
    namePanel.setAttribute('for', alternateNames[0]);
    const characterIcon = document.createElement('img');
    characterIcon.src = `assets/characters/${myCharacter.id}/thumbnails/1.png`;
    namePanel.appendChild(characterIcon);
    alternateNames.forEach((altName) => {
        const input = document.createElement('span');
        input.innerHTML = `
      <input type="radio" id="${altName}" name="${alternateNames[0]}" value="${altName}" class="name-selector-input">
      <label for="${altName}">${altName}</label>
    `;
        namePanel.appendChild(input);
        input.addEventListener('click', () => {
            alternateNamesInUse[alternateNames[0]] = altName;
            window.localStorage.setItem('alternateNamesInUse', JSON.stringify(alternateNamesInUse));
            propagateAlternateNames();
        });
    });
    if (alternateNames.length > 0) {
        let selectedName = alternateNamesInUse[(_b = alternateNames[0]) !== null && _b !== void 0 ? _b : myCharacter.id];
        namePanel.querySelector(`input[value="${selectedName}"]`).setAttribute('checked', 'true');
    }
    return namePanel;
}
