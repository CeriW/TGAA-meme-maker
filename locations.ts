
// A list of the locations
// name - a user-readable name that will display on the page
// id - the name of the image to go alongside it
// variant - a user-readable label that will be placed alongside the name. Some locations have more than one version - e.g. the Forensics Lab has a Courtney version and a Maria version. Both the same place, but they look different.
// tags - an array of tags which will be used to bump these locations to the top of the list during themed weeks. The tag needs to match the theme name.
// addedDate - the date you added this location. Used to generate a 'new' tag on it and bump it to the top of the location list.

export type LocationObject = {
  name                : string;
  id                  : string;
  variant?            : string;
  tags?               : string[];
  characterOverlay?   : string;
  addedDate?          : string;
}

export const locations: LocationObject[] = [
  {name   : "221B Baker Street",                     id:"baker-street-221b",                               tags: ['homumiko']},
  {name   : "221B Baker Street",                     id:"baker-street-221b-night",                         variant:"Night",                             tags: ['homumiko']},
  {name   : "Sholmes' Suite",                        id:"sholmes-suite",                                   variant: "Fireplace",                        tags: ['homumiko', 'ryuulock']},
  {name   : "Sholmes' Suite",                        id:"sholmes-suite-sholmes",                           variant:"Herlock's side",            tags: ['homumiko','ryuulock']},
  {name   : "Sholmes' Suite",                        id:"sholmes-suite-iris",                              variant:"Iris' side",        tags: ['homumiko','ryuulock']},
  {name   : "Naruhodo's Legal Consultancy",          id:"naruhodos-legal-consultancy",                     tags: ['ryuulock',  'baroasoryuu']},
  {name   : "Defendant's Antechamber",               id:"defendants-antechamber-the-old-bailey-left",      variant:'The Old Bailey', tags: ['asobaro', 'baroasoryuu']},
  {name   : "Defendant's Antechamber",               id:"defendants-antechamber-japan-right",              variant:'Japanese Court of Judicature', tags: ['asobaro','baroasoryuu']},
  {name   : "Prosecutor's Office",                   id:"prosecutors-office-left",                         tags: ['asobaro', 'baroasoryuu']},
  {name   : "Prison cell",                           id:"prison-cell",                                     variant: 'Outside', tags: []},
  {name   : "Prison cell",                           id:"prison-cell-inside",                              variant: 'Inside', characterOverlay: "prison-cell-bars", tags: [], addedDate: "Feb 24 2023"},
  {name   : "Crystal Tower base",                    id:"crystal-tower-base",                              tags: []},
  {name   : "Drebber's workshop",                    id:"drebbers-workshop",                               tags: []},
  {name   : "Drebber's room",                        id:"drebbers-room",                                   tags: []},
  {name   : "The Garridebs' room",                   id:"garridebs-room",                                  tags: []},
  {name   : "Natsume's Room",                        id:"natsumes-room",                                   tags: []},
  {name   : "Windibank's Pawnbrokery",               id:"windibanks",                                      tags: []},
  {name   : "Forensics Laboratory",                  id:"forensics-laboratory-courtney",                   tags: [],},
  {name   : "Forensics Laboratory",                  id:"forensics-laboratory-maria",                      variant:"Maria's version", tags: []},
  {name   : "Room on Fresno Street",                 id:"room-on-fresno-street",                           tags: []},
  {name   : "SS Burya Corridor",                     id:"ss-burya-corridor-left",                          tags: []},
  {name   : "First Class Cabin no.1 ",               id:"ss-burya-cabin-1",                                variant: "Kazuma's room", tags: ['asobaro', 'baroasoryuu']},
  {name   : "First Class Cabin no.2 ",               id:"ss-burya-cabin-2",                                variant: "Nikolina's room", tags: []},
  {name   : "Lord Chief Justice's Office",           id:"lord-chief-justice-office",                       tags: []},
  {name   : "Briar Road",                            id:"briar-road",                                      tags: []},
  {name   : "St. Bartholomew's Hospital",            id:"st-bartholomews",                                 tags: []},
  {name   : "Shamspeare's Flat",                     id:"shamspeares-flat",                                tags: []},
  {name   : "Experimentation Stage",                 id:"experimentation-stage",                           tags: []},
  {name   : "Madame Tuspells' Museum of Waxworks",   id:"madame-tuspells",                                 tags: []},
  {name   : "Great Waterloo Hotel",                  id:"waterloo-hotel",                                  variant: "Foyer", tags: ['homumiko'],    addedDate: "Mar 05 2023"},

]