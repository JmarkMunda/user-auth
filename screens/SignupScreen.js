import { useState } from "react";
import { Alert, StyleSheet } from "react-native";
import { createUserRequest } from "../util/auth";
import { useAuthContext } from "../store/auth-context";

import AuthContent from "../components/auth/AuthContent";
import LoadingOverlay from "../components/ui/LoadingOverlay";

export default function SignupScreen({ navigation }) {
  // local states
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [error, setError] = useState(null);

  const { authenticate } = useAuthContext();

  const handleSignup = async ({ email, password }) => {
    setIsAuthenticating(true);
    try {
      const token = await createUserRequest(email, password);
      authenticate(token);
    } catch (error) {
      Alert.alert(
        "Authentication faied:",
        "Could not create user, please check your inputs and try again"
      );
      setError(error);
      setIsAuthenticating(false);
    }
  };

  if (isAuthenticating) {
    return <LoadingOverlay message="Please wait while creating user..." />;
  }

  return <AuthContent onAuthenticate={handleSignup} />;
}

const styles = StyleSheet.create({});
