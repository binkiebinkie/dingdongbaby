import axios from "axios";
import { t } from "i18n-js";
import moment from "moment";

export const allSettings = [
  {
    title: "settings/login",
    settings: [
      {
        title: "settings/email-password",
        to: "Login",
      },
    ],
  },
  {
    title: "settings/babies",
    settings: [{ title: "Babies" }],
  },
  {
    title: "settings/support",
    settings: [{ title: "News" }, { title: "Help" }],
  },
  {
    title: "settings/app-settings",
    settings: [
      { title: "Sharing" },
      { title: "Notifications" },
      { title: "Language" },
      // { title: "cache settings" },
    ],
  },
  // {
  //   title: "settings/app-info",
  //   settings: [
  //   //   { title: "terms of use" },
  //   //   { title: "privacy policy" },
  //   //   { title: "dingdong baby terms of service" },
  //   //   { title: "legal information" },
  //   ],
  // },
];

export const initialApp = {
  lastUpdated: moment(),
  selectedPrompt: null,
  setSelectedPrompt: () => {},
  prompts: [
    {
      id: 1,
      name: `Bring me my mount`,
      desc: `Do your best to capture baby upon the household steed (pet). If you don't have a pet try their favourite stuffed animal, vegetable or a loaf of fresh bread.`,
      emoji: `🏇`,
      captions: ["I shall protect you, mother! TO WAR!!"],
      hashtags: [],
      warning:
        "Ride your pet ride it irig did id i didn't even know that holy guacamoe",
      tip: "Ride your pet ride it irig did id i didn't even know that holy guacamoeRide your pet ride it irig did id i didn't even know that holy guacamoe",
      difficulty: 2,
    },
    {
      id: 2,
      name: `Lil Muscle`,
      desc: `Use makeup to contour muscles, add a headband for extra effect.`,
      emoji: `🥋`,
      captions: ["I traine very day lol"],
      hashtags: ["muscle", "train", "yoyo"],
      warning: "MUSCLEEEEEEEEEE MUSCLE MUCLSE MUSLCEM MULSCEL",
      tip: "Ride your pet ride it irig did id i didn't even know that holy guacamoe",
      difficulty: 1,
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
      difficulty: 2,
    },
    {
      id: 4,
      name: `Mini Gordon Ramsay`,
      desc: `BACK TO THE KITCHEN! Dress your baby as a chef then feed them food they dislike, so they look like a food critic eating something revolting.`,
      emoji: `🏇`,
      captions: [
        "GRANDMA COULD MAKE BETTER FOOD THAN THIS",
        "Mom I told you more sugar. What is this?!",
      ],
      hashtags: [],
      warning: "",
      tip: "",
      difficulty: 2,
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
      difficulty: 2,
    },
  ],
  lockedPrompts: [
    {
      id: 6,
      name: "Are you okay?",
      emoji: "😷",
      difficulty: 1,
    },
    {
      id: 7,
      name: "Chaotic cute",
      emoji: "🧹",
      difficulty: 2,
    },
    {
      id: 8,
      name: "Wheres baby",
      emoji: "👀",
      difficulty: 2,
    },
  ],
};

export const initialUser = {
  _id: "",
  dateSignedUp: moment(),
  email: "",
  password: "",
  credits: 0,
  lastUpdated: moment(),
  completedPrompts: [
    // {
    //   _id: "",
    //   id: "",
    //   uri: "",
    //   dateUploaded: "",
    //   dateComplete: "",
    //   caption: "",
    //   selectedAsset: "",
    //   assets: [
    //     {
    //       _id: "",
    //       id: "",
    //       uri: "",
    //       width: 0,
    //       height: 0,
    //       fileSize: 0,
    //       type: "",
    //       fileName: "",
    //     },
    //   ],
    // },
  ],
  unlockedPromptIds: [], // array of photo ids
  sharingLinks: [],
  name: "",
  gender: "",
  babies: [{ name: "", gender: "", dob: "" }],
  uid: "",
  onboarding: {
    viewedIntro: false,
  },
  prioritizedPrompts: [],
};
