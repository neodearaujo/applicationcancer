import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
    Alert,
    Image,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from "react-native";

export default function PetNamingES() {
  const [petName, setPetName] = useState("");
  const router = useRouter();

  async function handleContinue() {
    if (!petName.trim()) {
      Alert.alert("Nombre faltante", "Por favor dale un nombre a tu compañero.");
      return;
    }

    try {
      await AsyncStorage.setItem("petName", petName.trim());
      console.log("Gato nombrado:", petName);
      router.replace("/es/home" as any);
    } catch (error) {
      console.error("Error al guardar el nombre:", error);
      Alert.alert("Error", "No se puede guardar el nombre.");
    }
  }

  return (
    <View style={styles.container}>
      {/* Bulle de dialogue */}
      <View style={styles.speechBubble}>
        <Text style={styles.speechText}>
          ¡Hola! ¡Seré tu compañero durante todo este período de fortalecimiento!
        </Text>
        <View style={styles.speechPointer} />
      </View>

      {/* Image de chat */}
      <View style={styles.catContainer}>
        <Image
          source={require("../../assets/images/cat.png")}
          style={styles.catImage}
          resizeMode="contain"
        />
      </View>

      {/* Zone de texte pour nommer le chat */}
      <Text style={styles.label}>Dame un nombre:</Text>
      <TextInput
        value={petName}
        onChangeText={setPetName}
        placeholder="Ej: Michi, Tigre, Luna..."
        style={styles.input}
        placeholderTextColor="#BDBDBD"
      />

      {/* Bouton Continuer */}
      <TouchableOpacity style={styles.button} onPress={handleContinue}>
        <Text style={styles.buttonText}>Continuar</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.skipButton} onPress={() => router.replace("/es/home" as any)}>
        <Text style={styles.skipButtonText}>saltar →</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E9F7F1",
    padding: 24,
    justifyContent: "center",
    alignItems: "center",
  },
  speechBubble: {
    backgroundColor: "white",
    borderRadius: 16,
    padding: 16,
    marginBottom: 30,
    maxWidth: "85%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  speechText: {
    fontSize: 16,
    color: "#333",
    textAlign: "center",
    fontWeight: "500",
  },
  speechPointer: {
    width: 0,
    height: 0,
    borderLeftWidth: 10,
    borderRightWidth: 10,
    borderTopWidth: 12,
    borderLeftColor: "transparent",
    borderRightColor: "transparent",
    borderTopColor: "white",
    alignSelf: "center",
    marginTop: 8,
  },
  catContainer: {
    marginBottom: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  catImage: {
    width: 220,
    height: 220,
  },
  label: {
    fontSize: 15,
    color: "#2E7D65",
    fontWeight: "600",
    marginBottom: 10,
  },
  input: {
    height: 50,
    borderWidth: 2,
    borderColor: "#2E8B57",
    borderRadius: 10,
    paddingHorizontal: 14,
    backgroundColor: "white",
    fontSize: 16,
    marginBottom: 24,
    color: "#333",
    width: "100%",
    maxWidth: 300,
  },
  button: {
    backgroundColor: "#2E8B57",
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },
  skipButton: {
    position: "absolute",
    bottom: 20,
    right: 20,
    backgroundColor: "transparent",
    padding: 10,
  },
  skipButtonText: {
    fontSize: 14,
    color: "#999",
    fontStyle: "italic",
  },
});
