import 'react-native-gesture-handler'
import { View, Text, StyleSheet, Image, Dimensions, ImageBackground } from 'react-native'
import React, { useCallback, useRef } from 'react'
import { GestureHandlerRootView, TapGestureHandler } from 'react-native-gesture-handler'
import Animated, {  useAnimatedStyle, useSharedValue, withDelay, withSpring } from 'react-native-reanimated'

const AnimatedImage = Animated.createAnimatedComponent(Image)

const App = () => {
  const scale = useSharedValue(0)
  const doubleTapRef = useRef()
  

  const rStyle = useAnimatedStyle(() => ({
    transform: [
      {scale: Math.max(scale.value, 0)}
    ]
  }))

  const onDoubleTap = useCallback(() => {
    console.log("DOUBLE TAP")
    scale.value = withSpring(0.5, undefined, (isFinished) => {
      if(isFinished){
        scale.value = withDelay(500, withSpring(0)) 
      }

    })
  },[])

  return (
    <View style={styles.container}>
      <GestureHandlerRootView>
        <TapGestureHandler
          waitFor={doubleTapRef}
          onActivated={() => {
            console.log("SINGLE TAP")
          }}>
        <TapGestureHandler
          maxDelayMs={250}
          ref={doubleTapRef}
          numberOfTaps={2}
          onActivated={onDoubleTap}
        >
          <Animated.View>
          <ImageBackground
            style={styles.image}
            source={require('./src/assets/images/background.jpg')} >
              <AnimatedImage 
                source={require('./src/assets/images/like.png')}
                style={[styles.imageHeart, rStyle]}
                resizeMode={"center"}/>
            </ImageBackground>
            </Animated.View>
        </TapGestureHandler>
        </TapGestureHandler>
      </GestureHandlerRootView>

    </View>
  )
}
const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: 'center',
    justifyContent: 'center'
  },
  image: {
    width: width,
    height: width
  },
  imageHeart:{
    width: width,
    height: width,
    tintColor: "#fff",
    shadowOffset: {width: 0, height: 20},
    shadowOpacity: 0.3,
    shadowRadius: 35
  }
})



export default App