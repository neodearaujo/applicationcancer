import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Alert,
} from "react-native";
import { useRouter } from "expo-router";

const ACTIVITIES = [
  { name: "Marche Nordique", emoji: "🥾", selected: true },
  { name: "Marche aquatique", emoji: "🏊", selected: true },
  { name: "Course à pied", emoji: "🏃", selected: false },
  { name: "Natation", emoji: "🏊‍♀️", selected: true },
  { name: "Vélo en extérieur", emoji: "🚴", selected: true },
  { name: "Vélo en intérieur", emoji: "🚴‍♀️", selected: true },
  { name: "Vélo elliptique", emoji: "⭕", selected: true },
  { name: "Montée de marche", emoji: "📈", selected: true },
  { name: "Rameur", emoji: "🚣", selected: true },
  { name: "Danse", emoji: "💃", selected: false },
];

export default function PatientDetails() {
  const [name, setName] = useState("Maria Flora");
  const [grade, setGrade] = useState("2");
  const [bpmMax, setBpmMax] = useState("162");
  const [bpmGoal, setBpmGoal] = useState("115");
  const [targetTime, setTargetTime] = useState("150");
  const [activities, setActivities] = useState(ACTIVITIES);
  const router = useRouter();

  function toggleActivity(index: number) {
    const newActivities = [...activities];
    newActivities[index].selected = !newActivities[index].selected;
    setActivities(newActivities);
  }

  function toggleAll() {
    const allSelected = activities.every(a => a.selected);
    const newActivities = activities.map(a => ({ ...a, selected: !allSelected }));
    setActivities(newActivities);
  }

  function handleSave() {
    const selectedActivities = activities.filter(a => a.selected);
    const data = {
      name,
      grade,
      bpmMax,
      bpmGoal,
      targetTime,
      activities: selectedActivities.map(a => a.name),
    };

    console.log("Données patient mises à jour:", data);
    Alert.alert("Enregistré", "Les informations du patient ont été mises à jour.", [
      {
        text: "OK",
        onPress: () => router.back(),
      },
    ]);
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Dossier Patient</Text>

      <Text style={styles.label}>NOM</Text>
      <TextInput value={name} onChangeText={setName} style={styles.input} />

      <Text style={styles.label}>Grade du cancer</Text>
      <TextInput value={grade} onChangeText={setGrade} style={styles.input} />

      <Text style={styles.label}>BPM max</Text>
      <TextInput
        value={bpmMax}
        onChangeText={setBpmMax}
        style={styles.input}
        keyboardType="numeric"
      />

      <Text style={styles.label}>BPM cible pendant l'exercice</Text>
      <TextInput
        value={bpmGoal}
        onChangeText={setBpmGoal}
        style={styles.input}
        keyboardType="numeric"
      />

      <Text style={styles.label}>Temps cible d'exercice par semaine (minutes)</Text>
      <TextInput
        value={targetTime}
        onChangeText={setTargetTime}
        style={styles.input}
        keyboardType="numeric"
      />

      <View style={styles.qcmHeader}>
        <Text style={styles.label}>Activités autorisées</Text>
        <TouchableOpacity onPress={toggleAll}>
          <Text style={styles.toggleAll}>Tout cocher</Text>
        </TouchableOpacity>
      </View>

      {activities.map((activity, index) => (
        <TouchableOpacity
          key={index}
          style={styles.activityRow}
          onPress={() => toggleActivity(index)}
        >
          <View style={[styles.checkbox, activity.selected && styles.checked]}>
            {activity.selected ? <Text style={styles.checkMark}>✓</Text> : null}
          </View>
          <Text style={styles.activityEmoji}>{activity.emoji}</Text>
          <Text style={styles.activityLabel}>{activity.name}</Text>
        </TouchableOpacity>
      ))}

      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveButtonText}>Enregistrer les modifications</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#F8F9FA",
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: "#2E7D65",
    marginBottom: 20,
    textAlign: "center",
  },
  label: {
    fontSize: 14,
    color: "#495057",
    marginBottom: 6,
    fontWeight: "600",
  },
  input: {
    height: 46,
    borderWidth: 1,
    borderColor: "#CED4DA",
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 16,
    backgroundColor: "white",
    fontSize: 16,
  },
  qcmHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 8,
    marginBottom: 12,
  },
  toggleAll: {
    color: "#2E7D65",
    fontWeight: "700",
    fontSize: 14,
  },
  activityRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 8,
    backgroundColor: "white",
    marginBottom: 4,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: "#E9ECEF",
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#CED4DA",
    marginRight: 12,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
  },
  checked: {
    backgroundColor: "#2E7D65",
    borderColor: "#2E7D65",
  },
  checkMark: {
    color: "white",
    fontWeight: "700",
    fontSize: 14,
  },
  activityEmoji: {
    fontSize: 18,
    marginRight: 8,
  },
  activityLabel: {
    fontSize: 15,
    color: "#495057",
    flex: 1,
  },
  saveButton: {
    marginTop: 30,
    backgroundColor: "#2E7D65",
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: "center",
  },
  saveButtonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },
});