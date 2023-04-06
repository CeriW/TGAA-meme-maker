// A list of the locations
// name - a user-readable name that will display on the page
// id - the name of the image to go alongside it
// variant - a user-readable label that will be placed alongside the name. Some locations have more than one version - e.g. the Forensics Lab has a Courtney version and a Maria version. Both the same place, but they look different.
// tags - an array of tags which will be used to bump these locations to the top of the list during themed weeks. The tag needs to match the theme name.
// addedDate - the date you added this location. Used to generate a 'new' tag on it and bump it to the top of the location list.
// characterOverlay - the file name of an image to place over the top of the character (for example, prison bars).
export const locations = [
    { name: "Custom", id: "custom" },
    { name: "Sholmes' Suite", id: "sholmes-suite", variant: "Fireplace", tags: ['homumiko', 'ryuulock', 'doyle'] },
    { name: "Sholmes' Suite", id: "sholmes-suite-sholmes", variant: "Herlock's side", tags: ['homumiko', 'ryuulock', 'doyle'] },
    { name: "Sholmes' Suite", id: "sholmes-suite-iris", variant: "Iris' side", tags: ['homumiko', 'ryuulock', 'doyle'] },
    { name: "Naruhodo's Legal Consultancy", id: "naruhodos-legal-consultancy", tags: ['ryuulock', 'baroasoryuu'] },
    { name: "221B Baker Street", id: "baker-street-221b", tags: ['homumiko', 'doyle'] },
    { name: "221B Baker Street", id: "baker-street-221b-night", variant: "Night", tags: ['homumiko', 'doyle'] },
    { name: "Defendant's Antechamber", id: "defendants-antechamber-the-old-bailey-left", variant: 'The Old Bailey', tags: ['asobaro', 'baroasoryuu'] },
    { name: "Defendant's Antechamber", id: "defendants-antechamber-japan-right", variant: 'Japanese Court of Judicature', tags: ['asobaro', 'baroasoryuu'] },
    { name: "Witness stand", id: "witness-stand-old-bailey", variant: 'The Old Bailey', characterOverlay: "witness-stand-old-bailey-overlay", addedDate: "2023-03-23" },
    { name: "Witness stand", id: "witness-stand-japan", variant: 'Japanese Court of Judicature', characterOverlay: "witness-stand-japan-overlay", addedDate: "2023-03-23" },
    { name: "Prosecutor's Office", id: "prosecutors-office-left", tags: ['asobaro', 'baroasoryuu'] },
    { name: "Prison cell", id: "prison-cell", variant: 'Outside', tags: [] },
    { name: "Prison cell", id: "prison-cell-inside", variant: 'Inside', characterOverlay: "prison-cell-bars", tags: ['ginaLestradeWeek'], addedDate: "Feb 24 2023" },
    { name: "Crystal Tower base", id: "crystal-tower-base", tags: ['ginaLestradeWeek'] },
    { name: "Drebber's workshop", id: "drebbers-workshop", tags: [] },
    { name: "Drebber's room", id: "drebbers-room", tags: [] },
    { name: "The Garridebs' room", id: "garridebs-room", tags: ['doyle'] },
    { name: "Natsume's Room", id: "natsumes-room", tags: ['natsume'] },
    { name: "Windibank's Pawnbrokery", id: "windibanks", tags: ['doyle', 'ginaLestradeWeek'] },
    { name: "Forensics Laboratory", id: "forensics-laboratory-courtney", variant: "Courtney's version", tags: [], },
    { name: "Forensics Laboratory", id: "forensics-laboratory-maria", variant: "Maria's version", tags: [] },
    { name: "Room on Fresno Street", id: "room-on-fresno-street", tags: ['ginaLestradeWeek'] },
    { name: "SS Burya Corridor", id: "ss-burya-corridor-left", tags: [] },
    { name: "First Class Cabin no.1 ", id: "ss-burya-cabin-1", variant: "Kazuma's room", tags: ['asobaro', 'baroasoryuu'] },
    { name: "First Class Cabin no.2 ", id: "ss-burya-cabin-2", variant: "Nikolina's room", tags: [] },
    { name: "Lord Chief Justice's Office", id: "lord-chief-justice-office", tags: [] },
    { name: "Briar Road", id: "briar-road", tags: [] },
    { name: "St. Bartholomew's Hospital", id: "st-bartholomews", tags: [] },
    { name: "Shamspeare's Flat", id: "shamspeares-flat", tags: [] },
    { name: "Experimentation Stage", id: "experimentation-stage", tags: [] },
    { name: "Madame Tuspells' Museum of Waxworks", id: "madame-tuspells", tags: [] },
    { name: "Great Waterloo Hotel", id: "waterloo-hotel", variant: "Foyer", tags: ['homumiko'], addedDate: "Mar 05 2023" },
];
