import {
    StyleSheet,
    Text,
    View,
} from "react-native";

export default function ShopCosmeticsES() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cosmética</Text>
      <Text style={styles.message}>
        ¡Esta sección estará disponible pronto!
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E9F7F1",
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#2E8B57",
    textAlign: "center",
    marginBottom: 20,
  },
  message: {
    fontSize: 18,
    color: "#666",
    textAlign: "center",
  },
});
