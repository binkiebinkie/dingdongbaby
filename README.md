# dingdongbaby

## About

Dingdong Baby is a photo challenge game for parents with young children, where winning means building an album of funny and unique photos.

Built with React Native, not exported from Expo. Run yarn start to start project

Ding Dong Baby ddb dingdongbaby to do list

- Where are prompts coming from? Frontend? Database?
  - Server pulls them from google sheet and puts them in a DB?
  - Frontend pulls them from google sheet? No need for server for now, but eventually move prompt hook to server. So no information can be accessed
  - Can do it a few ways:
    - Prompts are in a sheet, each cell references a translation key, key can have multiple values seperated by |
- Randomized copy; use translate like LL
  - Make translation array work; Pass in array to translate hook and it will randomly choose one of the translations
- Settings, challenges (to unlock more photos),
- How do we pull a photo from a phone? Do we put it in an album? Associate a photo ID with a prompt ID?
  - React native expo and phone photos
- Share to twitter/insta

USER

- Account info
  - id, name, app store account, has onboarded, etc...
  - React native and app store
- Unlocked prompts
  - array of prompt id's
- Unlocked dlcs
- Completed prompts
  - prompt id, photo association
- completed challenges
- Can signup, assign prompts (do without login/password)

PROMPTS

- List of prompts
- Can get by prompt id, add random prompt to account, etc...

SERVER PURPOSE

- Prompts
  - Send list of unlocked prompts to account - so all prompts aren't available to phone
  - Pull photos from Instagram for different prompts inspiration
  -
- Account
  -
  - Host Account settings
    - Store DLCs, Unlocked Prompts, etc...
    - Permission to save baby photos to server "DingDong Baby does not save your beautiful memories to a database without your permission. This ensures your memories stay on your phone, behind lock and key (AKA phone password). But, should something happen to your phone you could lose your photos if you don't have them saved anywhere. Or if you wish to share your baby memories with friends and family you won't be able to as we don't have any of the memories saved. If you'd like, we can save them to our database for you but only with your permission."
