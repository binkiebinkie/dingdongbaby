import React, { useState, useEffect } from "react";
import { StyleSheet, View, Image } from "react-native";
import { withTheme } from "react-native-elements";

import TextG6Bold14 from "../components/styleComponents/TextG6Bold14";

function PhotoCard({ theme, copy, date, image }) {
  const [contWidth, setContWidth] = useState(0);
  const [numCircles, setNumCircles] = useState(45);
  const [imageHeight, setImageHeight] = useState(0);
  const calculateImage = (w, h) => {
    // console.log("w,hw,h", w, h);
    if (contWidth && w) {
      let ratio = w / contWidth;
      setImageHeight(h / ratio);
    } else {
      setImageHeight(null);
    }
  };

  let imagePath = image;
  if (image) {
    if (typeof image === "number") {
      imagePath = Image.resolveAssetSource(image).uri;
    }
    // console.log("ayaaeaesr", Image);

    try {
      Image.getSize(
        imagePath,
        (width, height) => calculateImage(width, height),
        () => {
          // console.log("contWidth", contWidth);
          calculateImage();
        }
      );
    } catch (err) {
      console.error(err);
    }
  }
  const calculateNumCircles = () => {
    // console.log("contWidthcontWidthcontWidth", contWidth, contWidth / 8);

    if (contWidth > 0) {
      const circleWidthAndSpacing = 8;
      setNumCircles(Math.floor(contWidth / circleWidthAndSpacing));
    }
  };

  useEffect(() => {
    // Count percentage width of challenges complete
    // TODO: Use real number
    // TODO: Animate gradient width
    calculateNumCircles();
  }, [contWidth]);
  useEffect(() => {
    calculateNumCircles();
  }, []);
  // console.log("imageHeightimageHeight", imageHeight, numCircles);
  return (
    <View
      style={styles.container(theme)}
      onLayout={(e) => setContWidth(e?.nativeEvent?.layout?.width)}
    >
      {imagePath ? (
        <Image
          resizeMode={!imageHeight ? "contain" : "cover"}
          source={{ uri: imagePath }}
          style={
            ([styles.image],
            { width: contWidth || "100%", height: imageHeight || "auto" })
          }
        />
      ) : (
        []
      )}
      <TextG6Bold14
        copy={date ? date : ""}
        addStyles={{ textAlign: "center" }}
      />
      <View style={styles.circleContainer}>
        {[...Array(numCircles)].map((circle, i) => (
          <View key={`${circle}${i}`} style={styles.circle(theme)}></View>
        ))}
      </View>
      <TextG6Bold14 copy={copy} addStyles={{ textAlign: "center" }} />
    </View>
  );
}

//rnss
const styles = StyleSheet.create({
  container: (theme) => ({
    position: "relative",
    backgroundColor: theme.colors.PureWhite,
    borderRadius: 12,
    width: "100%",
    padding: 12,
  }),
  circleContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 12,
    marginBottom: 12,
  },
  circle: (theme) => ({
    width: 4,
    height: 4,
    marginRight: 4,
    backgroundColor: theme.colors.G4,
    borderRadius: 50,
  }),
  image: {
    width: "100%",
    height: 500,
    flex: 1,
    minHeight: 200,
    borderRadius: 8,
    marginBottom: 12,
  },
});

export default withTheme(PhotoCard);
