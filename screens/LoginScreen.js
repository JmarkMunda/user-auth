import { Alert, StyleSheet } from "react-native";
import { useState } from "react";
import { loginRequest } from "../util/auth";

import AuthContent from "../components/auth/AuthContent";
import LoadingOverlay from "../components/ui/LoadingOverlay";
import { useAuthContext } from "../store/auth-context";

export default function LoginScreen() {
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [error, setError] = useState(null);

  const { authenticate } = useAuthContext();

  const handleLogin = async ({ email, password }) => {
    setIsAuthenticating(true);
    try {
      const token = await loginRequest(email, password);
      authenticate(token);
    } catch (error) {
      Alert.alert(
        "Authentication failed:",
        "Please check your credentials and try again"
      );
      setError(error);
      setIsAuthenticating(false);
    }
  };

  if (isAuthenticating) {
    return <LoadingOverlay message="Logging you in..." />;
  }

  return <AuthContent isLogin onAuthenticate={handleLogin} />;
}

const styles = StyleSheet.create({});
