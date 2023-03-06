
// A list of the available characters
// name - a user-readable name that will display on the page
// id - the name of the image to go alongside it. Usually surname-forename-variant format, with hyphens also for multiple word surnames or forenames e.g van-zieks-barok
// gender - the gender of the character, for filtering purposes
// nationality - for filtering purposes
// appearsin - for filtering purposes. For those unfamiliar with TGAA, the game is split into two parts, each part being split up into 5 individual cases making 10 in total. This array is made up of ten values containing true or false to indicate whether this character was present in that case.
//             Cases are commonly referred to the fans by the number of the game they appear in, then the order of that case. For example, case 9 is usually called 2-4 because it's the 4th part of the 2nd game.
// images - the number of images in the folder to go with this character. The code depends on them being named sequentially beginning at 1 and can't work if there are any numbers missing.
// tags - used during themed time periods. Will be used to place these characters at the top of the list.
// lastUpdated - a date string of the last time this character was updated. Will be used to generate a 'new' image tag for a set number of days.
// posesAddedOnLastUpdate - will tag the specified poses as new for a set number of days.

let characters = [

{
  name: 'Ryunosuke Naruhodo',
  id:'naruhodo-ryunosuke',
  gender: 'male',
  nationality: 'japanese',
  appearsin: [true,true,true,true,true,false,true,true,true,true],
  images: 8,
  theme: 'https://open.spotify.com/embed/track/6t74To2T8PUd6k1dbSu10D?utm_source=generator',
  tags: [],
  lastUpdated: null,
  posesAddedOnLastUpdate: 0,
},

{
  name: 'Herlock Sholmes',
  id:'sholmes-herlock-default',
  gender: 'male',
  nationality: 'british',
  appearsin: [false,true,true,true,true,false,true,true,true,true],
  images: 16,
  variant: 'default outfit',
  theme: 'https://open.spotify.com/embed/track/1QUX7xOPs80O5tiQb3MPqd?utm_source=generator',
  tags: ['homumiko'],
  lastUpdated: null,
  posesAddedOnLastUpdate: 0,
},
{
  name: 'Herlock Sholmes',
  id:'sholmes-herlock-casual',
  gender: 'male',
  nationality: 'british',
  appearsin: [false,true,true,true,true,false,true,true,true,true],
  images: 16,
  variant: 'casual outfit',
  theme: 'https://open.spotify.com/embed/track/5FQuOO8w56VPX1tJwaPKx8?utm_source=generator',
  tags: ['homumiko'],
  lastUpdated: null,
  posesAddedOnLastUpdate: 0,
},

{
  name: 'Herlock Sholmes',
  id:'sholmes-herlock-japanese-jumble',
  gender: 'male',
  nationality: 'british',
  appearsin: [false,true,true,true,true,false,true,true,true,true],
  images: 13,
  variant: 'Japanese Jumble',
  theme: 'https://open.spotify.com/embed/track/5FQuOO8w56VPX1tJwaPKx8?utm_source=generator',
  tags: ['homumiko'],
  lastUpdated: "Sat Mar 04 2023",
  posesAddedOnLastUpdate: 13,
},

{
  name: 'Susato Mikotoba',
  id:'mikotoba-susato',
  gender: 'female',
  nationality: 'japanese',
  appearsin: [true,true,true,true,true,true,true,true,true,true],
  images: 15,
  theme: 'https://open.spotify.com/embed/track/09pXZRySXfq6Z17YiVnOJC?utm_source=generator',
  tags: [],
  lastUpdated: null,
  posesAddedOnLastUpdate: 0,
},

{
  name: 'Barok van Zieks',
  id:'van-zieks-barok',
  gender: 'male',
  nationality: 'british',
  appearsin: [false,false,true,true,true,false,true,true,true,true],
  images: 6,
  theme: 'https://open.spotify.com/embed/track/5OmhUtWkaW7czq8v42yjIg?utm_source=generator',
  tags: [],
  lastUpdated: null,
  posesAddedOnLastUpdate: 0,
},

{
  name: 'Iris Wilson',
  id:'wilson-iris',
  gender: 'female',
  nationality: 'british',
  appearsin: [false,false,true,true,true,false,true,true,true,true],
  images: 9,
  theme: 'https://open.spotify.com/embed/track/3oCMdfOMvnlS9BBAZ2YBQ5?utm_source=generator',
  tags: [],
  lastUpdated: null,
  posesAddedOnLastUpdate: 0,
},

{
  name: 'Tobias Gregson',
  id:'gregson-tobias',
  gender: 'male',
  nationality: 'british',
  appearsin: [false,false,true,true,true,false,true,true,true,true],
  images: 5,
  theme: 'https://open.spotify.com/embed/track/657DqxHnOmnX3ZRJlbs9xZ?utm_source=generator',
  tags: [],
  lastUpdated: null,
  posesAddedOnLastUpdate: 0,
},

{
  name: 'Gina Lestrade',
  id:'lestrade-gina',
  gender: 'female',
  nationality: 'british',
  appearsin: [false,false,true,false,true,false,false,true,true,true],
  images: 4,
  theme: 'https://open.spotify.com/embed/track/582mS91YcS5PHaTx5LUPn4?utm_source=generator',
  tags: [],
  lastUpdated: null,
  posesAddedOnLastUpdate: 0,
},

{
  name: 'Yujin Mikotoba',
  id:'mikotoba-yujin-japan',
  gender: 'male',
  nationality: 'japanese',
  appearsin: [true,false,false,false,false,true,false,false,false,false],
  images: 7,
  variant: 'Japan outfit',
  theme: 'https://open.spotify.com/embed/track/7rePNo1I17JmU49JX6rbnE?utm_source=generator',
  tags: ['homumiko'],
  lastUpdated: "Sat Mar 04 2023",
  posesAddedOnLastUpdate: 7
},


{
  name: 'Yujin Mikotoba',
  id:'mikotoba-yujin-london',
  gender: 'male',
  nationality: 'japanese',
  appearsin: [false,false,false,false,false,false,false,false,true,true],
  images: 14,
  variant: 'London outfit',
  theme: 'https://open.spotify.com/embed/track/7rePNo1I17JmU49JX6rbnE?utm_source=generator',
  tags: ['homumiko'],
  lastUpdated: "Sat Mar 04 2023",
  posesAddedOnLastUpdate: 8,
},

{
  name: 'Kazuma Asogi',
  id:'asogi-kazuma',
  gender: 'male',
  nationality: 'japanese',
  appearsin: [true,false,false,false,false,false,false,true,true,true],
  images: 4,
  theme: 'https://open.spotify.com/embed/track/4qiFdo2jEF4AcZzj8LxPUP?utm_source=generator',
  tags: [],
  lastUpdated: "Fri Mar 03 2023",
  posesAddedOnLastUpdate: 0,
},

{
  name: 'Soseki Natsume',
  id:'natsume-soseki',
  gender: 'male',
  nationality: 'japanese',
  appearsin: [false,false,false,true,false,true,true,false,false,false],
  images: 9,
  theme: 'https://open.spotify.com/embed/track/0hWRHYklo8CRyV8BxVQugG?utm_source=generator',
  tags: [],
  lastUpdated: null,
  posesAddedOnLastUpdate: 0,
},


{
  name: 'Enoch Drebber',
  id:'drebber-enoch',
  gender: 'male',
  nationality: 'british',
  appearsin: [false,false,false,false,false,false,false,true,false,false],
  images: 4,
  theme: 'https://open.spotify.com/embed/track/1QBM9EnE2HiyIvEL1vz8U6?utm_source=generator',
  tags: [],
  lastUpdated: null,
  posesAddedOnLastUpdate: 0,
},

{
  name: 'Wagahai',
  id:'wagahai',
  gender: 'male',
  nationality: 'british',
  appearsin: [false,false,false,true,true,false,true,false,false,false],
  images: 3,
  tags: [],
  lastUpdated: null,
  posesAddedOnLastUpdate: 0,
},


{
  name: 'Madame Tusspells',
  id:'tusspells-esmerelda',
  gender: 'female',
  nationality: 'french',
  appearsin: [false,false,false,false,false,false,false,true,false,false],
  images: 1,
  theme: 'https://open.spotify.com/embed/track/3c4rqLvhHImiVKNPD0IN1V?utm_source=generator',
  tags: [],
  lastUpdated: null,
  posesAddedOnLastUpdate: 0,
},

{
  name: 'Courtney Sithe',
  id:'sithe-courtney',
  gender: 'female',
  nationality: 'british',
  appearsin: [false,false,false,false,false,false,false,true,false,false],
  images: 2,
  theme: 'https://open.spotify.com/embed/track/3R1YvtpoUWBWy6OGd92nU0?utm_source=generator',
  tags: [],
  lastUpdated: null,
  posesAddedOnLastUpdate: 0,
},

{
  name: 'Maria Gorey',
  id:'gorey-maria',
  gender: 'female',
  nationality: 'british',
  appearsin: [false,false,false,false,false,false,false,true,true,true],
  images: 1,
  tags: [],
  lastUpdated: null,
  posesAddedOnLastUpdate: 0,
},

{
  name: 'Magnus McGuilded',
  id:'mcguilded-magnus',
  gender: 'male',
  nationality: 'irish',
  appearsin: [false,false,true,false,false,false,false,false,false,false],
  images: 1,
  tags: [],
  lastUpdated: null,
  posesAddedOnLastUpdate: 0,
},

{
  name: 'Nikolina Pavolva',
  id:'pavlova-nikolina',
  gender: 'female',
  nationality: 'russian',
  appearsin: [false,true,false,false,false,false,false,false,false,false],
  images: 1,
  theme: 'https://open.spotify.com/embed/track/6x6OrJ2G3rdwTyYVFuezBf?utm_source=generator',
  tags: [],
  lastUpdated: null,
  posesAddedOnLastUpdate: 0,
},

{
  name: 'Mael Stronghart',
  id:'stronghart-mael',
  gender: 'male',
  nationality: 'british',
  appearsin: [false,false,true,true,true,false,true,true,true,true],
  images: 1,
  theme: 'https://open.spotify.com/embed/track/4g9GzmDyca2VZg7j5kx6AT?utm_source=generator',
  tags: [],
  lastUpdated: null,
  posesAddedOnLastUpdate: 0,
},

{
  name: 'Rei Membami',
  id:'membami-rei',
  gender: 'female',
  nationality: 'japanese',
  appearsin: [false,false,false,false,false,true,false,false,false,false],
  images: 3,
  tags: [],
  lastUpdated: null,
  posesAddedOnLastUpdate: 0,
},

]