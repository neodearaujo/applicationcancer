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

export default function ActivitySelectionES() {
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
        console.error("Error al cargar los datos:", error);
      }
    }
    loadData();
  }, []);

  function handleActivityPress(activity: string) {
    router.push(`/es/activity-timer?activity=${encodeURIComponent(activity)}` as any);
  }

  async function handleAddCustomActivity() {
    if (customActivity.trim() === "") {
      Alert.alert("Error", "Por favor ingrese un nombre de actividad.");
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
        Alert.alert("Éxito", "¡Actividad añadida con éxito!");
      } else {
        Alert.alert("Info", "Esta actividad ya existe.");
      }
    } catch (error) {
      console.error("Error al añadir la actividad:", error);
      Alert.alert("Error", "No se puede añadir la actividad.");
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Elija su actividad</Text>
      
      {weeklyGoal > 0 && (
        <View style={styles.goalContainer}>
          <Text style={styles.goalText}>
            Objetivo de tiempo por sesión: {weeklyGoal} minutos
          </Text>
        </View>
      )}

      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        {activities.length === 0 ? (
          <Text style={styles.noActivities}>
            Ninguna actividad seleccionada. Por favor configure sus actividades en la información.
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
        
        {/* Sección para añadir una actividad personalizada */}
        <View style={styles.customActivityContainer}>
          <Text style={styles.customActivityTitle}>Añadir una actividad</Text>
          <TextInput
            style={styles.customActivityInput}
            placeholder="Nombre de la actividad"
            value={customActivity}
            onChangeText={setCustomActivity}
          />
          <TouchableOpacity
            style={styles.addButton}
            onPress={handleAddCustomActivity}
          >
            <Text style={styles.addButtonText}>Añadir</Text>
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
