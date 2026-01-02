import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

interface ActivityRecord {
  activity: string;
  duration: number;
  timestamp: string;
  stopReason: string;
  answers: { [key: string]: number };
  completedAt: string;
}

const CATEGORIES = [
  "Dolor e incomodidad musculoesquelética",
  "Fatiga y tolerancia al ejercicio",
  "Síntomas autonómicos y generales",
  "Función del miembro superior y riesgo de linfedema",
  "Bienestar emocional y motivación",
  "Percepción global de la sesión",
];

const QUESTIONS_BY_CATEGORY: { [key: string]: string[] } = {
  "Dolor e incomodidad musculoesquelética": [
    "Sensación de tirantez o rigidez alrededor de la cicatriz",
    "Dolor musculoesquelético general (cuello, espalda, zona pectoral)",
  ],
  "Fatiga y tolerancia al ejercicio": [
    "Fatiga general después de la sesión",
    "Capacidad de recuperación (¿cuánto te costaría hacer otra actividad ahora?)",
  ],
  "Síntomas autonómicos y generales": [
    "Mareos, náuseas o dolor de cabeza post-ejercicio",
    "Sensación de falta de aire o respiración difícil",
    "Palpitaciones o aumento excesivo del ritmo cardíaco",
  ],
  "Función del miembro superior y riesgo de linfedema": [
    "Pesadez, hinchazón, tensión interna o dificultad para mover el brazo concerniente",
  ],
  "Bienestar emocional y motivación": [
    "Nivel de ansiedad relacionado con el ejercicio",
    "Confianza en tu capacidad de continuar el programa",
  ],
  "Percepción global de la sesión": [
    "Esfuerzo global de la sesión (equivalente a Borg CR10 — RPE)",
    "Evaluación general de la sesión (¿cómo la juzgarías en conjunto?)",
  ],
};

export default function MyActivitiesES() {
  const [activities, setActivities] = useState<ActivityRecord[]>([]);
  const [expandedActivity, setExpandedActivity] = useState<number | null>(null);
  const router = useRouter();

  useEffect(() => {
    loadActivities();
  }, []);

  async function loadActivities() {
    try {
      const historyData = await AsyncStorage.getItem("activitiesHistory");
      if (historyData) {
        const history = JSON.parse(historyData);
        setActivities(history.reverse());
      }
    } catch (error) {
      console.error("Error al cargar el historial:", error);
    }
  }

  function formatDuration(seconds: number): string {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}min ${secs}s`;
  }

  function formatDate(isoString: string): string {
    const date = new Date(isoString);
    return date.toLocaleDateString("es-ES", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  function toggleActivity(index: number) {
    setExpandedActivity(expandedActivity === index ? null : index);
  }

  function getAnswersForCategory(answers: { [key: string]: number }, categoryIndex: number) {
    const results: { question: string; answer: number }[] = [];
    const category = CATEGORIES[categoryIndex];
    const questions = QUESTIONS_BY_CATEGORY[category] || [];

    questions.forEach((question, qIndex) => {
      const key = `${categoryIndex}-${qIndex}`;
      if (answers[key] !== undefined) {
        results.push({ question, answer: answers[key] });
      }
    });

    return results;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mis actividades</Text>

      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        {activities.length === 0 ? (
          <Text style={styles.noActivities}>
            Ninguna actividad realizada por el momento.
          </Text>
        ) : (
          activities.map((activity, index) => (
            <View key={index} style={styles.activityCard}>
              <TouchableOpacity
                style={styles.activityHeader}
                onPress={() => toggleActivity(index)}
              >
                <View style={styles.activityHeaderContent}>
                  <Text style={styles.activityName}>{activity.activity}</Text>
                  <Text style={styles.activityDate}>{formatDate(activity.completedAt)}</Text>
                  <Text style={styles.activityDuration}>
                    Duración: {formatDuration(activity.duration)}
                  </Text>
                </View>
                <Text style={styles.expandIcon}>
                  {expandedActivity === index ? "▼" : "▶"}
                </Text>
              </TouchableOpacity>

              {expandedActivity === index && (
                <View style={styles.activityDetails}>
                  <View style={styles.detailSection}>
                    <Text style={styles.detailLabel}>Razón de parada:</Text>
                    <Text style={styles.detailText}>{activity.stopReason}</Text>
                  </View>

                  {CATEGORIES.map((category, catIndex) => {
                    const categoryAnswers = getAnswersForCategory(activity.answers, catIndex);
                    if (categoryAnswers.length === 0) return null;

                    return (
                      <View key={catIndex} style={styles.categorySection}>
                        <Text style={styles.categoryTitle}>{category}</Text>
                        {categoryAnswers.map((qa, qaIndex) => (
                          <View key={qaIndex} style={styles.questionAnswer}>
                            <Text style={styles.questionText}>{qa.question}</Text>
                            <View style={styles.answerBadge}>
                              <Text style={styles.answerText}>{qa.answer}/10</Text>
                            </View>
                          </View>
                        ))}
                      </View>
                    );
                  })}
                </View>
              )}
            </View>
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
    marginTop: 20,
    marginBottom: 20,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 20,
  },
  noActivities: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginTop: 40,
  },
  activityCard: {
    backgroundColor: "white",
    borderRadius: 12,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    overflow: "hidden",
  },
  activityHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
  },
  activityHeaderContent: {
    flex: 1,
  },
  activityName: {
    fontSize: 18,
    fontWeight: "700",
    color: "#2E8B57",
    marginBottom: 4,
  },
  activityDate: {
    fontSize: 14,
    color: "#666",
    marginBottom: 4,
  },
  activityDuration: {
    fontSize: 14,
    color: "#333",
    fontWeight: "600",
  },
  expandIcon: {
    fontSize: 18,
    color: "#2E8B57",
    marginLeft: 10,
  },
  activityDetails: {
    padding: 16,
    paddingTop: 0,
    borderTopWidth: 1,
    borderTopColor: "#E0E0E0",
  },
  detailSection: {
    marginBottom: 16,
  },
  detailLabel: {
    fontSize: 14,
    fontWeight: "700",
    color: "#2E8B57",
    marginBottom: 4,
  },
  detailText: {
    fontSize: 14,
    color: "#333",
  },
  categorySection: {
    marginBottom: 20,
  },
  categoryTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#2E8B57",
    marginBottom: 12,
  },
  questionAnswer: {
    marginBottom: 12,
    paddingLeft: 10,
  },
  questionText: {
    fontSize: 14,
    color: "#333",
    marginBottom: 6,
    lineHeight: 20,
  },
  answerBadge: {
    backgroundColor: "#2E8B57",
    borderRadius: 12,
    paddingVertical: 4,
    paddingHorizontal: 12,
    alignSelf: "flex-start",
  },
  answerText: {
    fontSize: 14,
    fontWeight: "700",
    color: "white",
  },
});
