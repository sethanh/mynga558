import React from 'react'
import { Modal, View, Pressable, StyleSheet, StyleProp, ViewStyle } from 'react-native'
import { BlurView } from "@react-native-community/blur"

interface ModalProps {
    visible?: boolean 

    animationType?: 'none' | 'slide' | 'fade'

    children: JSX.Element | JSX.Element[] | null

    onCloseModal?: () => void

    containerStyle?: StyleProp<ViewStyle>

    disable?: boolean
}

const ModalDark = (props: ModalProps) => {
    const {
        visible,
        disable,
        containerStyle,
        animationType,
        children,
        onCloseModal,
    } = props

    return (
        <Modal transparent visible={visible} animationType={animationType}>
            <View style={[styles.container, containerStyle]}>
                <Pressable disabled={disable} onPress={onCloseModal} style={styles.blur}>
                    <BlurView
                        style={styles.popub}
                        blurType="dark"
                        blurAmount={10}
                    />
                </Pressable>

                {children}
            </View>
        </Modal>
    )
}

export default ModalDark

ModalDark.defaultProps = {
    animationType: 'fade',
    containerStyle: {},
    disable: false,
    onCloseModal: () => { },
    visible: false
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    blur: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: -1,
    },
    content: {
        justifyContent: 'center',
    },
    popub: {
        flex: 1
    }
})
