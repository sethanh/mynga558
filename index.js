/**
 * @format
 */

import { AppRegistry } from 'react-native'
import AppProvider from './src/app/AppProvider'
import { name as appName } from './app.json'

AppRegistry.registerComponent(appName, () => AppProvider)
