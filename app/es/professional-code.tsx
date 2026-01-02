import { useRouter } from "expo-router";
import { useState } from "react";
import {
    Alert,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

export default function ProfessionalCodeES() {
  const [code, setCode] = useState("");
  const router = useRouter();

  function handleValidate() {
    if (code.trim() === "0621") {
      router.push("/es/setup");
    } else {
      Alert.alert("Código incorrecto", "Por favor ingrese el código profesional proporcionado.");
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Código profesional</Text>
      <Text style={styles.info}>Por favor ingrese el código proporcionado por el profesional.</Text>

      <TextInput
        value={code}
        onChangeText={setCode}
        keyboardType="numeric"
        placeholder="0000"
        style={styles.input}
        maxLength={10}
      />

      <TouchableOpacity style={styles.button} onPress={handleValidate}>
        <Text style={styles.buttonText}>Validar</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.skipButton} onPress={() => router.push("/es/setup")}>
        <Text style={styles.skipButtonText}>saltar →</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: "#FDF9FB",
    justifyContent: "center",
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    color: "#2E7D65",
    marginBottom: 8,
    textAlign: "center",
  },
  info: {
    textAlign: "center",
    color: "#6B6B6B",
    marginBottom: 18,
  },
  input: {
    height: 48,
    borderColor: "#DDD",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    backgroundColor: "white",
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#2E8B57",
    paddingVertical: 14,
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
