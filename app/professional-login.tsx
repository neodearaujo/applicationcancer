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

export default function ProfessionalLogin() {
  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  function handleValidate() {
    if (code.trim() !== "0000") {
      Alert.alert("Code incorrect", "Veuillez entrer le code professionnel valide.");
      return;
    }
    
    if (password.trim() !== "nomdel'appli") {
      Alert.alert("Mot de passe incorrect", "Veuillez entrer le mot de passe correct.");
      return;
    }
    
    router.push("/patients-list");
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Accès Professionnel</Text>
      
      <Text style={styles.label}>Code professionnel</Text>
      <TextInput
        value={code}
        onChangeText={setCode}
        keyboardType="numeric"
        placeholder="0000"
        style={styles.input}
        maxLength={10}
      />

      <Text style={styles.label}>Mot de passe</Text>
      <TextInput
        value={password}
        onChangeText={setPassword}
        secureTextEntry={true}
        placeholder="Mot de passe"
        style={styles.input}
      />

      <TouchableOpacity style={styles.button} onPress={handleValidate}>
        <Text style={styles.buttonText}>Se connecter</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: "#F8F9FA",
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: "#2E7D65",
    marginBottom: 30,
    textAlign: "center",
  },
  label: {
    fontSize: 14,
    color: "#495057",
    marginBottom: 8,
    fontWeight: "600",
  },
  input: {
    height: 48,
    borderColor: "#CED4DA",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    backgroundColor: "white",
    marginBottom: 20,
    fontSize: 16,
  },
  button: {
    backgroundColor: "#2E7D65",
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 20,
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },
});