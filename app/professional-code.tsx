import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
    Alert,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

export default function ProfessionalCode() {
  const [code, setCode] = useState("");
  const router = useRouter();

  function handleValidate() {
    if (code.trim() === "0621") {
      router.push("/setup");
    } else {
      Alert.alert("Code incorrect", "Veuillez entrer le code professionnel fourni.");
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Code professionnel</Text>
      <Text style={styles.info}>Veuillez entrer le code fourni par le professionnel.</Text>

      <TextInput
        value={code}
        onChangeText={setCode}
        keyboardType="numeric"
        placeholder="0000"
        style={styles.input}
        maxLength={10}
      />

      <TouchableOpacity style={styles.button} onPress={handleValidate}>
        <Text style={styles.buttonText}>Valider</Text>
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
});
