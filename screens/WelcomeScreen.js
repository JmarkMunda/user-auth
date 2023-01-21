import { Alert, StyleSheet, Text, View } from "react-native";
import axios from "axios";
import { useEffect, useState } from "react";
import { useAuthContext } from "../store/auth-context";

export default function WelcomeScreen() {
  const [fetchMessage, setFetchMessage] = useState("");

  const { token } = useAuthContext();

  useEffect(() => {
    const getMessage = async () => {
      try {
        const response = await axios.get(
          `https://user-auth-42062-default-rtdb.firebaseio.com/message.json?auth=${token}`
        );

        setFetchMessage(response.data);
      } catch (error) {
        Alert.alert("Failed to load message:", error);
      }
    };

    getMessage();
  }, [token]);

  return (
    <View style={styles.rootContainer}>
      <Text style={styles.title}>Welcome!</Text>
      <Text>You authenticated successfully!</Text>
      <Text>{fetchMessage}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 32,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
  },
});
