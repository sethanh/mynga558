import React from 'react'
import { StyleSheet, TouchableOpacity, View, Text } from 'react-native'
import { useTranslation } from 'react-i18next'
import { profileConst} from '@src/modules'
import {actionSetLanguage} from '@src/app'
import {
    fontSize,horizontalScale,setLanguare,
    verticalScale,Colors,Fonts,IconCloseLang,Translator
} from '@src/core'
import { useDispatch, useSelector } from 'react-redux'

interface LangProps {
    onClose?: ()=> void  | null
}

const LanguareComponent = (props: LangProps) => {
    const {onClose} = props
    const { t } = useTranslation()
    const dispatch = useDispatch()
    const { languages } = profileConst
    const language =useSelector((state: any) => {
        return state.language
    })

    const handleChangeLanguare = (lang: string) => async () => {
        dispatch(actionSetLanguage(lang))
        Translator.changeLanguages(lang)
        await setLanguare(lang)
    }

    const renderButtonView = (item: any, index: number) => (
        <TouchableOpacity
            style={[
                styles.btnLang,
                language.language===item.value&&styles.btnLangFocus
            ]}
            onPress={handleChangeLanguare(item.value)}
            key={index}
        >
            <item.Icon/>
            <Text 
            style={[
                styles.txtLang,
                language.language===item.value&&styles.txtLangFocus
            ]}
            >{t(item.title)}</Text>
        </TouchableOpacity>
    )

    return (
        <View style={styles.option}>
            <View style={[styles.wrapperOption, styles.borderTop]}>
                <View style={[styles.headChange, styles.spaceCenter, styles.borderTop]}>
                    <Text style={styles.txthead}>{t('change_language')}</Text>
                    <TouchableOpacity onPress={onClose}>
                        <IconCloseLang/>
                    </TouchableOpacity>
                </View>
                {languages.map((item, index) => renderButtonView(item,index))}
            </View>
        </View>
    )
}

export default LanguareComponent

LanguareComponent.defaultProps = {
    onClose: ()=>{}
}

const styles = StyleSheet.create({
    btnLangFocus: {
        backgroundColor: Colors.h96481B,
    },
    btnLang: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: horizontalScale(25),
        backgroundColor: 'transparent',
        height: verticalScale(50),
    },
    txtLang:{
        fontSize: fontSize(16),
        lineHeight: fontSize(24),
        fontFamily: Fonts.Helvetica,
        fontWeight:'400',
        marginHorizontal: horizontalScale(11),
        color: Colors.h151515
    },
    txtLangFocus:{
        color: Colors.hFFFFFF
    },
    txt: {
        fontSize: fontSize(16),
        marginLeft: horizontalScale(17),
    },
    option: {
        width: '100%',
        height: '100%',
        justifyContent: 'flex-end',
    },
    borderTop: {
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
    },
    wrapperOption: {
        width: '100%',
        height: verticalScale(320),
        alignSelf: 'flex-end',
        paddingBottom: verticalScale(52),
        backgroundColor: Colors.BASE_COLOR.WHITE,
        paddingHorizontal: horizontalScale(22)

    },
    boderTop: {
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16
    },
    spaceCenter: {
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    headChange: {
        flexDirection: 'row',
        height: verticalScale(50),
        shadowColor: Colors.h1E1E1E,
        elevation: 5,
        shadowOffset: {
            width: 0,
            height: 10
        },
        shadowOpacity: 0.05,
        shadowRadius: 30,
        backgroundColor: 'white',
        marginBottom: verticalScale(18),
        marginHorizontal: -horizontalScale(22),
        paddingHorizontal: horizontalScale(22),
    },
    txthead:{
        fontSize: fontSize(20),
        lineHeight: fontSize(30),
        fontFamily: Fonts.Helvetica_Bold,
        color: Colors.h151515
    }
})
