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
  "Douleur et inconfort musculosquelettique",
  "Fatigue et tolérance à l'exercice",
  "Symptômes autonomiques et généraux",
  "Fonction du membre supérieur et risque de lymphœdème",
  "Bien-être émotionnel et motivation",
  "Perception globale de la séance",
];

const QUESTIONS_BY_CATEGORY: { [key: string]: string[] } = {
  "Douleur et inconfort musculosquelettique": [
    "Ressentez-vous une douleur à l'épaule après la séance ?",
    "Avez-vous des douleurs dans le bras concerné (zone lymphatique ou cicatrice) ?",
    "Sentez-vous un tiraillement ou une raideur autour de votre cicatrice ?",
    "Avez-vous des douleurs générales au niveau du cou, du dos ou de la zone pectorale ?",
  ],
  "Fatigue et tolérance à l'exercice": [
    "Vous sentez-vous fatiguée de manière générale après la séance ?",
    "Ressentez-vous une fatigue musculaire dans vos bras, vos épaules ou votre tronc ?",
    "Si vous deviez faire une autre activité maintenant, pensez-vous que ce serait difficile pour vous ?",
  ],
  "Symptômes autonomiques et généraux": [
    "Avez-vous ressenti des vertiges ou une sensation d'instabilité après l'exercice ?",
    "Avez-vous eu des nausées après la séance ?",
    "Avez-vous eu mal à la tête après l'exercice ?",
    "Avez-vous eu l'impression de manquer d'air ou de respirer difficilement ?",
    "Avez-vous ressenti des palpitations ou une accélération excessive de votre rythme cardiaque ?",
  ],
  "Fonction du membre supérieur et risque de lymphœdème": [
    "Votre bras concerné vous paraît-il lourd ou gonflé après la séance ?",
    "Avez-vous ressenti une sensation de \"tension interne\" dans votre bras (signe précoce de lymphœdème) ?",
    "Avez-vous eu des difficultés à lever ou à bouger votre bras après l'exercice ?",
  ],
  "Bien-être émotionnel et motivation": [
    "Comment décririez-vous votre état d'esprit après la séance ?",
    "Avez-vous ressenti de l'anxiété liée à l'exercice ?",
    "Vous sentez-vous confiante dans votre capacité à poursuivre le programme ?",
    "Ressentez-vous un sentiment d'accomplissement ou de satisfaction après cette séance ?",
  ],
  "Perception globale de la séance": [
    "Comment évalueriez-vous l'effort global fourni pendant cette séance (sur une échelle de 0 à 10) ?",
    "Pensez-vous avoir fait trop ou pas assez pendant cette séance ?",
    "Globalement, comment évalueriez-vous cette séance dans son ensemble ?",
  ],
};

export default function MyActivities() {
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
        setActivities(history.reverse()); // Plus récent en premier
      }
    } catch (error) {
      console.error("Erreur lors du chargement de l'historique:", error);
    }
  }

  function formatDuration(seconds: number): string {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}min ${secs}s`;
  }

  function formatDate(isoString: string): string {
    const date = new Date(isoString);
    return date.toLocaleDateString("fr-FR", {
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
      <Text style={styles.title}>Mes activités</Text>

      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        {activities.length === 0 ? (
          <Text style={styles.noActivities}>
            Aucune activité réalisée pour le moment.
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
                    Durée: {formatDuration(activity.duration)}
                  </Text>
                </View>
                <Text style={styles.expandIcon}>
                  {expandedActivity === index ? "▼" : "▶"}
                </Text>
              </TouchableOpacity>

              {expandedActivity === index && (
                <View style={styles.activityDetails}>
                  <View style={styles.detailSection}>
                    <Text style={styles.detailLabel}>Raison d'arrêt:</Text>
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
