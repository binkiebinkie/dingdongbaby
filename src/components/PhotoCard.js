import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { StyleSheet, View, Image, Pressable } from "react-native";
import { withTheme } from "react-native-elements";
import TextG6Bold14 from "./styleComponents/TextG6Bold14";
import { format } from "date-fns";
import useTranslation from "../hooks/translations";
import { useNavigation } from "@react-navigation/native";
import BlueButtonPrimary from "./styleComponents/BlueButtonPrimary";

function PhotoCard({ image, completedPrompt, theme, containerStyles }) {
  const [contWidth, setContWidth] = useState(0);
  const [numCircles, setNumCircles] = useState(45);
  const [imageHeight, setImageHeight] = useState(0);
  const { t } = useTranslation();
  const { navigate } = useNavigation();

  const calculateImage = (w, h) => {
    if (contWidth && w) {
      let ratio = w / contWidth;
      setImageHeight(h / ratio);
    } else {
      setImageHeight(null);
    }
  };

  let imagePath = image?.uri;
  console.log("imagePathimagePath", imagePath);
  const getImageDetails = async () => {
    if (!!image) {
      console.log("typeof old", imagePath);
      if (typeof imagePath === "number") {
        if (imagePath === 1) {
          imagePath = require("../assets/placeholders/monk1.png");
        } else if (imagePath === 2) {
          imagePath = require("../assets/placeholders/monk2.png");
        } else if (imagePath === 3) {
          imagePath = require("../assets/placeholders/monk3.png");
        } else if (imagePath === 4) {
          imagePath = require("../assets/placeholders/monk4.png");
        } else {
          imagePath = Image.resolveAssetSource(image).uri;
        }
      }
      console.log("typeof new", imagePath);

      if (typeof imagePath === "string") {
        try {
          Image.getSize(
            imagePath,
            (width, height) => calculateImage(width, height),
            () => {
              calculateImage();
            }
          );
        } catch (err) {
          console.error(err);
        }
      } else {
        const { width, height } = Image.resolveAssetSource(imagePath);
        calculateImage(width, height);
      }
    }
  };

  const calculateNumCircles = () => {
    if (contWidth > 0) {
      const circleWidthAndSpacing = 8;
      setNumCircles(Math.floor(contWidth / circleWidthAndSpacing));
    }
  };

  useEffect(() => {
    if (!!image) {
      getImageDetails();
    }
  }, [image]);

  useEffect(() => {
    calculateNumCircles();
  }, [contWidth]);
  useEffect(() => {
    calculateNumCircles();
  }, []);
  console.log("imagePath", imagePath);

  return (
    <View
      style={[styles.container(theme), { ...containerStyles }]}
      onLayout={(e) => setContWidth(e?.nativeEvent?.layout?.width - 24)}
    >
      {imagePath ? (
        <Image
          resizeMode={!imageHeight ? "contain" : "cover"}
          source={
            typeof imagePath === "number" ? imagePath : { uri: imagePath }
          }
          style={[
            styles.image,
            {
              width: contWidth || "100%",
              height: imageHeight || undefined,
            },
          ]}
        />
      ) : (
        []
      )}
      <TextG6Bold14
        copy={
          completedPrompt?.dateComplete
            ? format(new Date(completedPrompt?.dateComplete), "dd/mm/yyyy")
            : format(new Date(), "dd/mm/yyyy")
        }
        addStyles={{ textAlign: "center", marginTop: 12 }}
      />
      <View style={styles.circleContainer}>
        {[...Array(numCircles)].map((circle, i) => (
          <View key={`${circle}${i}`} style={styles.circle(theme)}></View>
        ))}
      </View>
      {completedPrompt?.caption ? (
        <Pressable
          style={styles.caption(theme)}
          onPress={() => navigate("Captions")}
        >
          <TextG6Bold14
            copy={completedPrompt?.caption}
            addStyles={{ textAlign: "center", textTransform: "none" }}
          />
        </Pressable>
      ) : !!completedPrompt ? (
        <BlueButtonPrimary
          copy={t("photo/captions/add-caption")}
          onPress={() => navigate("Captions")}
        />
      ) : null}
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
    flex: 1,
    minHeight: 200,
    borderRadius: 8,
    marginBottom: 12,
  },
  caption: () => ({
    width: "100%",
  }),
});

PhotoCard.propTypes = {
  containerStyles: PropTypes.object,
};

PhotoCard.defaultProps = {
  containerStyles: {},
};

export default withTheme(PhotoCard);
