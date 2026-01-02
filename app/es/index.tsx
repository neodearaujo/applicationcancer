import { useRouter } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function IndexES() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bienvenido</Text>
      <Text style={styles.subtitle}>Tu coach de salud</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push("/es/professional-code")}
      >
        <Text style={styles.buttonText}>crear mi cuenta con un profesional</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, styles.buttonSpacing]}
        onPress={() => router.push("/es/professional-login")}
      >
        <Text style={styles.buttonText}>soy un profesional</Text>
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
