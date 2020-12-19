import axios from "axios";
import moment from "moment";

export const allSettings = [
  {
    title: "login settings",
    settings: [{ title: "email", inputs: [{ name: "email", type: "text" }] }]
  },
  {
    title: "baby",
    settings: [{ title: "baby name, birthdate" }]
  },
  {
    title: "support",
    settings: [{ title: "news" }, { title: "help" }, { title: "inquiries" }]
  },
  {
    title: "app settings",
    settings: [
      { title: "sharing" },
      { title: "notifications" },
      { title: "language" },
      { title: "cache settings" }
    ]
  },
  {
    title: "app info",
    settings: [
      { title: "terms of use" },
      { title: "privacy policy" },
      { title: "dingdong baby terms of service" },
      { title: "legal information" }
    ]
  }
];

export const initialUser = {
  _id: "",
  dateSignedUp: moment(),
  hasViewedIntro: false,
  email: "",
  password: "",
  credits: 0,
  lastUpdated: moment(),
  completedChallenges: [], //array of photos
  name: "",
  gender: "",
  babyName: "",
  babyYearOfBirth: null,
  babyMonthOfBirth: null,
  babyDayOfBirth: null,
  babyGender: "",
  partnerName: "",
  partnerGender: "",
  sharingLinks: []
};

export const initialApp = {
  lastUpdated: moment(),
  selectedChallenge: null,
  setSelectedChallenge: () => {},
  challenges: [
    {
      id: 1,
      name: `Bring me my mount`,
      desc: `Do your best to capture baby upon the household steed (pet). If you don't have a pet try their favourite stuffed animal, vegetable or a loaf of fresh bread.`,
      emoji: `🏇`,
      captions: ["I shall protect you, mother! TO WAR!!"],
      hashtags: [],
      warning:
        "Ride your pet ride it irig did id i didn't even know that holy guacamoe",
      tip:
        "Ride your pet ride it irig did id i didn't even know that holy guacamoeRide your pet ride it irig did id i didn't even know that holy guacamoe",
      difficulty: 2
    },
    {
      id: 2,
      name: `Lil Muscle`,
      desc: `Use makeup to contour muscles, add a headband for extra effect.`,
      emoji: `🥋`,
      captions: ["I traine very day lol"],
      hashtags: ["muscle", "train", "yoyo"],
      warning: "MUSCLEEEEEEEEEE MUSCLE MUCLSE MUSLCEM MULSCEL",
      tip:
        "Ride your pet ride it irig did id i didn't even know that holy guacamoe",
      difficulty: 1
    },
    {
      id: 3,
      name: `Baby Daddy`,
      desc: `Your baby is now daddy. Please make them look like daddy (but ideally more handsome).`,
      emoji: `🧍‍♂️`,
      captions: ["I shall protect you, mother! TO WAR!!"],
      hashtags: [],
      warning: "",
      tip: "",
      difficulty: 2
    },
    {
      id: 4,
      name: `Mini Gordon Ramsay`,
      desc: `BACK TO THE KITCHEN! Dress your baby as a chef then feed them food they dislike, so they look like a food critic eating something revolting.`,
      emoji: `🏇`,
      captions: [
        "GRANDMA COULD MAKE BETTER FOOD THAN THIS",
        "Mom I told you more sugar. What is this?!"
      ],
      hashtags: [],
      warning: "",
      tip: "",
      difficulty: 2
    },
    {
      id: 5,
      name: `Bugah want rock`,
      desc: `Me baby. Me caveman. Want thick eyebrow, soft loincloth, good rocks for make play.`,
      emoji: `🏇`,
      captions: [""],
      hashtags: [],
      warning: "",
      tip: "",
      difficulty: 2
    }
  ],
  lockedChallenges: [
    {
      id: 6,
      name: "Are you okay?",
      emoji: "😷",
      difficulty: 1
    },
    {
      id: 7,
      name: "Chaotic cute",
      emoji: "🧹",
      difficulty: 2
    },
    {
      id: 8,
      name: "Wheres baby",
      emoji: "👀",
      difficulty: 2
    }
  ],
  introCopy: [
    "make hilarious memories future you will thank you for",
    "hundreds of fun and hilarious photo and activity ideas you couldn't come up with yourself",
    "test"
  ], // is this necessary for storage ...?
  salesCopy: [
    "hint - you should definitely not do it, your kid will look back and wonder what was wrong with you",
    "your kid won't be cute forever",
    "baby will hate when you show these on their wedding day",
    "you got a baby, we got funny stuff to do with it",
    "don't you want more likes on instagram?"
  ]
};
