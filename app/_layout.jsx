import { Stack, Slot, useRouter, useSegments } from "expo-router";
import SafeScreen from "../components/SafeScreen";
import { tokenCache } from "@clerk/clerk-expo/token-cache";
import { ClerkProvider } from "@clerk/clerk-expo";
import { StatusBar } from "react-native";

export default function RootLayout() {
  const router = useRouter();
  const segments = useSegments();

  return (
    <ClerkProvider tokenCache={tokenCache}>
      <SafeScreen>
        <StatusBar Style="dark" />
        <Slot />
      </SafeScreen>
    </ClerkProvider>
  );
  return <Stack headerShown={false}/>;
}
