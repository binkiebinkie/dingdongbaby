Hey ChatGPT I need help making a Node Server. The app would send Prompts to a react-native frontend, and the prompts would be filtered depending on who is the User on the iOS device. I would like a boilerplate for a server with two main routes, one to CRUD a User and one to fetch Prompts. The Prompts are activities/challenges for a User to do, and the User will take a photo of the Prompt's activity to complete a Prompt.
The structure for a User is as follows between the grave accents:

```
const user = {
  id: null,
  dateSignedUp: new Date(),
  email: "",
  password: "",
  credits: 0,
  lastUpdated:  new Date(),
  completedPrompts: [], // array of completed prompt ids
  unlockedPromptIds: [], // array of unlocked prompt ids
  sharingLinks: [],
  name: "",
  gender: "",
  babies: [{ name: "", gender: "", dob: "" }], // array of babies associated with account
  prioritizedPrompts: [], // array of prompt ids; sorts prompts on frontend
}
```

The structure for a Prompt is as follows between the grave accents:

```
const prompt = {
id:null,
status: 'n', // if n, will be filtered out on frontend. For prompts that need more information	name:'',
emoji:'',
desc:'',
keywords:'',
captions:'',
warning:'',
tip:'',
difficulty:'', // number between 1-3, where 1 is easy and 3 is difficult
hashtags:'',
age:'', // Want to recomment an age for how old the User should be to complete Prompt
requirements:'',
pack:'', // Associate prompt to either payable extra content (DLC) or unlock from main app
comments:'', // internal usage for comments on prompt
reference:'', // internal usage for related images
}
```

A few questions:

- Do you have suggestions for a database technology to use? I am pretty new to server and database coding so the easiest one is best. Please recommend what node packages to install.
- I'd like to authenticate a user from an iOS device so I can associate a user to a device. But eventually I would like to be able to share an account across devices so multiple Users could see the Prompts and associated assets/images/videos. Additionally, for the main device, is it possible to see the Users Prompts without authenticating?
- I don't want to store the assets in a database without the Users permission. So to start, I would rather just store a path to the asset as opposed to the asset.

Please note that we will build the list of prompts from a Google Sheets CSV, so they are static. We shouldn't be able to create, update or delete them from the server. But Users should be able to fetch completed or unlocked prompts from the server. The User needs to unlock the Prompts by adding a Prompt's id to Users.completed_prompts array, which should then add a new random prompt to the Users.unlocked_prompts array. Using the new id in the unlocked_prompts array, we can then fetch the new Prompt for the user to complete.

If this is clear, I can send some requirements for routing I would like to set up. If not, please let me know and I will clear up any confusion.

The following routes are necessary for User:
Create a User
Update a User
Delete a User
get a User by id
Update any of the keys on the User object except id,

Based off of this information, the routes we need for the Prompts are as follows:
Randomly assign a prompt based on the difficulty parameter (Integer between 1-3) to the unlocked_prompts key on the User object, so if a User unlocks a Prompt they will receive a random one.
Fetch a prompt by id (but only if it exists in the Users.unlocked_prompts array)

---

It seems like we are missing the MongoDB User and Prompt models. What does the code look like for those, and where do the files live?

Also, it looks like we are missing a route for logging a user in and logging them out. How can we log in a user or log them out?

On the frontend, in the react-native code, what would hitting one of these endpoints look like? Should I use Axios to CRUD to the server?

Currently, to generate prompts on the frontend, I run the command `node bin/generate-prompts.js` and it puts all of the prompts into a file for me. Now, I would like to move that to the server. How should that file look? What node package should I use to interact with google sheets? Here are the contents of the file `bin/generate-prompts.js`:

---

Thanks ChatGPT, looking great so far. While mongodb is installing I will ask about routes. here are the routes I think we might need:

User:

- Create a User
- Update a User
- Delete a User
- get a User by id
- Update any of the keys on the User object except id and dateSignedUp

How would you recommend updating arrays, such as the unlockedPromptIds or completedPrompts arrays on the User object? Also, these routes should be authenticated right?

---

Also, based off of the fact the Prompts are static as I mentioned in my previous message, the routes we need for the Prompts are as follows:

- Randomly assign a prompt based on the difficulty parameter (Integer between 1-3) to the unlocked_prompts key on the User object, so if a User unlocks a Prompt they will receive a random one.
- Fetch a prompt by id (but only if it exists in the Users.unlocked_prompts array)
- Fetch multiple prompts by id (but only if they exist in the Users.unlocked_prompts array)
- Fetch a prompt that is yet to be unlocked, which will provide the prompts id, status, name, emoji, difficulty, age and requirements, but will exclude the other keys. This endpoint is for exposing prompts but not showcasing information without unlocking prompts

---

- Fetch multiple prompts by id (but only if they exist in the Users.unlocked_prompts array)
- Fetch a prompt that is yet to be unlocked, which will provide the prompts id, status, name, emoji, difficulty, age and requirements, but will exclude the other keys. This endpoint is for exposing prompts but not showcasing information without unlocking prompts

---

In the Users model the structure of a completed prompt in the completedPrompts array will look something like:

```
const completedPrompt = {
    uri:'',
    id:'',
    dateUploaded: new Date(),
    dateComplete: new Date(),
    caption:'',
    selectedAsset: asset.id,
    assets:[

    ]
}
```

And the completedPrompt's assets array will have assets that may look like

```
const asset = {
    id:'',
    uri:'',
    width:'',
    height:'',
    fileSize:'',
    type:'',
    fileName:'',
}

```

How can we integrate these structures with our current Users model?
