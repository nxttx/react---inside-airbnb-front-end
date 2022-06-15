import { LOCALIP } from "../core/GLOBAL";


export const config ={
  appId: '905af498-331e-4f17-a29f-bac060a03147',
  redirectURL: LOCALIP,
  scopes:[
    'user.read',
    'profile'
  ],
  authority: 'https://login.microsoftonline.com/63128insideairbnb.onmicrosoft.com'
};