import * as React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import {
    SplashPage, LoginPage, RegisterWallet, RecoveryWallet, ConfirmWallet,
    SuccessWallet, SecureWallet, ConfirmPhrase, RegisterSuccess, EditProfile,
    SearchPage, ChangePassword, Notification, NotificationDetail, KycAccount,
    RecoverySeedPhrase, SecurtityPage, SendPage, AddressSend, ChartPage
} from '@src/modules'
import { Screens } from '@src/core'
import BottomTab from './BottomTab'

const Stack = createStackNavigator()

const AppNavigation = ({ initialRouteName }: { initialRouteName: string }) => {

    return (
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName={initialRouteName}
                screenOptions={{
                    headerShown: false
                }}>
                <Stack.Screen name={Screens.HOMEPAGE} component={BottomTab} />
                <Stack.Screen name={Screens.SPLASH} component={SplashPage} />
                <Stack.Screen name={Screens.LOGIN} component={LoginPage} />
                <Stack.Screen name={Screens.REGISTER_WALLET} component={RegisterWallet} />
                <Stack.Screen name={Screens.SECURE_WALLET} component={SecureWallet} />
                <Stack.Screen name={Screens.CONFIRM_PHRASE} component={ConfirmPhrase} />
                <Stack.Screen name={Screens.RECOVERY_WALLET} component={RecoveryWallet} />
                <Stack.Screen name={Screens.CONFIRM_WALLET} component={ConfirmWallet} />
                <Stack.Screen name={Screens.SUCCESS_WALLET} component={SuccessWallet} />
                <Stack.Screen name={Screens.EDIT_PROFILE} component={EditProfile} />
                <Stack.Screen name={Screens.REGISTER_SUCCESS} component={RegisterSuccess} />
                <Stack.Screen name={Screens.SEARCH_PAGE} component={SearchPage} />
                <Stack.Screen name={Screens.CHANGE_PASSWORD} component={ChangePassword} />
                <Stack.Screen name={Screens.NOTIFICATION_PROFILE} component={Notification} />
                <Stack.Screen name={Screens.NOTIFICATION_DETAIL} component={NotificationDetail} />
                <Stack.Screen name={Screens.KYC_ACCOUNT} component={KycAccount} />
                <Stack.Screen name={Screens.RECOVERY_SEED_PHRASE} component={RecoverySeedPhrase} />
                <Stack.Screen name={Screens.SECURITY_PAGE} component={SecurtityPage} />
                <Stack.Screen name={Screens.SEND_TOKEN_PAGE} component={SendPage} />
                <Stack.Screen name={Screens.ADDRESS_SEND} component={AddressSend} />
                <Stack.Screen name={Screens.CHART_PAGE} component={ChartPage} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default AppNavigation