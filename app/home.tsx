import {
    Alert,
    Dimensions,
    ImageBackground,
    StyleSheet,
    TouchableOpacity
} from "react-native";

const { width, height } = Dimensions.get("window");

export default function Home() {
  return (
    <ImageBackground
      source={require("../assets/images/accueil 3.png")}
      style={styles.background}
      imageStyle={{ resizeMode: "contain" }}
    >
      {/* Zone Mes activités - Haut gauche */}
      <TouchableOpacity
        style={styles.activitiesHotspot}
        onPress={() => Alert.alert("Bientôt", "Section mes activités à venir")}
        activeOpacity={0.7}
      />

      {/* Zone Boutique - Haut droit */}
      <TouchableOpacity
        style={styles.boutiqueHotspot}
        onPress={() => Alert.alert("Bientôt", "Section boutique à venir")}
        activeOpacity={0.7}
      />

      {/* Zone Bouton Commencer une activité - Bas */}
      <TouchableOpacity
        style={styles.startButtonHotspot}
        onPress={() => Alert.alert("Bientôt", "Les activités arrivent très bientôt!")}
        activeOpacity={0.7}
      />
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  // Mes activités - Haut gauche (descendu de 50px)
  activitiesHotspot: {
    position: "absolute",
    top: 100,
    left: 20,
    width: 120,
    height: 50,
    backgroundColor: "transparent",
  },
  // Boutique - Haut droit (descendu de 30px)
  boutiqueHotspot: {
    position: "absolute",
    top: 150,
    right: 20,
    width: 140,
    height: 50,
    backgroundColor: "transparent",
  },
  // Bouton Commencer une activité - Bas (monté de 80px)
  startButtonHotspot: {
    position: "absolute",
    bottom: 160,
    left: 30,
    right: 30,
    height: 60,
    backgroundColor: "transparent",
  },
});
