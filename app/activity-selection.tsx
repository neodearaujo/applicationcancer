import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from "react-native";

export default function ActivitySelection() {
  const [activities, setActivities] = useState<string[]>([]);
  const [weeklyGoal, setWeeklyGoal] = useState(0);
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
});
