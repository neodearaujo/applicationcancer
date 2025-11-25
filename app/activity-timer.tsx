import AsyncStorage from "@react-native-async-storage/async-storage";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
    Alert,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

export default function ActivityTimer() {
  const params = useLocalSearchParams();
  const router = useRouter();
  const activity = params.activity as string;

  const [countdown, setCountdown] = useState(3);
  const [isCountingDown, setIsCountingDown] = useState(true);
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [weeklyGoal, setWeeklyGoal] = useState(0);

  // Charger l'objectif de temps
  useEffect(() => {
    async function loadGoal() {
      try {
        const setupData = await AsyncStorage.getItem("userSetup");
        if (setupData) {
          const data = JSON.parse(setupData);
          const targetTime = parseInt(data.targetTime) || 0;
          setWeeklyGoal(Math.round(targetTime / 5));
        }
      } catch (error) {
        console.error("Erreur lors du chargement de l'objectif:", error);
      }
    }
    loadGoal();
  }, []);

  // Compte à rebours de 3 secondes
  useEffect(() => {
    if (isCountingDown && countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (isCountingDown && countdown === 0) {
      setIsCountingDown(false);
      setIsRunning(true);
    }
  }, [countdown, isCountingDown]);

  // Chronomètre
  useEffect(() => {
    let interval: any;
    if (isRunning && !isPaused) {
      interval = setInterval(() => {
        setSeconds((s) => s + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning, isPaused]);

  function handlePause() {
    setIsPaused(!isPaused);
  }

  function handleStop() {
    Alert.alert(
      "Arrêter l'activité",
      `Temps écoulé : ${formatTime(seconds)}\nVoulez-vous arrêter cette activité ?`,
      [
        { text: "Continuer", style: "cancel" },
        {
          text: "Arrêter",
          onPress: () => {
            // Rediriger vers le questionnaire post-activité
            router.replace("/post-activity-questionnaire" as any);
          },
        },
      ]
    );
  }

  function formatTime(totalSeconds: number): string {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  }

  return (
    <View style={styles.container}>
      {isCountingDown ? (
        <View style={styles.countdownContainer}>
          <Text style={styles.activityName}>{activity}</Text>
          <Text style={styles.countdownText}>{countdown}</Text>
          <Text style={styles.countdownLabel}>Préparez-vous...</Text>
        </View>
      ) : (
        <>
          {/* Objectif de temps */}
          {weeklyGoal > 0 && (
            <View style={styles.goalContainer}>
              <Text style={styles.goalText}>
                Objectif : {weeklyGoal} minutes
              </Text>
            </View>
          )}

          <Text style={styles.activityName}>{activity}</Text>

          {/* Compteur BPM */}
          <View style={styles.bpmContainer}>
            <Text style={styles.bpmText}>BPM ___ ❤️</Text>
          </View>

          {/* Chronomètre */}
          <View style={styles.timerContainer}>
            <Text style={styles.timerText}>{formatTime(seconds)}</Text>
            {isPaused && <Text style={styles.pausedLabel}>EN PAUSE</Text>}
          </View>

          {/* Boutons Pause et Arrêter */}
          <View style={styles.buttonsContainer}>
            <TouchableOpacity
              style={[styles.button, styles.pauseButton]}
              onPress={handlePause}
            >
              <Text style={styles.buttonText}>
                {isPaused ? "Reprendre" : "Pause"}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.button, styles.stopButton]}
              onPress={handleStop}
            >
              <Text style={styles.buttonText}>Arrêter l'activité</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
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
  countdownContainer: {
    alignItems: "center",
  },
  activityName: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#2E8B57",
    marginBottom: 40,
    textAlign: "center",
  },
  countdownText: {
    fontSize: 120,
    fontWeight: "bold",
    color: "#2E8B57",
  },
  countdownLabel: {
    fontSize: 20,
    color: "#666",
    marginTop: 20,
  },
  goalContainer: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 12,
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
  bpmContainer: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 16,
    marginBottom: 30,
    borderWidth: 2,
    borderColor: "#2E8B57",
  },
  bpmText: {
    fontSize: 24,
    color: "#2E8B57",
    fontWeight: "600",
  },
  timerContainer: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 40,
    marginBottom: 50,
    borderWidth: 3,
    borderColor: "#2E8B57",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 5,
  },
  timerText: {
    fontSize: 72,
    fontWeight: "bold",
    color: "#2E8B57",
    fontFamily: "monospace",
  },
  pausedLabel: {
    fontSize: 16,
    color: "#FF6B6B",
    fontWeight: "600",
    textAlign: "center",
    marginTop: 10,
  },
  buttonsContainer: {
    flexDirection: "row",
    gap: 15,
  },
  button: {
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 12,
    minWidth: 140,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  pauseButton: {
    backgroundColor: "#FFA500",
  },
  stopButton: {
    backgroundColor: "#FF6B6B",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "700",
  },
});
