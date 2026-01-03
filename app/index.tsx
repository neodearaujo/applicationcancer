import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function Index() {
  const router = useRouter();
  const [isChecking, setIsChecking] = useState(true);
  const [showLanguageSelection, setShowLanguageSelection] = useState(false);

  useEffect(() => {
    checkLanguage();
  }, []);

  async function checkLanguage() {
    try {
      const language = await AsyncStorage.getItem("appLanguage");
      if (!language) {
        setShowLanguageSelection(true);
        setIsChecking(false);
      } else {
        setIsChecking(false);
      }
    } catch (error) {
      console.error("Erreur lors de la vérification de la langue:", error);
      setIsChecking(false);
    }
  }

  async function handleLanguageSelect(language: string) {
    try {
      await AsyncStorage.setItem("appLanguage", language);
      setShowLanguageSelection(false);
      if (language === "es") {
        router.push("/es");
      }
    } catch (error) {
      console.error("Erreur lors de la sauvegarde de la langue:", error);
    }
  }

  async function handleChangeLanguage() {
    await AsyncStorage.removeItem("appLanguage");
    setShowLanguageSelection(true);
  }

  if (isChecking) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#2E7D65" />
      </View>
    );
  }

  if (showLanguageSelection) {
    return (
      <View style={styles.container}>
        <Text style={styles.titleLang}>Choisissez votre langue</Text>
        <Text style={styles.subtitleLang}>Choose your language / Elige tu idioma</Text>

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

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.languageChangeButton}
        onPress={handleChangeLanguage}
      >
        <Text style={styles.languageChangeText}>🌐 Changer de langue</Text>
      </TouchableOpacity>

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
  titleLang: {
    fontSize: 28,
    fontWeight: "700",
    color: "#2E7D65",
    marginBottom: 8,
    textAlign: "center",
  },
  subtitleLang: {
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
  flag: {
    fontSize: 40,
    marginRight: 15,
  },
  languageText: {
    color: "#2E7D65",
    fontSize: 20,
    fontWeight: "700",
  },
  languageChangeButton: {
    position: "absolute",
    top: 50,
    right: 20,
    backgroundColor: "transparent",
    padding: 10,
  },
  languageChangeText: {
    fontSize: 14,
    color: "#2E7D65",
    fontWeight: "600",
  },
});
