// A list of the locations
// name - a user-readable name that will display on the page
// id - the name of the image to go alongside it
// variant - a user-readable label that will be placed alongside the name. Some locations have more than one version - e.g. the Forensics Lab has a Courtney version and a Maria version. Both the same place, but they look different.
// tags - an array of tags which will be used to bump these locations to the top of the list during themed weeks. The tag needs to match the theme name.
// addedDate - the date you added this location. Used to generate a 'new' tag on it and bump it to the top of the location list.
// characterOverlay - the file name of an image to place over the top of the character (for example, prison bars).

export type LocationObject = {
  name: string;
  id: string;
  variant?: string;
  tags?: string[];
  characterOverlay?: string;
  addedDate: string | null;
};

export const locations: LocationObject[] = [
  {
    name: "Sholmes' Suite",
    id: 'sholmes-suite',
    variant: 'Fireplace',
    tags: ['homumiko', 'ryuulock', 'doyle'],
    addedDate: null,
  },
  {
    name: "Sholmes' Suite",
    id: 'sholmes-suite-sholmes',
    variant: "Herlock's side",
    tags: ['homumiko', 'ryuulock', 'doyle'],
    addedDate: null,
  },
  {
    name: "Sholmes' Suite",
    id: 'sholmes-suite-iris',
    variant: "Iris' side",
    tags: ['homumiko', 'ryuulock', 'doyle'],
    addedDate: null,
  },
  {
    name: "Naruhodo's Legal Consultancy",
    id: 'naruhodos-legal-consultancy',
    tags: ['ryuulock', 'baroasoryuu'],
    addedDate: null,
  },
  { name: '221B Baker Street', id: 'baker-street-221b', tags: ['homumiko', 'doyle'], addedDate: null },
  {
    name: '221B Baker Street',
    id: 'baker-street-221b-night',
    variant: 'Night',
    tags: ['homumiko', 'doyle'],
    addedDate: null,
  },
  {
    name: "Defendant's Antechamber",
    id: 'defendants-antechamber-the-old-bailey-left',
    variant: 'The Old Bailey',
    tags: ['asobaro', 'baroasoryuu'],
    addedDate: null,
  },
  {
    name: "Defendant's Antechamber",
    id: 'defendants-antechamber-japan-right',
    variant: 'Japanese Court of Judicature',
    tags: ['asobaro', 'baroasoryuu'],
    addedDate: null,
  },
  {
    name: 'Witness stand',
    id: 'witness-stand-old-bailey',
    variant: 'The Old Bailey',
    characterOverlay: 'witness-stand-old-bailey-overlay',
    addedDate: '2023-03-23',
  },
  {
    name: 'Witness stand',
    id: 'witness-stand-japan',
    variant: 'Japanese Court of Judicature',
    characterOverlay: 'witness-stand-japan-overlay',
    addedDate: '2023-03-23',
  },
  { name: "Prosecutor's Office", id: 'prosecutors-office-left', tags: ['asobaro', 'baroasoryuu'], addedDate: null },
  { name: 'Prison cell', id: 'prison-cell', variant: 'Outside', tags: [], addedDate: null },
  {
    name: 'Prison cell',
    id: 'prison-cell-inside',
    variant: 'Inside',
    characterOverlay: 'prison-cell-bars',
    tags: ['ginaLestradeWeek'],
    addedDate: 'Feb 24 2023',
  },
  { name: 'Crystal Tower base', id: 'crystal-tower-base', tags: ['ginaLestradeWeek'], addedDate: null },
  { name: "Drebber's workshop", id: 'drebbers-workshop', tags: [], addedDate: null },
  { name: "Drebber's room", id: 'drebbers-room', tags: [], addedDate: null },
  { name: "The Garridebs' room", id: 'garridebs-room', tags: ['doyle'], addedDate: null },
  { name: "Natsume's Room", id: 'natsumes-room', tags: ['natsume'], addedDate: null },
  { name: "Windibank's Pawnbrokery", id: 'windibanks', tags: ['doyle', 'ginaLestradeWeek'], addedDate: null },
  {
    name: "Windibank's Storeroom",
    id: 'windibanks-storeroom',
    tags: ['doyle', 'ginaLestradeWeek'],
    addedDate: '2023-04-08',
  },
  {
    name: 'Forensics Laboratory',
    id: 'forensics-laboratory-courtney',
    variant: "Courtney's version",
    tags: [],
    addedDate: null,
  },
  {
    name: 'Forensics Laboratory',
    id: 'forensics-laboratory-maria',
    variant: "Maria's version",
    tags: [],
    addedDate: null,
  },
  { name: 'Room on Fresno Street', id: 'room-on-fresno-street', tags: ['ginaLestradeWeek'], addedDate: null },
  { name: 'SS Burya Corridor', id: 'ss-burya-corridor-left', tags: [], addedDate: null },
  {
    name: 'First Class Cabin no.1 ',
    id: 'ss-burya-cabin-1',
    variant: "Kazuma's room",
    tags: ['asobaro', 'baroasoryuu'],
    addedDate: null,
  },
  { name: 'First Class Cabin no.2 ', id: 'ss-burya-cabin-2', variant: "Nikolina's room", tags: [], addedDate: null },
  { name: "Lord Chief Justice's Office", id: 'lord-chief-justice-office', tags: [], addedDate: null },
  { name: 'Briar Road', id: 'briar-road', tags: [], addedDate: null },
  { name: "St. Bartholomew's Hospital", id: 'st-bartholomews', tags: [], addedDate: null },
  { name: "Shamspeare's Flat", id: 'shamspeares-flat', tags: [], addedDate: null },
  { name: 'Experimentation Stage', id: 'experimentation-stage', tags: [], addedDate: null },
  { name: "Madame Tuspells' Museum of Waxworks", id: 'madame-tuspells', tags: [], addedDate: null },
  { name: 'Great Waterloo Hotel', id: 'waterloo-hotel', variant: 'Foyer', tags: ['homumiko'], addedDate: '2023-03-05' },
];
