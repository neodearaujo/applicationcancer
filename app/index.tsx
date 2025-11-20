import { useRouter } from "expo-router";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function Index() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bienvenue</Text>
      <Text style={styles.subtitle}>Ton coach santé</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push("/professional-code")}
      >
        <Text style={styles.buttonText}>créer mon compte avec un professionnel</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, styles.buttonSpacing]}
        onPress={() => router.push("/professional-login")}
      >
        <Text style={styles.buttonText}>je suis un professionnel</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#E9F7F1",
    padding: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#2E7D65",
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 16,
    color: "#D86EA6",
    marginBottom: 30,
  },
  button: {
    backgroundColor: "#2E8B57",
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 12,
    width: "100%",
    maxWidth: 360,
    alignItems: "center",
  },
  buttonSpacing: {
    marginTop: 16,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "700",
    textTransform: "lowercase",
  },
});
