import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function LanguageSelection() {
  const router = useRouter();

  async function handleLanguageSelect(language: string) {
    try {
      await AsyncStorage.setItem("appLanguage", language);
      if (language === "fr") {
        router.push("/index");
      } else {
        router.push("/es/index");
      }
    } catch (error) {
      console.error("Erreur lors de la sauvegarde de la langue:", error);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Choisissez votre langue</Text>
      <Text style={styles.subtitle}>Choose your language / Elige tu idioma</Text>

      <TouchableOpacity
        style={styles.languageButton}
        onPress={() => handleLanguageSelect("fr")}
      >
        <Text style={styles.flag}>🇫🇷</Text>
        <Text style={styles.languageText}>Français</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.languageButton, styles.buttonSpacing]}
        onPress={() => handleLanguageSelect("es")}
      >
        <Text style={styles.flag}>🇪🇸</Text>
        <Text style={styles.languageText}>Español</Text>
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
    marginBottom: 8,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 14,
    color: "#666",
    marginBottom: 40,
    textAlign: "center",
  },
  languageButton: {
    backgroundColor: "white",
    paddingVertical: 20,
    paddingHorizontal: 30,
    borderRadius: 16,
    width: "100%",
    maxWidth: 300,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "#2E8B57",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  buttonSpacing: {
    marginTop: 20,
  },
  flag: {
    fontSize: 40,
    marginRight: 15,
  },
  languageText: {
    color: "#2E7D65",
    fontSize: 20,
    fontWeight: "700",
  },
});
