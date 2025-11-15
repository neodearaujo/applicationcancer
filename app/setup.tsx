import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
    Alert,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

const ACTIVITIES = [
  "marche nordique",
  "marche aquatique",
  "Course a pied",
  "natation",
  "vélo en extérieur",
  "vélo en intérieur",
  "vélo elliptique",
  "montée de marche",
  "rameur",
  "danse",
];

export default function Setup() {
  const [name, setName] = useState("");
  const [grade, setGrade] = useState("");
  const [bpmMax, setBpmMax] = useState("");
  const [bpmGoal, setBpmGoal] = useState("");
  const [targetTime, setTargetTime] = useState("");
  const [selected, setSelected] = useState(() => ACTIVITIES.reduce((acc, a) => ({ ...acc, [a]: false }), {}));
  const router = useRouter();

  function toggleActivity(key: string) {
    setSelected((s) => ({ ...s, [key]: !s[key] }));
  }

  function toggleAll() {
    const allOn = Object.values(selected).every(Boolean);
    const next = ACTIVITIES.reduce((acc, a) => ({ ...acc, [a]: !allOn }), {});
    setSelected(next);
  }

  function handleSubmit() {
    if (!name.trim()) {
      Alert.alert("Nom manquant", "Veuillez entrer le nom.");
      return;
    }

    const data = {
      name,
      grade,
      bpmMax,
      bpmGoal,
      targetTime,
      activities: Object.keys(selected).filter((k) => selected[k]),
    };

    console.log("Données renseignées:", data);
    // Redirection vers la page de nommage du chat
    router.push("/pet-naming");
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Renseignements</Text>

      <Text style={styles.label}>NOM</Text>
      <TextInput value={name} onChangeText={setName} style={styles.input} placeholder="Nom" />

      <Text style={styles.label}>Grade du cancer</Text>
      <TextInput value={grade} onChangeText={setGrade} style={styles.input} placeholder="Ex: 1, 2, 3" />

      <Text style={styles.label}>BPM max</Text>
      <TextInput
        value={bpmMax}
        onChangeText={setBpmMax}
        style={styles.input}
        keyboardType="numeric"
        placeholder="Ex: 180"
      />

      <Text style={styles.label}>Objectif de BPM pendant l'exercice</Text>
      <TextInput
        value={bpmGoal}
        onChangeText={setBpmGoal}
        style={styles.input}
        keyboardType="numeric"
        placeholder="Ex: 120"
      />

      <Text style={styles.label}>Temps cible d'exercice par semaine (minutes)</Text>
      <TextInput
        value={targetTime}
        onChangeText={setTargetTime}
        style={styles.input}
        keyboardType="numeric"
        placeholder="Ex: 150"
      />

      <View style={styles.qcmHeader}>
        <Text style={styles.label}>Activités (choisir)</Text>
        <TouchableOpacity onPress={toggleAll}>
          <Text style={styles.toggleAll}>Tout cocher</Text>
        </TouchableOpacity>
      </View>

      {ACTIVITIES.map((act) => (
        <TouchableOpacity
          key={act}
          style={styles.activityRow}
          onPress={() => toggleActivity(act)}
        >
          <View style={[styles.checkbox, selected[act] && styles.checked]}>
            {selected[act] ? <Text style={styles.checkMark}>✓</Text> : null}
          </View>
          <Text style={styles.activityLabel}>{act}</Text>
        </TouchableOpacity>
      ))}

      <TouchableOpacity style={styles.submit} onPress={handleSubmit}>
        <Text style={styles.submitText}>Valider</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#FFF",
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    color: "#2E7D65",
    marginBottom: 12,
    textAlign: "center",
  },
  label: {
    fontSize: 14,
    color: "#444",
    marginBottom: 6,
  },
  input: {
    height: 46,
    borderWidth: 1,
    borderColor: "#E6E6E6",
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 12,
    backgroundColor: "#FBFBFB",
  },
  qcmHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 8,
    marginBottom: 8,
  },
  toggleAll: {
    color: "#2E8B57",
    fontWeight: "700",
  },
  activityRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
  },
  checkbox: {
    width: 26,
    height: 26,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: "#CFCFCF",
    marginRight: 12,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
  },
  checked: {
    backgroundColor: "#2E8B57",
    borderColor: "#2E8B57",
  },
  checkMark: {
    color: "white",
    fontWeight: "700",
  },
  activityLabel: {
    fontSize: 15,
    color: "#333",
  },
  submit: {
    marginTop: 20,
    backgroundColor: "#2E8B57",
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
  },
  submitText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },
});
