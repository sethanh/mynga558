import React from 'react'
import { Text, View, Dimensions, StyleSheet } from 'react-native'
import {
  HomePage, ProfilePage, WalletPage
} from '@src/modules'
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs"
import { useTranslation } from 'react-i18next'
import { Colors, fontSize, horizontalScale, IconHomeActive, IconHomeInactive, IconProfileActive, IconProfileInactive, IconWalletActive, IconWalletInacctive, Screens } from '@src/core'
import { SvgProps } from 'react-native-svg'

const Tab = createMaterialBottomTabNavigator()
const { width } = Dimensions.get('window')
const widthTab = (width - horizontalScale(44)) / 3

const RenderIcon = ({ Icon, title }: { Icon: React.FC<SvgProps>, title: string }) => {
  return (
    <View style={styles.viewActive}>
      <Icon />
      <Text style={styles.title}>{title}</Text>
    </View>
  )
}

const RenderIconInactive = ({ Icon, title }: { Icon: React.FC<SvgProps>, title: string }) => {
  return (
    <View style={styles.viewActive}>
      <Icon />
      <Text style={[styles.title, { color: Colors.h656565 }]}>{title}</Text>
    </View>
  )
}

export default function BottomTab() {
  const { t } = useTranslation()
  return (
    <Tab.Navigator
      initialRouteName={Screens.HOME}
      shifting={false}
      sceneAnimationEnabled={false}
      barStyle={styles.styleBar}
      labeled={false}
    >
      <Tab.Screen
        name={Screens.HOME}
        component={HomePage}
        options={{
          tabBarIcon: ({ focused }) => {
            if (focused) return <RenderIcon Icon={IconHomeActive} title={t('home')} />
            return <RenderIconInactive Icon={IconHomeInactive} title={t('home')} />
          },
        }}
      />
      <Tab.Screen
        name={Screens.WALLET_PAGE}
        component={WalletPage}
        options={{
          tabBarIcon: ({ focused }) => {
            if (focused) return <RenderIcon Icon={IconWalletActive} title={t('wallet')} />
            return <RenderIconInactive Icon={IconWalletInacctive} title={t('wallet')} />
          },
        }}
      />
      <Tab.Screen
        name={Screens.PROFILE_PAGE}
        component={ProfilePage}
        options={{
          tabBarIcon: ({ focused }) => {
            if (focused) return <RenderIcon Icon={IconProfileActive} title={t('profile')} />
            return <RenderIconInactive Icon={IconProfileInactive} title={t('profile')} />
          },
        }}
      />
    </Tab.Navigator>
  )
}

const styles = StyleSheet.create({
  viewActive: {
    flex: 1,
    backgroundColor: Colors.hFFFFFF,
    flexDirection: 'row',
    width: widthTab,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: fontSize(12),
    marginLeft: horizontalScale(5),
    color: Colors.hC2862F
  },
  styleBar: {
    position: 'absolute',
    bottom: horizontalScale(34),
    left: horizontalScale(22),
    right: horizontalScale(22),
    elavation: 0,
    backgroundColor: Colors.hFFFFFF,
    height: 55,
    borderRadius: horizontalScale(30),
    overflow: 'hidden',
  }
})
