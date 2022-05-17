import React from "react"
import { Text } from "react-native"
import MaskedView from "@react-native-community/masked-view"
import LinearGradient from "react-native-linear-gradient"
import { Colors } from "@src/core/utils"

const GradientText = (props: any) => {
  const { gradientColor } = props
  return (
    <MaskedView maskElement={<Text {...props} />}>
      <LinearGradient
        colors={gradientColor || Colors.gradientDefault}
        start={{ x: 0, y: 1 }}
        end={{ x: 1, y: 0 }}
      >
        <Text {...props} style={[props.style, { opacity: 0 }]} />
      </LinearGradient>
    </MaskedView>
  )
}

export default GradientText