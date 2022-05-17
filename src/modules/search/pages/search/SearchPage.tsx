import { Colors, Container, Fonts, fontSize, Form, horizontalScale, IconClose, IMAGE } from '@src/core'
import React from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { StyleSheet, View, Text, Image, FlatList } from 'react-native'
import { listCoin } from '../../constants'

interface FormValue {
  search: ''
}

const SearchPage = () => {
  const { t } = useTranslation()
  const form = useForm<FormValue>({
    defaultValues: {},
    mode: 'onChange'
  })

  const onClear = () => {
    form.reset()
  }

  const renderListCoin = ({ item }: any) => {
    return (
      <FlatList
        data={item.coin}
        renderItem={renderItemCoin}
        showsVerticalScrollIndicator={false}
        keyExtractor={(_item, index) => index.toString()}
        ItemSeparatorComponent={() => <View style={{ height: horizontalScale(14) }} />}
        ListHeaderComponent={() => {
          return <Text style={styles.title}>{item.name}</Text>
        }}
      />
    )
  }

  const renderItemCoin = ({ item }: any) => {
    return (
      <View style={styles.row}>
        <Image
          style={styles.coin}
          source={{ uri: item.img || '' }}
        />

        <View style={styles.viewCoin}>
          <View>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.symbol}>{item.symbol}</Text>
          </View>
          <Text style={styles.value}>{item.value}</Text>
        </View>
      </View>
    )
  }

  return (
    <Container.Main
      headerShow
      title={t('search')}
    >
      <View style={styles.header}>
        <View style={styles.viewSearch}>
          <FormProvider {...form}>
            <Form.TextInput
              name='search'
              leftIcon={IMAGE.IC_SEARCH}
              check
              RightIcon={IconClose}
              placeholder={`${t('search')}...`}
              onRightPress={onClear}
              contentStyle={styles.search}
            />
          </FormProvider>
        </View>
        <View style={styles.content}>
          <FlatList
            contentContainerStyle={{ paddingHorizontal: horizontalScale(24) }}
            renderItem={renderListCoin}
            data={listCoin}
            showsVerticalScrollIndicator={false}
            keyExtractor={(_item, index) => index.toString()}
          />
        </View>
      </View>
    </Container.Main>
  )
}

export default SearchPage

const styles = StyleSheet.create({
  header: {
    flex: 1,
    paddingTop: horizontalScale(25),
  },
  viewSearch: {
    marginBottom: horizontalScale(18),
    paddingHorizontal: horizontalScale(24),
  },
  search: {
    backgroundColor: Colors.hFFFFFF
  },
  content: {
    flex: 1,
    borderTopLeftRadius: horizontalScale(30),
    borderTopRightRadius: horizontalScale(30),
    backgroundColor: Colors.hFFFFFF
  },
  coin: {
    width: horizontalScale(48),
    height: horizontalScale(48),
    borderRadius: horizontalScale(24)
  },
  viewCoin: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: horizontalScale(12),
    alignItems: 'center'
  },
  name: {
    fontSize: fontSize(16),
    fontFamily: Fonts.Helvetica_Bold,
    color: Colors.h151515,
    lineHeight: fontSize(24)
  },
  symbol: {
    fontSize: fontSize(14),
    fontFamily: Fonts.Helvetica,
    color: Colors.h656565,
    lineHeight: fontSize(22)
  },
  value: {
    fontSize: fontSize(14),
    fontFamily: Fonts.Helvetica,
    color: Colors.h151515,
    lineHeight: fontSize(22)
  },
  title: {
    fontSize: fontSize(20),
    fontFamily: Fonts.Helvetica,
    color: Colors.h656565,
    lineHeight: fontSize(30),
    marginVertical: horizontalScale(11)
  },
  row: {
    flexDirection: 'row'
  }
})
