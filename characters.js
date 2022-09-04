
// A list of the available characters
// name - a user-readable name that will display on the page
// id - the name of the image to go alongside it. Usually surname-forename-variant format, with hyphens also for multiple word surnames or forenames e.g van-zieks-barok
// gender - the gender of the character, for filtering purposes
// nationality - for filtering purposes
// appearsin - for filtering purposes. For those unfamiliar with TGAA, the game is split into two parts, each part being split up into 5 individual cases making 10 in total. This array is made up of ten values containing true or false to indicate whether this character was present in that case.
//             Cases are commonly referred to the fans by the number of the game they appear in, then the order of that case. For example, case 9 is usually called 2-4 because it's the 4th part of the 2nd game.
// images - the number of images in the folder to go with this character. The code depends on them being named sequentially beginning at 1 and can't work if there are any numbers missing.


const characters = [
  
{
  name: 'Ryunosuke Naruhodo',
  id:'naruhodo-ryunosuke',
  gender: 'male',
  nationality: 'japanese',
  appearsin: [true,true,true,true,true,false,true,true,true,true],
  images: 7
},

{
  name: 'Herlock Sholmes',
  id:'sholmes-herlock-default',
  gender: 'male',
  nationality: 'british',
  appearsin: [false,true,true,true,true,false,true,true,true,true],
  images: 12,
  variant: 'default outfit'},

{
  name: 'Herlock Sholmes',
  id:'sholmes-herlock-casual',
  gender: 'male',
  nationality: 'british',
  appearsin: [false,true,true,true,true,false,true,true,true,true],
  images: 9,
  variant: 'casual outfit'
},

{
  name: 'Susato Mikotoba',
  id:'mikotoba-susato',
  gender: 'female',
  nationality: 'japanese',
  appearsin: [true,true,true,true,true,true,true,true,true,true],
  images: 12
},

{
  name: 'Barok van Zieks',
  id:'van-zieks-barok',
  gender: 'male',
  nationality: 'british',
  appearsin: [false,false,true,true,true,false,true,true,true,true],
  images: 6
},

{
  name: 'Iris Wilson',
  id:'wilson-iris',
  gender: 'female',
  nationality: 'british',
  appearsin: [false,false,true,true,true,false,true,true,true,true],
  images: 5
},

{
  name: 'Tobias Gregson',
  id:'gregson-tobias',
  gender: 'male',
  nationality: 'british',
  appearsin: [false,false,true,true,true,false,true,true,true,true],
  images: 4
},

{
  name: 'Gina Lestrade',
  id:'lestrade-gina',
  gender: 'female',
  nationality: 'british',
  appearsin: [false,false,true,false,true,false,false,true,true,true],
  images: 4
},

{
  name: 'Soseki Natsume',
  id:'natsume-soseki',
  gender: 'male',
  nationality: 'japanese',
  appearsin: [false,false,false,true,false,true,true,false,false,false],
  images: 9
},

{
  name: 'Yujin Mikotoba',
  id:'mikotoba-yujin-london',
  gender: 'male',
  nationality: 'japanese',
  appearsin: [true,false,false,false,false,true,false,false,true,true],
  images: 5,
  variant: 'London outfit'
},

{
  name: 'Enoch Drebber',
  id:'drebber-enoch',
  gender: 'male',
  nationality: 'british',
  appearsin: [false,false,false,false,false,false,false,true,false,false],
  images: 4
},

{
  name: 'Wagahai',
  id:'wagahai',
  gender: 'male',
  nationality: 'british',
  appearsin: [false,false,false,true,true,false,true,false,false,false],
  images: 3
},


{
  name: 'Madame Tusspells',
  id:'tusspells-esmerelda',
  gender: 'female',
  nationality: 'french',
  appearsin: [false,false,false,false,false,false,false,true,false,false],
  images: 1
},

{
  name: 'Courtney Sithe',
  id:'sithe-courtney',
  gender: 'female',
  nationality: 'british',
  appearsin: [false,false,false,false,false,false,false,true,false,false],
  images: 2
},

{
  name: 'Maria Gorey',
  id:'gorey-maria',
  gender: 'female',
  nationality: 'british',
  appearsin: [false,false,false,false,false,false,false,true,true,true],
  images: 1
},

{
  name: 'Magnus McGuilded',
  id:'mcguilded-magnus',
  gender: 'male',
  nationality: 'irish',
  appearsin: [false,false,true,false,false,false,false,false,false,false],
  images: 1
},

{
  name: 'Nikolina Pavolva',
  id:'pavlova-nikolina',
  gender: 'female',
  nationality: 'russian',
  appearsin: [false,true,false,false,false,false,false,false,false,false],
  images: 1
},

{
  name: 'Mael Stronghart',
  id:'stronghart-mael',
  gender: 'male',
  nationality: 'british',
  appearsin: [false,false,true,true,true,false,true,true,true,true],
  images: 1
},



]