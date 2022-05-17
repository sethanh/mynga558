import { IconBriefCase, IconDatabase, IconFile, IconGlobe, IconHelp, IconKey, IconKyc, IconLock, IconLogout, IconSecurity } from '@src/core'

const settings = [
  { title: "kyc", Icon: IconKyc },
  { title: "recover_phrase", Icon: IconKey },
  { title: "security", Icon: IconSecurity },
  { title: "change_password", Icon: IconLock },
]
const network = { title: "default_network", Icon: IconDatabase }
const others = [
  { title: "about", Icon: IconBriefCase },
  { title: "help_center", Icon: IconHelp },
  { title: "service_terms", Icon: IconFile },
  { title: "privacy_policy", Icon: IconFile },
  { title: "languages", Icon: IconGlobe },
]
const signout = { title: "sign_out", Icon: IconLogout, out: true }
const userDatas={
  fullName:'Stanley Cohen',
  email:'stanleycohen.711@gmail.com',
  country:32,
  countryCode:'FR',
  numberPhone:'456 456',
  avatar: "https://hinhanhdephd.com/wp-content/uploads/2016/01/tai-hinh-girl-xinh-lam-avatar-de-thuong-nhat-21.jpg"
}
const urlDefaultAvatar = "https://i.imgur.com/e9FsjsU.png"
export const profileConst={
  settings,
  network,
  others,
  signout,
  userDatas,
  urlDefaultAvatar
}