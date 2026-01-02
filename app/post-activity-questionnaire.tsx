import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
    Alert,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
const STOP_REASONS = [
  "J'ai fini l'objectif de temps fixé",
  "J'ai une douleur importante",
  "Je suis fatiguée",
  "Autre",
];

const QUESTIONS = [
  {
    category: "Douleur et inconfort musculosquelettique",
    questions: [
      "Sensation de tiraillement ou de raideur autour de la cicatrice",
      "Douleur musculosquelettique générale (cou, dos, zone pectorale)",
    ],
  },
  {
    category: "Fatigue et tolérance à l'exercice",
    questions: [
      "Fatigue générale après la séance",
      "Capacité de récupération (combien te coûterait de faire une autre activité maintenant ?)",
    ],
  },
  {
    category: "Symptômes autonomiques et généraux",
    questions: [
      "Vertiges, nausées ou mal de tête post-exercice",
      "Sensation de manque d'air ou respiration difficile",
      "Palpitations ou augmentation excessive du rythme cardiaque",
    ],
  },
  {
    category: "Fonction du membre supérieur et risque de lymphœdème",
    questions: [
      "Lourdeur, gonflement, tension interne ou difficulté à bouger le bras concerné",
    ],
  },
  {
    category: "Bien-être émotionnel et motivation",
    questions: [
      "Niveau d'anxiété lié à l'exercice",
      "Confiance en ta capacité à poursuivre le programme",
    ],
  },
  {
    category: "Perception globale de la séance",
    questions: [
      "Effort global de la séance (équivalent à Borg CR10 — RPE)",
      "Évaluation générale de la séance (comment la jugerais-tu dans l'ensemble ?)",
    ],
  },
];

export default function PostActivityQuestionnaire() {
  const router = useRouter();
  const [stopReason, setStopReason] = useState("");
  const [currentStep, setCurrentStep] = useState(0); // 0 = raison d'arrêt, 1+ = questions
  const [answers, setAnswers] = useState<{ [key: string]: number }>({});

  const totalQuestions = QUESTIONS.reduce((sum, cat) => sum + cat.questions.length, 0);
  const currentCategoryIndex = Math.floor(currentStep / 10); // Approximation pour la catégorie actuelle
  
  function handleReasonSelect(reason: string) {
    setStopReason(reason);
    setCurrentStep(1);
  }

  function handleSkip() {
    if (currentStep === 0) {
      setStopReason("xxx");
      setCurrentStep(1);
    } else {
      handleNext();
    }
  }

  function handleAnswer(questionKey: string, value: number) {
    setAnswers({ ...answers, [questionKey]: value });
  }

  function getQuestionKey(categoryIndex: number, questionIndex: number): string {
    return `${categoryIndex}-${questionIndex}`;
  }

  async function handleNext() {
    const totalSteps = totalQuestions + 1; // +1 pour la raison d'arrêt
    
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    } else {
      // Sauvegarder toutes les données de l'activité
      try {
        const currentActivityData = await AsyncStorage.getItem("currentActivityData");
        if (currentActivityData) {
          const activityData = JSON.parse(currentActivityData);
          
          // Remplacer les réponses manquantes par "xxx"
          const completedAnswers = { ...answers };
          QUESTIONS.forEach((category, catIndex) => {
            category.questions.forEach((_, qIndex) => {
              const key = getQuestionKey(catIndex, qIndex);
              if (completedAnswers[key] === undefined) {
                completedAnswers[key] = "xxx";
              }
            });
          });
          
          // Créer l'objet complet de l'activité
          const completedActivity = {
            ...activityData,
            stopReason: stopReason || "xxx",
            answers: completedAnswers,
            completedAt: new Date().toISOString(),
          };
          
          // Récupérer l'historique existant
          const historyData = await AsyncStorage.getItem("activitiesHistory");
          const history = historyData ? JSON.parse(historyData) : [];
          
          // Ajouter la nouvelle activité
          history.push(completedActivity);
          
          // Sauvegarder l'historique mis à jour
          await AsyncStorage.setItem("activitiesHistory", JSON.stringify(history));
          
          // Supprimer les données temporaires
          await AsyncStorage.removeItem("currentActivityData");
        }
      } catch (error) {
        console.error("Erreur lors de la sauvegarde de l'historique:", error);
      }
      
      // Afficher le message de félicitations
      Alert.alert(
        "Félicitations !",
        "Vous verrez vos récompenses s'afficher sur l'accueil ! Félicitation !",
        [
          {
            text: "OK",
            onPress: () => router.replace("/home" as any),
          },
        ]
      );
    }
  }

  function renderStopReasonScreen() {
    return (
      <View style={styles.contentContainer}>
        <Text style={styles.title}>Pourquoi avez-vous arrêté l'activité ?</Text>
        
        {STOP_REASONS.map((reason, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.reasonButton,
              stopReason === reason && styles.reasonButtonSelected,
            ]}
            onPress={() => handleReasonSelect(reason)}
          >
            <Text
              style={[
                styles.reasonText,
                stopReason === reason && styles.reasonTextSelected,
              ]}
            >
              {reason}
            </Text>
          </TouchableOpacity>
        ))}
        
        <TouchableOpacity style={styles.skipButton} onPress={handleSkip}>
          <Text style={styles.skipButtonText}>skip →</Text>
        </TouchableOpacity>
      </View>
    );
  }

  function renderQuestionScreen() {
    let questionCounter = 0;
    let currentQuestion = null;
    let currentCategoryName = "";
    let currentQuestionIndex = 0;
    let currentCatIndex = 0;

    // Trouver la question actuelle
    for (let catIndex = 0; catIndex < QUESTIONS.length; catIndex++) {
      const category = QUESTIONS[catIndex];
      for (let qIndex = 0; qIndex < category.questions.length; qIndex++) {
        questionCounter++;
        if (questionCounter === currentStep) {
          currentQuestion = category.questions[qIndex];
          currentCategoryName = category.category;
          currentQuestionIndex = qIndex;
          currentCatIndex = catIndex;
          break;
        }
      }
      if (currentQuestion) break;
    }

    if (!currentQuestion) {
      handleNext();
      return null;
    }

    const questionKey = getQuestionKey(currentCatIndex, currentQuestionIndex);
    const currentAnswer = answers[questionKey];

    return (
      <View style={styles.contentContainer}>
        <Text style={styles.category}>{currentCategoryName}</Text>
        <Text style={styles.question}>{currentQuestion}</Text>
        
        <View style={styles.scaleContainer}>
          <View style={styles.scaleLabels}>
            <Text style={styles.scaleLabel}>0 = Rien / Absence totale</Text>
            <Text style={styles.scaleLabel}>10 = Maximum imaginable</Text>
          </View>

          <View style={styles.scaleButtons}>
            {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((value) => (
              <TouchableOpacity
                key={value}
                style={[
                  styles.scaleButton,
                  currentAnswer === value && styles.scaleButtonSelected,
                ]}
                onPress={() => handleAnswer(questionKey, value)}
              >
                <Text
                  style={[
                    styles.scaleButtonText,
                    currentAnswer === value && styles.scaleButtonTextSelected,
                  ]}
                >
                  {value}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <TouchableOpacity
          style={[
            styles.nextButton,
            currentAnswer === undefined && styles.nextButtonDisabled,
          ]}
          onPress={handleNext}
          disabled={currentAnswer === undefined}
        >
          <Text style={styles.nextButtonText}>
            {currentStep === totalQuestions ? "Terminer" : "Suivant"}
          </Text>
        </TouchableOpacity>

        <Text style={styles.progress}>
          Question {currentStep} sur {totalQuestions}
        </Text>
        
        <TouchableOpacity style={styles.skipButton} onPress={handleSkip}>
          <Text style={styles.skipButtonText}>skip →</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
      {currentStep === 0 ? renderStopReasonScreen() : renderQuestionScreen()}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E9F7F1",
  },
  scrollContent: {
    flexGrow: 1,
  },
  contentContainer: {
    padding: 20,
    paddingTop: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#2E8B57",
    marginBottom: 30,
    textAlign: "center",
  },
  reasonButton: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 20,
    marginBottom: 15,
    borderWidth: 2,
    borderColor: "#E0E0E0",
  },
  reasonButtonSelected: {
    borderColor: "#2E8B57",
    backgroundColor: "#F0FFF4",
  },
  reasonText: {
    fontSize: 16,
    color: "#333",
    textAlign: "center",
  },
  reasonTextSelected: {
    color: "#2E8B57",
    fontWeight: "600",
  },
  category: {
    fontSize: 18,
    fontWeight: "700",
    color: "#2E8B57",
    marginBottom: 20,
    textAlign: "center",
  },
  question: {
    fontSize: 18,
    color: "#333",
    marginBottom: 30,
    textAlign: "center",
    lineHeight: 26,
  },
  scaleContainer: {
    marginBottom: 30,
  },
  scaleLabels: {
    marginBottom: 20,
  },
  scaleLabel: {
    fontSize: 14,
    color: "#666",
    marginBottom: 5,
    textAlign: "center",
  },
  scaleButtons: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 10,
  },
  scaleButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "white",
    borderWidth: 2,
    borderColor: "#E0E0E0",
    justifyContent: "center",
    alignItems: "center",
    margin: 5,
  },
  scaleButtonSelected: {
    backgroundColor: "#2E8B57",
    borderColor: "#2E8B57",
  },
  scaleButtonText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
  },
  scaleButtonTextSelected: {
    color: "white",
  },
  nextButton: {
    backgroundColor: "#2E8B57",
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
    marginTop: 20,
  },
  nextButtonDisabled: {
    backgroundColor: "#B0B0B0",
  },
  nextButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "700",
  },
  progress: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
    marginTop: 15,
  },
  skipButton: {
    position: "absolute",
    bottom: 20,
    right: 20,
    backgroundColor: "transparent",
    padding: 10,
  },
  skipButtonText: {
    fontSize: 14,
    color: "#999",
    fontStyle: "italic",
  },
});
