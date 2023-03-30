import { characters } from "./characters.js";

export type Theme = {
  name: string | null;
  isSpoiler: boolean;
  message?: string;
}

export const themes: {[key: string]: Theme} = {
  default           : {name: null, isSpoiler: false},
  
  cherrylestradeBirthday: {name: "homumiko", isSpoiler: true, message: "<b>Happy birthday CherryLestrade!</b><br>Have some Homumiko"},
  dgsAnniversary    : {name: "dgsAnniversary", isSpoiler: false, message: '<b>Happy anniversary Dai Gyakuten Saiban!</b> 9th July 2015'},
  doyle             : {name: "doyle", isSpoiler: false, message: '<b>Happy birthday Sir Arthur<br>Conan Doyle!</b> 22nd May'},
  asobaroWeek       : {name: "asobaro", isSpoiler: true, message: '<b style="color: var(--gold)">Happy Asobaro week!</b><br>28 May - 3 Jun #asobaroweek2023'},
  baroasoryuuWeek   : {name: "baroasoryuu", isSpoiler: true, message: '<b style="color: var(--red)">Happy BaroAsoRyuu week!</b><br>1-7 May #baroasoryuuweek2023'},
  cumberbatch       : {name: 'cumberbatch', isSpoiler: false, message: "Nothing suspicious here"},
  fathersDay        : {name: "homumiko", isSpoiler: true, message: "Happy Father's Day - 18th Jun"},
  herlock           : {name: "herlock", isSpoiler: false, message: "<b>Happy birthday Sherlock Holmes!</b><br>6th Jan"},
  homumikoWeek      : {name: "homumiko", isSpoiler: true, message: "Happy Homumiko week!"},
  natsume           : {name: "natsume", isSpoiler: false, message: '<b>Happy birthday Soseki Natsume!</b><br>9th Feb'},
  ryuulockWeek      : {name: "ryuulock", isSpoiler: false, message: '<b style="color: var(--gold)">Happy Ryuulock week!</b><br>17-23 April #ryuulockweek2023'},
  takumi            : {name: "takumi", isSpoiler: false, message: "Happy birthday Shu Takumi!"},
  tgaaAnniversary   : {name: "tgaaAnniversary", isSpoiler: false, message: "<b>Happy localisation day!</b><br>26th July 2021"},
  watson            : {name: "watson", isSpoiler: false, message: "<b>Happy Dr Watson!</b><br>7th August"}
}

function isBetweenDates(startDate: string, endDate: string) {
  const currentDate = new Date();
  const myEndDate = new Date(endDate).getTime() + 24 * 60 * 60 * 1000; // Set it to the end of the date to make it easier
  return (currentDate >= new Date(startDate) && currentDate <= new Date(myEndDate));
}

type dateCheck = {day: number, month: number}
function isDate ({ day, month }: dateCheck) {
  let today = new Date();
  return today.getDate() === day && today.getMonth() ===  month - 1;
}


export function setTheme () {  
  let myTheme = null;

  // ONE OFF EVENTS
  if (isBetweenDates("2023-04-17", "2023-04-23")){myTheme = themes.ryuulockWeek;} 
  if (isBetweenDates("2023-05-01", "2023-05-07")){myTheme = themes.baroasoryuuWeek;} 
  if (isBetweenDates("2023-05-28", "2023-06-03")){myTheme = themes.asobaroWeek;} 
  if (isBetweenDates("2023-06-18", "2023-06-18")){myTheme = themes.fathersDay;} 


  // ANNUALLY RECURRING EVENTS

  // Sherlock Holmes' birthday - 6th Jan
  if (isDate( {day: 6, month: 1})){myTheme = themes.herlock;} 

  // Soseki Natsume's birthday - 9th Feb
  if (isDate( {day: 9, month: 2})){myTheme = themes.natsume;} 
  
  // April Fool's Day - 1st April
  if (isDate( {day: 1, month: 4})){
    initialiseCumberbatchTheme();
    myTheme = themes.cumberbatch;
  }

  // Shu Takumi's birthday - 2nd May
  if (isDate( {day: 2, month: 5})){myTheme = themes.takumi;} 

  // Sir Arthur Conan Doyle's birthday - 22nd May
  if (isDate( {day: 22, month: 5})){myTheme = themes.doyle;} 

  // Japanese release anniversary - 9th July
  if (isDate( {day: 9, month: 7})){myTheme = themes.dgsAnniversary;} 

  // Localised release anniversary - 26th July
  if (isDate( {day: 26, month: 7})){myTheme = themes.tgaaAnniversary;} 
  
  // Watson's birthday - 26th July
  if (isDate( {day: 7, month: 8})){myTheme = themes.watson;} 
  

  // My birthday :) - 7th Dec
  if (isDate( {day: 7, month: 12})){myTheme = themes.cherrylestradeBirthday;} 

  
  if (myTheme?.message){
    let bannerBottom = document.createElement('div');
    bannerBottom.innerHTML = `
        <div id="banner-bottom">
        <div id="banner-bottom-message">${myTheme.message}</div>
        <div class="theme-star"></div>
        <div class="theme-star"></div>
      </div>
    `
    document.querySelector('#banner')!.appendChild(bannerBottom)
  }

  return myTheme ?? themes.default;
  

}











/* APRIL FOOLS 2023 - BENEDICT CUMBERBATCH THEME -----------------------------*/

export function initialiseCumberbatchTheme () {

  const benedictAlternateForenames = [
    "Buttercup",
    "Bendydoodle",
    "Bonkyhort",
    "Bodysnatch",
    "Beetleborg",
    "Bumblebee",
    "Blunderbuss",
    "Bubblebath",
    "Bulbasaur",
    "Billiardball",
    "Butterfree",
    "Bendyboot",
    "Banister"
  ]

  const benedictAlternateSurnames = [
    "Cumbersnatch",
    "Crackerdoodle",
    "Crunchynut",
    "Cummerbund",
    "Cabbagepatch",
    "Cuttlefish",
    "Cottonswab",
    "Crumpetsnitch",
    "Crumblescrunch",
    "Charizard",
    "Candlestick",
    "Crackerjack",
    "Custardbath",
    "Candycrush",
    "Counterstrike",
    "Cinderblock"
  ]


  // Generate a new random name for Benedict Cumberbatch
  function generateRandomCumberbatchName() {
    let forename = benedictAlternateForenames[Math.floor(Math.random() * benedictAlternateForenames.length)]
    let surname = benedictAlternateSurnames[Math.floor(Math.random() * benedictAlternateForenames.length)]

    return forename + ' ' + surname;
  }

  // Add Benedict Cumberbatch to the characters array
  characters.unshift({
    name: "Sherlock Holmes",
    id: "holmes-benedict",
    variant: generateRandomCumberbatchName(),
    gender: 'male',
    nationality: 'british',
    appearsIn: [false,false,false,false,false,false,false,false,false,false],
    images: 5,
    tags: ['cumberbatch'],
    lastUpdated: "Apr 01 9999",  // since this will only ever be temporary, make it always show as new
    posesAddedOnLastUpdate: 5
  })

  // Display the random name on the page
  function displayNewBenedictName () {
    const benedictLabel = document.querySelector('.character-icon[value="holmes-benedict"] .variant-tag')
    if (benedictLabel) {
      benedictLabel.textContent = generateRandomCumberbatchName()
    }
  }

  // Start off with a new random name
  let benedict = characters.find((character) => character.id === "holmes-benedict")
  if (benedict){
    benedict.variant = generateRandomCumberbatchName();
  }

  // Every 10 seconds, give Benedict a new name
  window.setInterval(displayNewBenedictName, 10000)
}