import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
    Dimensions,
    ImageBackground,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from "react-native";

const { width, height } = Dimensions.get("window");

export default function Home() {
  const [petName, setPetName] = useState("");
  const router = useRouter();

  useEffect(() => {
    async function loadPetName() {
      try {
        const name = await AsyncStorage.getItem("petName");
        if (name) {
          setPetName(name);
        }
      } catch (error) {
        console.error("Erreur lors du chargement du nom:", error);
      }
    }
    loadPetName();
  }, []);

  return (
    <ImageBackground
      source={require("../assets/images/accueil 3.png")}
      style={styles.background}
      imageStyle={{ resizeMode: "contain" }}
    >
      {/* Zone Mes activités - Haut gauche */}
      <TouchableOpacity
        style={styles.activitiesHotspot}
        onPress={() => router.push("/my-activities" as any)}
        activeOpacity={0.7}
      />

      {/* Zone Boutique - Haut droit */}
      <TouchableOpacity
        style={styles.boutiqueHotspot}
        onPress={() => router.push("/shop" as any)}
        activeOpacity={0.7}
      />

      {/* Zone Bouton Commencer une activité - Bas */}
      <TouchableOpacity
        style={styles.startButtonHotspot}
        onPress={() => router.push("/activity-selection" as any)}
        activeOpacity={0.7}
      />

      {/* Bulle avec le nom du chat */}
      {petName && (
        <View style={styles.speechBubble}>
          <Text style={styles.speechText}>{petName}</Text>
        </View>
      )}
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
  // Bulle de dialogue pour le nom du chat
  speechBubble: {
    position: "absolute",
    top: 210,
    left: 150,
    backgroundColor: "transparent",
    padding: 12,
    paddingHorizontal: 16,
  },
  speechText: {
    fontSize: 18,
    color: "#2E8B57",
    fontWeight: "700",
  },
});
