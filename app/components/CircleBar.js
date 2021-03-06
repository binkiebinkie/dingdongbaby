import React, { useContext, useState, useEffect, useRef } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet, View, Text } from "react-native";

import { withTheme } from "react-native-elements";

const CircleBar = ({ theme, numChallengesComplete, numChallenges }) => {
  // const ref = useRef(null);
  const [contWidth, setContWidth] = useState(0);
  const [numCircles, setNumCircles] = useState(45);
  const [gradientWidth, setGradientWidth] = useState(
    numChallengesComplete && numChallenges ? 4 : 0
  );

  useEffect(() => {
    // Count percentage width of challenges complete
    // TODO: Use real number
    // TODO: Animate gradient width
    if (contWidth > 0) {
      const circleWidthAndSpacing = 8;
      setNumCircles(Math.floor(contWidth / circleWidthAndSpacing));
      if (numChallengesComplete && numChallenges) {
        const percentComplete = numChallengesComplete / numChallenges;
        const widthInPx = percentComplete * contWidth;
        setGradientWidth(widthInPx);
      }
    }
  }, [contWidth]);

  return (
    <View
      onLayout={e => setContWidth(e.nativeEvent.layout.width)}
      style={styles.circleBarCont(theme)}
    >
      {numChallengesComplete && numChallenges ? (
        <LinearGradient
          colors={theme.colors.Gradient}
          style={[styles.gradient(theme), { width: gradientWidth }]}
          start={[0, 0]}
          end={[1, 1]}
        ></LinearGradient>
      ) : null}
      {[...Array(numCircles)].map((circle, i) => (
        <View key={`${circle}${i}`} style={styles.circle(theme)}></View>
      ))}
    </View>
  );
};

//rnss
const styles = StyleSheet.create({
  circleBarCont: theme => ({
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%"
  }),
  gradient: theme => ({
    height: 4,
    borderRadius: 4,
    position: "absolute",
    left: 0,
    top: 0,
    bottom: 0,
    zIndex: 1000
  }),
  circle: theme => ({
    width: 4,
    height: 4,
    backgroundColor: theme.colors.G4,
    borderRadius: 50
  })
});

export default withTheme(CircleBar);
