import { useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { useSignUp } from "@clerk/clerk-expo";
import { useRouter, Link } from "expo-router";
import { styles } from "@/assets/styles/auth.styles.js";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "@/constants/colors";
import { Image } from "expo-image";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

export default function SignUpScreen() {
  const { isLoaded, signUp, setActive } = useSignUp();
  const router = useRouter();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [pendingVerification, setPendingVerification] = useState(false);
  const [code, setCode] = useState("");
  const [error, setError] = useState("");

  // Handle sign-up form submission
  const onSignUpPress = async () => {
    if (!isLoaded) return;

    // Basic validation
    if (!firstName || !lastName || !emailAddress || !password) {
      setError("All fields are required.");
      return;
    }

    try {
      await signUp.create({
        firstName,
        lastName,
        emailAddress,
        password,
      });

      // Send user a verification email
      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });

      setPendingVerification(true);
    } catch (err) {
      if (err.errors?.[0]?.code === "form_identifier_exists") {
        setError("Email already in use. Use another email.");
      } else {
        setError("An error occurred. Please try again.");
      }
    }
  };

  // Handle verification form submission
  const onVerifyPress = async () => {
    if (!isLoaded) return;

    try {
      const signUpAttempt = await signUp.attemptEmailAddressVerification({
        code,
      });

      if (signUpAttempt.status === "complete") {
        await setActive({ session: signUpAttempt.createdSessionId });
        router.replace("/");
      } else {
        console.error("Verification incomplete:", signUpAttempt);
      }
    } catch (err) {
      setError("Invalid or expired verification code.");
    }
  };

  // --- VERIFICATION SCREEN ---
  if (pendingVerification) {
    return (
      <View style={styles.verificationContainer}>
        <Text style={styles.verificationTitle}>Verify your email</Text>

        {error ? (
          <View style={styles.errorBox}>
            <Ionicons name="alert-circle" size={20} color={COLORS.expense} />
            <Text style={styles.errorText}>{error}</Text>
            <TouchableOpacity onPress={() => setError("")}>
              <Ionicons name="close" size={20} color={COLORS.textLight} />
            </TouchableOpacity>
          </View>
        ) : null}

        <TextInput
          style={[styles.verificationInput, error && styles.inputError]}
          value={code}
          placeholderTextColor={COLORS.textLight}
          placeholder="Enter verification code"
          onChangeText={setCode}
        />
        <TouchableOpacity onPress={onVerifyPress} style={styles.button}>
          <Text style={styles.buttonText}>Verify</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // --- SIGN-UP FORM SCREEN ---
  return (
    <KeyboardAwareScrollView
      animated
      style={{ flex: 1 }}
      contentContainerStyle={{ flexGrow: 1 }}
      enableOnAndroid
      enableAutomaticScroll
    >
      <View style={styles.container}>
        <Image
          source={require("../../assets/images/revenue-i2.png")}
          style={styles.illustration}
        />
        <Text style={styles.title}>Create Account</Text>

        {error ? (
          <View style={styles.errorBox}>
            <Ionicons name="alert-circle" size={20} color={COLORS.expense} />
            <Text style={styles.errorText}>{error}</Text>
            <TouchableOpacity onPress={() => setError("")}>
              <Ionicons name="close" size={20} color={COLORS.textLight} />
            </TouchableOpacity>
          </View>
        ) : null}
        <View style={styles.inputRow}>
          {/* First name */}
          <TextInput
            style={[styles.input, error && styles.inputError]}
            autoCapitalize="words"
            width="48%"
            value={firstName}
            placeholder="First name"
            placeholderTextColor={COLORS.textLight}
            onChangeText={setFirstName}
          />

          {/* Last name */}
          <TextInput
            style={[styles.input, error && styles.inputError]}
            autoCapitalize="words"
            width="48%"
            value={lastName}
            placeholder="Last name"
            placeholderTextColor={COLORS.textLight}
            onChangeText={setLastName}
          />
        </View>

        {/* Email */}
        <TextInput
          style={[styles.input, error && styles.inputError]}
          autoCapitalize="none"
          value={emailAddress}
          placeholder="Enter email"
          placeholderTextColor={COLORS.textLight}
          onChangeText={setEmailAddress}
        />

        {/* Password */}
        <TextInput
          style={[styles.input, error && styles.inputError]}
          value={password}
          placeholder="Enter password"
          placeholderTextColor={COLORS.textLight}
          secureTextEntry
          onChangeText={setPassword}
        />

        {/* Submit */}
        <TouchableOpacity style={styles.button} onPress={onSignUpPress}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>

        {/* Footer */}
        <View style={styles.footerContainer}>
          <Text style={styles.footerText}>Already have an account?</Text>
          <Link href="/SignIn">
            <Text style={styles.linkText}>Sign in</Text>
          </Link>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
}
