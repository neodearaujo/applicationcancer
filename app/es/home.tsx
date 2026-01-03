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

export default function HomeES() {
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
        console.error("Error al cargar el nombre:", error);
      }
    }
    loadPetName();
  }, []);

  return (
    <ImageBackground
      source={require("../../assets/images/accueil 4.png")}
      style={styles.background}
      imageStyle={{ resizeMode: "contain" }}
    >
      {/* Zone Mes activités - Haut gauche */}
      <TouchableOpacity
        style={styles.activitiesHotspot}
        onPress={() => router.push("/es/my-activities" as any)}
        activeOpacity={0.7}
      />

      {/* Zone Boutique - Haut droit */}
      <TouchableOpacity
        style={styles.boutiqueHotspot}
        onPress={() => router.push("/es/shop" as any)}
        activeOpacity={0.7}
      />

      {/* Zone Bouton Commencer une activité - Bas */}
      <TouchableOpacity
        style={styles.startButtonHotspot}
        onPress={() => router.push("/es/activity-selection" as any)}
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
  activitiesHotspot: {
    position: "absolute",
    top: 100,
    left: 20,
    width: 120,
    height: 50,
    backgroundColor: "transparent",
  },
  boutiqueHotspot: {
    position: "absolute",
    top: 150,
    right: 20,
    width: 140,
    height: 50,
    backgroundColor: "transparent",
  },
  startButtonHotspot: {
    position: "absolute",
    bottom: 160,
    left: 30,
    right: 30,
    height: 60,
    backgroundColor: "transparent",
  },
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
