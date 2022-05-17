import React from 'react'
import { Animated, StyleSheet, View, Dimensions, Text } from 'react-native'
import PropTypes from 'prop-types'
import { isTablet } from '@src/core/utils'

const { width, height } = Dimensions.get('window')

export const CircleListLayout = ({
  calcHeight,
  containerStyle,
  displayData,
  keyExtractor,
  panHandlers,
  renderItem,
  state,
  visibleDataBounds,
  renderCard,
  renderText,
  radius
}) => (
  <View {...panHandlers} style={[styles.container, { height: calcHeight() }, containerStyle]}>
    <View style={styleCircle(isTablet ? radius + width * 0.06 : radius).viewCircle}>
      {renderCard()}
    </View>
    {renderText()}

    <View style={styles.wrapper}>
      {displayData.map((item, index) => {
        const scale = state[`scale${index}`]
        const translateX = state[`translateX${index}`]
        const translateY = state[`translateY${index}`]
        const { _dataIndex, ...itemToRender } = item
        // transform: [{ translateX }, { translateY }, { scale }], //horizontal
        // transform: [{ translateX: translateY }, { translateY: translateX }, { scale }], //vertical-right;

        return (
          translateX &&
          translateY &&
          visibleDataBounds &&
          visibleDataBounds.includes(_dataIndex) && (
            <Animated.View
              key={keyExtractor(item, index)}
              style={[
                styles.renderItemContainer,
                {
                  transform: [{ translateX: translateY }, { translateY: translateX }],
                },
              ]}
            >
              {renderItem({ item: itemToRender, index: item._dataIndex })}
            </Animated.View>
          )
        )
      })}
    </View>
  </View>
)

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    flexDirection: 'row',
    justifyContent: 'center',
    alignSelf: 'stretch',
    overflow: 'hidden',
    paddingTop: width * 0.08
  },
  renderItemContainer: {
    position: 'absolute',
    top: isTablet ? width * 0.3 : width * 0.43,
  },
  wrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignSelf: 'stretch',
    marginTop: width * 0.0267,
  }
})

const styleCircle = (radius) =>
  StyleSheet.create({
    viewCircle: {
      width: radius * 2,
      height: radius * 2,
      borderRadius: radius,
      position: 'absolute',
      left: -radius,
      top: width * 0.08,
      backgroundColor: '#fff',
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 7,
      },
      shadowOpacity: 0.43,
      shadowRadius: 9.51,
      elevation: 15,
      alignItems: 'flex-end',
      justifyContent: 'center'
    },
    viewCard: {
      width: radius - (width * 0.1),
      height: radius * 0.5,
      marginRight: width * 0.08,
      borderRadius: width * 0.0533,
      backgroundColor: 'red'
    }
  })

CircleListLayout.propTypes = {
  calcHeight: PropTypes.func.isRequired,
  containerStyle: PropTypes.object,
  displayData: PropTypes.array,
  keyExtractor: PropTypes.func.isRequired,
  panHandlers: PropTypes.object.isRequired,
  renderItem: PropTypes.func.isRequired,
  state: PropTypes.object,
  visibleDataBounds: PropTypes.array,
  radius: PropTypes.number
}