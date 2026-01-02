import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { useState } from "react";
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
  "marcha nórdica",
  "marcha acuática",
  "carrera",
  "natación",
  "bicicleta exterior",
  "bicicleta interior",
  "bicicleta elíptica",
  "subida de escaleras",
  "remo",
  "baile",
];

export default function SetupES() {
  const [name, setName] = useState("");
  const [cancerOperated, setCancerOperated] = useState("");
  const [bpmMax, setBpmMax] = useState("");
  const [bpmGoal, setBpmGoal] = useState("");
  const [targetTime, setTargetTime] = useState("");
  const [selected, setSelected] = useState<{ [key: string]: boolean }>(() => 
    ACTIVITIES.reduce((acc, a) => ({ ...acc, [a]: false }), {} as { [key: string]: boolean })
  );
  const router = useRouter();

  function toggleActivity(key: string) {
    setSelected((s) => ({ ...s, [key]: !s[key] }));
  }

  function toggleAll() {
    const allOn = Object.values(selected).every(Boolean);
    const next = ACTIVITIES.reduce((acc, a) => ({ ...acc, [a]: !allOn }), {} as { [key: string]: boolean });
    setSelected(next);
  }

  async function handleSubmit() {
    if (!name.trim()) {
      Alert.alert("Nombre faltante", "Por favor ingrese el nombre.");
      return;
    }

    const selectedActivities = Object.keys(selected).filter((k) => selected[k]);

    const data = {
      name,
      cancerOperated,
      bpmMax,
      bpmGoal,
      targetTime,
      activities: selectedActivities,
    };

    try {
      await AsyncStorage.setItem("userSetup", JSON.stringify(data));
      console.log("Datos ingresados:", data);
      router.push("/es/pet-naming");
    } catch (error) {
      console.error("Error al guardar:", error);
      Alert.alert("Error", "No se pueden guardar los datos.");
    }
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Información</Text>

      <Text style={styles.label}>NOMBRE</Text>
      <TextInput value={name} onChangeText={setName} style={styles.input} placeholder="Nombre" />

      <Text style={styles.label}>Cáncer operado</Text>
      <View style={styles.radioContainer}>
        <TouchableOpacity 
          style={styles.radioOption}
          onPress={() => setCancerOperated("sí")}
        >
          <View style={[styles.radioButton, cancerOperated === "sí" && styles.radioSelected]}>
            {cancerOperated === "sí" && <View style={styles.radioDot} />}
          </View>
          <Text style={styles.radioLabel}>Sí</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.radioOption}
          onPress={() => setCancerOperated("no")}
        >
          <View style={[styles.radioButton, cancerOperated === "no" && styles.radioSelected]}>
            {cancerOperated === "no" && <View style={styles.radioDot} />}
          </View>
          <Text style={styles.radioLabel}>No</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.label}>BPM máximo</Text>
      <TextInput
        value={bpmMax}
        onChangeText={setBpmMax}
        style={styles.input}
        keyboardType="numeric"
        placeholder="Ej: 180"
      />

      <Text style={styles.label}>Objetivo de BPM durante el ejercicio</Text>
      <TextInput
        value={bpmGoal}
        onChangeText={setBpmGoal}
        style={styles.input}
        keyboardType="numeric"
        placeholder="Ej: 120"
      />

      <Text style={styles.label}>Tiempo objetivo de ejercicio por semana (minutos)</Text>
      <TextInput
        value={targetTime}
        onChangeText={setTargetTime}
        style={styles.input}
        keyboardType="numeric"
        placeholder="Ej: 150"
      />

      <View style={styles.qcmHeader}>
        <Text style={styles.label}>Actividades (elegir)</Text>
        <TouchableOpacity onPress={toggleAll}>
          <Text style={styles.toggleAll}>Marcar todo</Text>
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
        <Text style={styles.submitText}>Validar</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.skipButton} onPress={() => router.push("/es/pet-naming")}>
        <Text style={styles.skipButtonText}>saltar →</Text>
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
  radioContainer: {
    flexDirection: "row",
    marginBottom: 16,
    gap: 20,
  },
  radioOption: {
    flexDirection: "row",
    alignItems: "center",
  },
  radioButton: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#CFCFCF",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 8,
    backgroundColor: "white",
  },
  radioSelected: {
    borderColor: "#2E8B57",
  },
  radioDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#2E8B57",
  },
  radioLabel: {
    fontSize: 16,
    color: "#333",
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
