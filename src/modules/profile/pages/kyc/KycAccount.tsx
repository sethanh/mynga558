import React, { useState, useMemo } from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { useTranslation } from 'react-i18next'
import DocumentPicker, { DocumentPickerOptions, DocumentPickerResponse } from 'react-native-document-picker'

import {
  Colors, Container, Fonts, fontSize, horizontalScale, verticalScale, IconDashedLine, IconValidatedKyc, Button, IconRefusedKyc
} from '@src/core'
import { profileConst } from '@src/modules'

const OptionsDocuments: DocumentPickerOptions<'ios' | 'android'> = {
  type: [
    DocumentPicker.types.pdf,
    DocumentPicker.types.images
  ],
}

const KycAccount = () => {
  const { t } = useTranslation()
  const {kycChecks } = profileConst
  const [checks,setChecks]= useState(kycChecks)
  const [frontCard, setFrontCard] = useState<DocumentPickerResponse | null>(null)
  const [backCard, setBackCard] = useState<DocumentPickerResponse | null>(null)
  const [address, setAddress] = useState<DocumentPickerResponse | null>(null)

  const handleUpload = async (title:string) =>  {
    try{
      const result = await DocumentPicker.pick(OptionsDocuments)
      const file = result[0]
      switch(title) {
        case 'identity_proof_front':
          setFrontCard(file)
          break
        case 'identity_proof_backside':
          setBackCard(file)
          break
        default:
          setAddress(file)
      }
    }
    catch (err){
      if( DocumentPicker.isCancel(err)){
        console.log('cancel')
      }
      else{
        throw err
      }
    }
  }

  const onSubmit =()=>{
    if(frontCard&&backCard&&address){
      setChecks({
        check:true,
        frontCard:true,
        backCard:true,
        address:true
      })
    }
  }
  
  const checkSuccess= useMemo(() => {
    return  checks.frontCard&&checks.backCard&&checks.address&&checks.check
  },[checks])

  const renderUpdateProofView = (title: string,showBtn:boolean, check: boolean) => (
    <View style={[styles.wrapperProof,checkSuccess&&styles.center]}>
      <View style={styles.row}>
        {check&&<IconValidatedKyc />||checks.check&&!check&&<IconRefusedKyc/>}
        <Text style={styles.txtProof}>{t(title)}</Text>
      </View>
      {
        showBtn&&
        <Button.Main
           label={t('upload')}
           container={styles.button}
           labelStyle={styles.txtButton}
           onPress={() => handleUpload(title)}
        />
      }
    </View>
  )

  return (
    <Container.Main
      headerShow
      title={t('kyc_account')}
    >
      <View style={styles.content}>
        <View>
          <Text style={[styles.title2]}>{t('update_your_information')}</Text>
          <Text style={[styles.desFont]}>{t('des_kyc')}</Text>
          {checks.check&& <IconDashedLine style={styles.line} />}
          {checks.check&&
          <Text 
            style={[
            styles.txtCheck,
            checkSuccess&&styles.txtValidated||styles.txtRefused
            ]}
          >
            {t(checkSuccess&&'validated'||'refused')}
          </Text>}
          <IconDashedLine style={styles.line} />

          {renderUpdateProofView('identity_proof_front',!frontCard&&!checks.frontCard||!checks.frontCard&&checks.check,checks.frontCard)}
          {renderUpdateProofView('identity_proof_backside',!backCard&&!checks.backCard||!checks.backCard&&checks.check,checks.backCard)}
          {renderUpdateProofView('address_proof',!address&&!checks.address||!checks.address&&checks.check,checks.address)}
          
          <IconDashedLine style={styles.line} />
          <Text style={[styles.desFont, styles.txtType]}>{t('type_kyc_file')}</Text>
        </View>
        {!checkSuccess&&
         <Button.Main
         label={t('submit_documents')}
         onPress={() =>onSubmit() }
       />}
       

      </View>

    </Container.Main>
  )
}

export default KycAccount

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
    justifyContent: 'space-between'
  },
  font: {
    fontSize: fontSize(16),
    lineHeight: fontSize(24),
    color: Colors.h151515,
    fontFamily: Fonts.Helvetica,
  },
  desFont: {
    fontSize: fontSize(14),
    lineHeight: fontSize(22),
    fontFamily: Fonts.Helvetica,
    color: Colors.h656565,
    textAlign: 'center',
  },
  title: {
    fontFamily: Fonts.Helvetica_Bold,
  },
  title2: {
    fontSize: fontSize(20),
    fontFamily: Fonts.Helvetica_Bold,
    textAlign: 'center',
    lineHeight: fontSize(30),
    color: Colors.hC2862F,
    marginBottom: verticalScale(10)
  },
  wrapperProof: {
    flexDirection: 'row',
    height: verticalScale(36),
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: verticalScale(14),
    width:'100%',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent:'space-between',
    width: horizontalScale(220)
  },
  button: {
    backgroundColor: Colors.BASE_COLOR.WHITE,
    height: verticalScale(36),
    width: horizontalScale(90),
    borderColor: Colors.h151515,
    borderWidth: 1
  },
  txtButton: {
    color: Colors.h151515,
    fontSize: fontSize(14),
    lineHeight: fontSize(22)
  },
  txtType: {
    color: Colors.h1E65FF
  },
  line: {
    marginVertical: verticalScale(30)
  },
  txtCheck: {
    fontSize: fontSize(28),
    lineHeight: fontSize(36),
    fontFamily: Fonts.Helvetica_Bold,
    textAlign: 'center',
  },
  txtValidated: {
    color: Colors.h29CD7E
  },
  txtRefused: {
    color: Colors.hE95534
  },
  txtProof: {
    fontSize: fontSize(16),
    lineHeight: fontSize(24),
    fontFamily: Fonts.Helvetica_Bold,
    marginLeft: horizontalScale(8),
    textAlign:'left',
    flex:1
  },
  center:{
    justifyContent:'center',
  }
})