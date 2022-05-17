import { Button, Colors, Fonts, fontSize, horizontalScale, Modal } from '@src/core'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { StyleSheet, View, Dimensions, Image, Text, FlatList } from 'react-native'
import { NetworkComponent } from '../../components'
import { dataNetwork, listNetwork } from '../../constants'

const { width } = Dimensions.get('window')
const NFTPage = () => {
  const { t } = useTranslation()
  const [isVisible, setVisible] = useState(false)
  const [network, setNetwork] = useState(listNetwork)
  const [label, setLabel] = useState('Cadarno Blockchain')

  const renderItem = ({ item }: any) => {
    return (
      <View style={styles.viewItem}>
        <Image
          style={styles.img}
          source={{ uri: item.url || '' }}
        />
        <Text style={styles.label}>{item.name}</Text>
      </View>
    )
  }

  const renderHeader = () => {
    return (
      <Button.DropDown
        title={t('choose_network')}
        label={label}
        container={styles.dropdown}
        onPress={() => setVisible(true)}
      />
    )
  }

  const renderModalNetwork = () => {
    return (
      <Modal.Light visible={isVisible}>
        <NetworkComponent
          onClose={() => setVisible(false)}
          data={network}
          onChoose={(data: any) => handleNetwork(data)}
        />
      </Modal.Light>
    )
  }

  const handleNetwork = (data: any) => {
    const newData = network.map((obj: any) => {
      if (obj.title === data.title) {
        return { ...obj, isSelected: true }
      }
      return { ...obj, isSelected: false }
    })
    setNetwork(newData)
    setLabel(data.title)
    setVisible(false)
  }

  return (
    <View style={styles.container}>
      <FlatList
        contentContainerStyle={styles.viewNetwork}
        columnWrapperStyle={styles.spaceBetween}
        data={dataNetwork}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        keyExtractor={(_item, index) => index.toString()}
        numColumns={2}
        ItemSeparatorComponent={() => <View style={{ height: horizontalScale(8) }} />}
        ListHeaderComponent={renderHeader}
      />
      {renderModalNetwork()}
    </View>
  )
}

export default NFTPage

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width,
    paddingHorizontal: horizontalScale(8)
  },
  dropdown: {
    marginLeft: horizontalScale(14),
    width: horizontalScale(331),
    marginTop: horizontalScale(17),
    marginBottom: horizontalScale(18),
  },
  viewItem: {
    width: horizontalScale(175),
    borderWidth: 1,
    borderColor: Colors.hE3E3E3,
    borderRadius: horizontalScale(18),
    alignItems: 'center'
  },
  img: {
    width: horizontalScale(175),
    height: horizontalScale(175),
    borderRadius: horizontalScale(18)
  },
  label: {
    fontFamily: Fonts.Helvetica_Bold,
    fontSize: fontSize(14),
    marginVertical: horizontalScale(8),
    maxWidth: horizontalScale(159),
    color: Colors.h151515,
    lineHeight: fontSize(22)
  },
  spaceBetween: {
    justifyContent: 'space-between'
  },
  viewNetwork: {
    paddingBottom: horizontalScale(200)
  }

})
