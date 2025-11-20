import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { useRouter } from "expo-router";

export default function PatientsList() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Liste des Patients</Text>
      
      <ScrollView style={styles.scrollView}>
        <TouchableOpacity 
          style={styles.patientCard}
          onPress={() => router.push("/patient-details")}
        >
          <Text style={styles.patientText}>1: Maria Flora, 58 ans</Text>
        </TouchableOpacity>
        
        {/* Placeholder pour d'autres patients */}
        <View style={styles.placeholderCard}>
          <Text style={styles.placeholderText}>Aucun autre patient pour le moment</Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F9FA",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: "#2E7D65",
    marginBottom: 20,
    textAlign: "center",
  },
  scrollView: {
    flex: 1,
  },
  patientCard: {
    backgroundColor: "white",
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#E9ECEF",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  patientText: {
    fontSize: 16,
    color: "#495057",
    fontWeight: "600",
  },
  placeholderCard: {
    backgroundColor: "#F8F9FA",
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#DEE2E6",
    borderStyle: "dashed",
  },
  placeholderText: {
    fontSize: 14,
    color: "#6C757D",
    fontStyle: "italic",
    textAlign: "center",
  },
});