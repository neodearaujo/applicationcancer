import { Text, TouchableOpacity, View } from "react-native";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <TouchableOpacity
        style={{
          backgroundColor: "red",
          paddingVertical: 15,
          paddingHorizontal: 30,
          borderRadius: 8,
        }}
        onPress={() => console.log("Bouton pressé")}
      >
        <Text style={{ color: "white", fontSize: 16, fontWeight: "bold" }}>
          Cliquez-moi
        </Text>
      </TouchableOpacity>
    </View>
  );
}
