import { StyleSheet } from "react-native";
const styles = StyleSheet.create({
    container: { flexGrow: 1, padding: 20, alignItems: "center", backgroundColor: "#f5f5f5" },

    title: { fontSize: 24, fontWeight: "bold", marginBottom: 20 },

    label: { fontSize: 16, marginTop: 10, fontWeight: "bold" },

    statusText: { fontSize: 14, color: "green", marginTop: 5 }, 

    input: { width: "100%", height: 50, borderColor: "#ccc", borderWidth: 1, borderRadius: 5, paddingHorizontal: 10, 
      backgroundColor: "#fff", marginBottom: 10 },

    audioButtons: { flexDirection: "row", justifyContent: "center", width: "100%", marginTop: 10 },

    loadingContainer: { flexDirection: "column", alignItems: "center", marginTop: 10 },

    translationBox: { width: "100%", padding: 15, marginTop: 20, borderWidth: 1, borderColor: "#999",
      borderRadius: 10, backgroundColor: "#fff", shadowColor: "#000", shadowOpacity: 0.1, 
      shadowOffset: { width: 0, height: 2 }, elevation: 3 },

    translationTitle: { fontSize: 18, fontWeight: "bold", color: "#333", marginBottom: 5 },

    translationText: { fontSize: 16, color: "#555" },

    languageRow: {flexDirection: 'row',alignItems: 'center', justifyContent: 'center',gap: 12, marginTop: 10,},
      swapButton: { backgroundColor: '#007bff', padding: 10, borderRadius: 8, alignItems: 'center', justifyContent: 'center',},

      swapIcon: {color: 'white',fontSize: 18,},

      picker: {flex: 1,backgroundColor: '#fff',borderRadius: 8,paddingVertical: 5, paddingHorizontal: 10,
        borderWidth: 1,borderColor: '#ccc',},

      recordButton: {backgroundColor: "#FF6347",padding: 10,borderRadius: 8,alignItems: "center",marginVertical: 10,},
      
      recordButtonText: {color: "#fff",fontSize: 16,fontWeight: "bold",},
      
      
      
});

export default styles;