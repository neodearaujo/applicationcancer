import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
    Alert,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from "react-native";

export default function ActivitySelection() {
  const [activities, setActivities] = useState<string[]>([]);
  const [weeklyGoal, setWeeklyGoal] = useState(0);
  const [customActivity, setCustomActivity] = useState("");
  const router = useRouter();

  useEffect(() => {
    async function loadData() {
      try {
        const setupData = await AsyncStorage.getItem("userSetup");
        if (setupData) {
          const data = JSON.parse(setupData);
          setActivities(data.activities || []);
          const targetTime = parseInt(data.targetTime) || 0;
          setWeeklyGoal(Math.round(targetTime / 5));
        }
      } catch (error) {
        console.error("Erreur lors du chargement des données:", error);
      }
    }
    loadData();
  }, []);

  function handleActivityPress(activity: string) {
    router.push(`/activity-timer?activity=${encodeURIComponent(activity)}` as any);
  }

  async function handleAddCustomActivity() {
    if (customActivity.trim() === "") {
      Alert.alert("Erreur", "Veuillez entrer un nom d'activité.");
      return;
    }

    try {
      const setupData = await AsyncStorage.getItem("userSetup");
      let data = setupData ? JSON.parse(setupData) : {};
      const currentActivities = data.activities || [];
      
      if (!currentActivities.includes(customActivity.trim())) {
        currentActivities.push(customActivity.trim());
        data.activities = currentActivities;
        await AsyncStorage.setItem("userSetup", JSON.stringify(data));
        setActivities(currentActivities);
        setCustomActivity("");
        Alert.alert("Succès", "Activité ajoutée avec succès!");
      } else {
        Alert.alert("Info", "Cette activité existe déjà.");
      }
    } catch (error) {
      console.error("Erreur lors de l'ajout de l'activité:", error);
      Alert.alert("Erreur", "Impossible d'ajouter l'activité.");
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Choisissez votre activité</Text>
      
      {weeklyGoal > 0 && (
        <View style={styles.goalContainer}>
          <Text style={styles.goalText}>
            Objectif de temps par séance : {weeklyGoal} minutes
          </Text>
        </View>
      )}

      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        {activities.length === 0 ? (
          <Text style={styles.noActivities}>
            Aucune activité sélectionnée. Veuillez configurer vos activités dans les renseignements.
          </Text>
        ) : (
          activities.map((activity, index) => (
            <TouchableOpacity
              key={index}
              style={styles.activityButton}
              onPress={() => handleActivityPress(activity)}
            >
              <Text style={styles.activityText}>{activity}</Text>
            </TouchableOpacity>
          ))
        )}
        
        {/* Section pour ajouter une activité personnalisée */}
        <View style={styles.customActivityContainer}>
          <Text style={styles.customActivityTitle}>Ajouter une activité</Text>
          <TextInput
            style={styles.customActivityInput}
            placeholder="Nom de l'activité"
            value={customActivity}
            onChangeText={setCustomActivity}
          />
          <TouchableOpacity
            style={styles.addButton}
            onPress={handleAddCustomActivity}
          >
            <Text style={styles.addButtonText}>Ajouter</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E9F7F1",
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#2E8B57",
    textAlign: "center",
    marginTop: 40,
    marginBottom: 20,
  },
  goalContainer: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    borderWidth: 2,
    borderColor: "#2E8B57",
  },
  goalText: {
    fontSize: 16,
    color: "#2E8B57",
    fontWeight: "600",
    textAlign: "center",
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 20,
  },
  activityButton: {
    backgroundColor: "#2E8B57",
    borderRadius: 12,
    padding: 20,
    marginBottom: 15,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  activityText: {
    fontSize: 18,
    color: "white",
    fontWeight: "600",
  },
  noActivities: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginTop: 40,
  },
  customActivityContainer: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 20,
    marginTop: 20,
    borderWidth: 2,
    borderColor: "#D86EA6",
  },
  customActivityTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#2E8B57",
    marginBottom: 12,
    textAlign: "center",
  },
  customActivityInput: {
    backgroundColor: "#F5F5F5",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#DDD",
  },
  addButton: {
    backgroundColor: "#D86EA6",
    borderRadius: 8,
    padding: 14,
    alignItems: "center",
  },
  addButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
});
