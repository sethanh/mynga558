import {
  IconBriefCase, IconDatabase, IconFile, IconGlobe, IconHelp, IconKey, IconKyc, IconLock, IconLogout, IconSecurity,
  IconEngFlag, IconFranceFlag, IconArabicFlag, IconIndiaFlag
}
  from '@src/core'

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
const userDatas = {
  fullName: 'Stanley Cohen',
  email: 'stanleycohen.711@gmail.com',
  country: 32,
  countryCode: 'FR',
  numberPhone: '456 456',
  avatar: "https://media.istockphoto.com/photos/fit-man-standing-outdoors-in-a-city-picture-id1299360138?b=1&k=20&m=1299360138&s=170667a&w=0&h=qDYNwRf6CwbkyWK-WEmhMJ_KaZ4hJFmy_89PFdz6AsI="
}
const urlDefaultAvatar = "https://i.imgur.com/e9FsjsU.png"
const languages = [
  { title: 'english', value: 'en', Icon: IconEngFlag },
  { title: 'french', value: 'fr', Icon: IconFranceFlag },
  { title: 'arabic', value: 'ar', Icon: IconArabicFlag },
  { title: 'india', value: 'ind', Icon: IconIndiaFlag }
]
const notiDatas = [
  {
    title: 'Received token from address', token: '0x197x1vy3qpx09uscywhpp927edh2s2s111ss2swses', network: 'Cardano Blockchain',
    time: '17/02/2022, 07:52', total: 50, unit: '$USTD', status: 0, from: 'addr1vy3qpx09uscywhthsnq6qyh2mpps86h', to: 'addr1vy4qpx09uscywhthsnq6qyh2mpps86h'
  },

  {
    title: 'Received token from address', token: '0x197x1vy3qpx09uscywhpp927edh2s2s111ss2swses', network: 'Cardano Blockchain',
    time: '17/02/2022, 07:52', total: 23, unit: 'ADA', status: 0, from: 'addr1vy3qpx09uscywhthsnq6qyh2mpps86h', to: 'addr1vy4qpx09uscywhthsnq6qyh2mpps86h'
  },

  {
    title: 'You sent token successfully to', token: '0x197x1vy3qpx09uscywhpp927edh2s2s111ss2swses', network: 'Cardano Blockchain',
    time: '17/02/2022, 07:52', total: 20, unit: 'CML', status: 1, from: 'addr1vy3qpx09uscywhthsnq6qyh2mpps86h', to: 'addr1vy4qpx09uscywhthsnq6qyh2mpps86h'
  },

  {
    title: 'You sent 50 ADA failed to', token: '0x197x1vy3qpx09uscywhpp927edh2s2s111ss2swses', network: 'Cardano Blockchain',
    time: '17/02/2022, 07:52', total: 52, unit: '$USTD', status: 2, from: 'addr1vy3qpx09uscywhthsnq6qyh2mpps86h', to: 'addr1vy4qpx09uscywhthsnq6qyh2mpps86h'
  },

  {
    title: 'Received token from address', token: '0x197x1vy3qpx09uscywhpp927edh2s2s111ss2swses', network: 'Cardano Blockchain',
    time: '17/02/2022, 07:52', total: 23, unit: 'ADA', status: 0, from: 'addr1vy3qpx09uscywhthsnq6qyh2mpps86h', to: 'addr1vy4qpx09uscywhthsnq6qyh2mpps86h'
  },

  {
    title: 'You sent token successfully to', token: '0x197x1vy3qpx09uscywhpp927edh2s2s111ss2swses', network: 'Cardano Blockchain',
    time: '17/02/2022, 07:52', total: 20, unit: 'CML', status: 1, from: 'addr1vy3qpx09uscywhthsnq6qyh2mpps86h', to: 'addr1vy4qpx09uscywhthsnq6qyh2mpps86h'
  },
]
const kycChecks = { frontCard: false, backCard: false, address: false, check: false }

export const profileConst = {
  settings,
  network,
  others,
  signout,
  userDatas,
  urlDefaultAvatar,
  languages,
  notiDatas,
  kycChecks
}