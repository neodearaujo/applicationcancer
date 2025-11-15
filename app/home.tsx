import React from "react";
import {
    Alert,
    SafeAreaView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

export default function Home() {

  return (
    <SafeAreaView style={styles.container}>
      {/* Header avec récompenses et mes activités */}
      <View style={styles.header}>
        {/* Mes activités (à gauche) */}
        <TouchableOpacity style={styles.activitiesBox}>
          <Text style={styles.activitiesText}>Mes activités</Text>
        </TouchableOpacity>

        {/* Récompenses (à droite) */}
        <View style={styles.rewardsContainer}>
          {/* Palmier (10 par activité) */}
          <View style={styles.rewardBox}>
            <Text style={styles.rewardEmoji}>🌴</Text>
            <Text style={styles.rewardCount}>10</Text>
          </View>

          {/* Couronne de laurier (1 par semaine) */}
          <View style={styles.rewardBox}>
            <Text style={styles.rewardEmoji}>�</Text>
            <Text style={styles.rewardCount}>1</Text>
          </View>
        </View>
      </View>

      {/* Contenu principal */}
      <View style={styles.mainContent}>
        {/* Chat */}
        <View style={styles.chatContainer}>
          <View style={styles.chatPlaceholder}>
            <Text style={styles.chatEmoji}>🐱</Text>
          </View>
        </View>

        {/* Bouton Commencer une activité */}
        <TouchableOpacity
          style={styles.startButton}
          onPress={() => Alert.alert("Bientôt disponible", "Les activités arrivent très bientôt!")}
        >
          <Text style={styles.startButtonText}>Commencer une activité</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E9F7F1",
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 30,
  },
  activitiesBox: {
    backgroundColor: "white",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    flex: 0.45,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  activitiesText: {
    fontSize: 14,
    fontWeight: "700",
    color: "#2E7D65",
    textAlign: "center",
  },
  rewardsContainer: {
    flex: 0.45,
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,
  },
  rewardBox: {
    backgroundColor: "white",
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  rewardEmoji: {
    fontSize: 24,
    marginBottom: 4,
  },
  rewardCount: {
    fontSize: 14,
    fontWeight: "700",
    color: "#2E7D65",
  },
  mainContent: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: 40,
  },
  chatContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  chatPlaceholder: {
    width: 180,
    height: 180,
    backgroundColor: "white",
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  chatEmoji: {
    fontSize: 100,
  },
  startButton: {
    backgroundColor: "#2E8B57",
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 14,
    minWidth: "85%",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 4,
  },
  startButtonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },
});
