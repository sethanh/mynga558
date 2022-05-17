import React, { useState } from 'react'
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native'
import { useTranslation } from 'react-i18next'
import {
    Colors, Container, Fonts, fontSize, horizontalScale, verticalScale, Button, Form, IconScaner
} from '@src/core'
import { FormProvider, useForm } from 'react-hook-form'

interface FormValues {
    address: string,
}

const AddressSend = ({ route }: any) => {
    const { t } = useTranslation()
    const { params } = route
    const [cardano, setCardano] = useState(true)
    const [data] = useState(params)
    const form = useForm<FormValues>({
        defaultValues: params,
        mode: 'onChange',
    })

    console.log(data)
    return (
        <Container.Main
            headerShow
            title={t('send_crypto')}
        >
            <View style={styles.content}>
                <View style={styles.row}>
                    <Button.Main
                        label={t('cardano')}
                        container={cardano && styles.buttonNetwork || styles.buttonNetworkNone}
                        onPress={() => setCardano(true)}
                        labelStyle={cardano && styles.labelStyle || styles.labelStyleNone}

                    />
                    <Button.Main
                        label={t('came_link')}
                        container={!cardano && styles.buttonNetwork || styles.buttonNetworkNone}
                        onPress={() => setCardano(false)}
                        labelStyle={!cardano && styles.labelStyle || styles.labelStyleNone}
                    />
                </View>
                <Text style={[styles.labelStyle, styles.txtLable, styles.marginHeader]}>{t('wallet_address')}</Text>
                <View style={[styles.row]}>
                    <FormProvider {...form}>
                        <Form.TextInput
                            name='address'
                            contentStyle={styles.inputStyle}
                            containerStyle={styles.containerStyle}
                            placeholder={t('type')}
                        />
                    </FormProvider>
                    <TouchableOpacity style={styles.wrapperIcon}>
                        <IconScaner />
                    </TouchableOpacity>
                </View>
                <Button.Gradient
                    label={t('choose_list_address')}
                    onPress={() => { }}
                    container={styles.marginInput}
                />
                <Button.Main
                    label={t('next')}
                    onPress={() => { }}
                    container={styles.button}
                />
            </View>
        </Container.Main>
    )
}

export default AddressSend

const styles = StyleSheet.create({
    content: {
        backgroundColor: Colors.hFFFFFF,
        paddingTop: verticalScale(24),
        paddingBottom: verticalScale(34),
        borderTopLeftRadius: horizontalScale(30),
        borderTopRightRadius: horizontalScale(30),
        paddingHorizontal: horizontalScale(22),
        marginTop: verticalScale(24),
        flex: 1,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'center'
    },
    buttonNetwork: {
        width: horizontalScale(120),
        height: verticalScale(38),
        marginHorizontal: horizontalScale(5),
    },
    labelStyle: {
        fontFamily: Fonts.Helvetica,
        fontSize: fontSize(14),
        lineHeight: fontSize(22)
    },
    labelStyleNone: {
        color: Colors.h151515,
        fontFamily: Fonts.Helvetica,
        fontSize: fontSize(14),
        lineHeight: fontSize(22)
    },
    buttonNetworkNone: {
        width: horizontalScale(120),
        height: verticalScale(38),
        marginHorizontal: horizontalScale(5),
        backgroundColor: Colors.BASE_COLOR.WHITE,
        borderWidth: 1,
        borderColor: Colors.h151515,
    },
    button: {
        marginTop: verticalScale(18)
    },
    inputStyle: {
        flex: 1,
        backgroundColor: Colors.BASE_COLOR.WHITE,
        borderWidth: 1,
        borderColor: Colors.hE3E3E3
    },
    containerStyle: {
        flex: 1
    },
    marginHeader: {
        marginTop: verticalScale(23),

    },
    txtLable: {
        fontFamily: Fonts.Helvetica_Bold,
        color: Colors.h656565,
        marginBottom: verticalScale(4),
        paddingLeft: horizontalScale(18)
    },
    marginInput: {
        marginTop: verticalScale(100)
    },
    wrapperIcon: {
        marginLeft: horizontalScale(12)
    }
})