import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
    Alert,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from "react-native";

export default function PetNaming() {
  const [petName, setPetName] = useState("");
  const router = useRouter();

  function handleContinue() {
    if (!petName.trim()) {
      Alert.alert("Nom manquant", "Veuillez donner un nom à votre compagnon.");
      return;
    }

    console.log("Chat nommé:", petName);
    // Redirection vers la page d'accueil
    router.replace("home" as any);
  }

  return (
    <View style={styles.container}>
      {/* Bulle de dialogue */}
      <View style={styles.speechBubble}>
        <Text style={styles.speechText}>
          Salut, je serais ton binôme pendant toute cette période de renforcement!
        </Text>
        <View style={styles.speechPointer} />
      </View>

      {/* Image de chat (placeholder pour l'instant) */}
      <View style={styles.catContainer}>
        <View style={styles.catPlaceholder}>
          <Text style={styles.catEmoji}>🐱</Text>
        </View>
      </View>

      {/* Zone de texte pour nommer le chat */}
      <Text style={styles.label}>Donne-moi un nom :</Text>
      <TextInput
        value={petName}
        onChangeText={setPetName}
        placeholder="Ex: Minou, Tigre, Luna..."
        style={styles.input}
        placeholderTextColor="#BDBDBD"
      />

      {/* Bouton Continuer */}
      <TouchableOpacity style={styles.button} onPress={handleContinue}>
        <Text style={styles.buttonText}>Continuer</Text>
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
  },
  catPlaceholder: {
    width: 150,
    height: 150,
    backgroundColor: "white",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  catEmoji: {
    fontSize: 80,
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
});
