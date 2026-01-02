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
  "Terminé el objetivo de tiempo fijado",
  "Tengo un dolor importante",
  "Estoy cansada",
  "Otro",
];

const QUESTIONS = [
  {
    category: "Dolor e incomodidad musculoesquelética",
    questions: [
      "Sensación de tirantez o rigidez alrededor de la cicatriz",
      "Dolor musculoesquelético general (cuello, espalda, zona pectoral)",
    ],
  },
  {
    category: "Fatiga y tolerancia al ejercicio",
    questions: [
      "Fatiga general después de la sesión",
      "Capacidad de recuperación (¿cuánto te costaría hacer otra actividad ahora?)",
    ],
  },
  {
    category: "Síntomas autonómicos y generales",
    questions: [
      "Mareos, náuseas o dolor de cabeza post-ejercicio",
      "Sensación de falta de aire o respiración difícil",
      "Palpitaciones o aumento excesivo del ritmo cardíaco",
    ],
  },
  {
    category: "Función del miembro superior y riesgo de linfedema",
    questions: [
      "Pesadez, hinchazón, tensión interna o dificultad para mover el brazo concerniente",
    ],
  },
  {
    category: "Bienestar emocional y motivación",
    questions: [
      "Nivel de ansiedad relacionado con el ejercicio",
      "Confianza en tu capacidad de continuar el programa",
    ],
  },
  {
    category: "Percepción global de la sesión",
    questions: [
      "Esfuerzo global de la sesión (equivalente a Borg CR10 — RPE)",
      "Evaluación general de la sesión (¿cómo la juzgarías en conjunto?)",
    ],
  },
];

export default function PostActivityQuestionnaireES() {
  const router = useRouter();
  const [stopReason, setStopReason] = useState("");
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<{ [key: string]: number }>({});

  const totalQuestions = QUESTIONS.reduce((sum, cat) => sum + cat.questions.length, 0);
  
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
    const totalSteps = totalQuestions + 1;
    
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    } else {
      try {
        const currentActivityData = await AsyncStorage.getItem("currentActivityData");
        if (currentActivityData) {
          const activityData = JSON.parse(currentActivityData);
          
          const completedAnswers = { ...answers };
          QUESTIONS.forEach((category, catIndex) => {
            category.questions.forEach((_, qIndex) => {
              const key = getQuestionKey(catIndex, qIndex);
              if (completedAnswers[key] === undefined) {
                completedAnswers[key] = "xxx";
              }
            });
          });
          
          const completedActivity = {
            ...activityData,
            stopReason: stopReason || "xxx",
            answers: completedAnswers,
            completedAt: new Date().toISOString(),
          };
          
          const historyData = await AsyncStorage.getItem("activitiesHistory");
          const history = historyData ? JSON.parse(historyData) : [];
          
          history.push(completedActivity);
          
          await AsyncStorage.setItem("activitiesHistory", JSON.stringify(history));
          await AsyncStorage.removeItem("currentActivityData");
        }
      } catch (error) {
        console.error("Error al guardar el historial:", error);
      }
      
      Alert.alert(
        "¡Felicitaciones!",
        "¡Verás tus recompensas en la pantalla de inicio! ¡Felicitaciones!",
        [
          {
            text: "OK",
            onPress: () => router.replace("/es/home" as any),
          },
        ]
      );
    }
  }

  function renderStopReasonScreen() {
    return (
      <View style={styles.contentContainer}>
        <Text style={styles.title}>¿Por qué detuvo la actividad?</Text>
        
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
          <Text style={styles.skipButtonText}>saltar →</Text>
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
            <Text style={styles.scaleLabel}>0 = Nada / Ausencia total</Text>
            <Text style={styles.scaleLabel}>10 = Máximo imaginable</Text>
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
            {currentStep === totalQuestions ? "Terminar" : "Siguiente"}
          </Text>
        </TouchableOpacity>

        <Text style={styles.progress}>
          Pregunta {currentStep} de {totalQuestions}
        </Text>
        
        <TouchableOpacity style={styles.skipButton} onPress={handleSkip}>
          <Text style={styles.skipButtonText}>saltar →</Text>
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
