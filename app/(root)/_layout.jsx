import { useUser } from "@clerk/clerk-expo";
import { Redirect, Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../../constants/colors";
import { Image } from "react-native";
import { styles } from "../../assets/styles/home.styles";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function Layout() {
  const { isSignedIn, isLoaded, user } = useUser();

  if (!isLoaded) return null; // better UX

  if (!isSignedIn) return <Redirect href={"/SignIn"} />;

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: COLORS.primary,
          tabBarBackgroundColor: COLORS.background,
          tabBarStyle: { borderTopColor: COLORS.border, borderTopWidth: 1 },
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: "Home",
            tabBarIcon: ({ size }) => (
              <Ionicons
                name="home-outline"
                size={size}
                color={COLORS.primary}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="create"
          options={{
            title: "Add",
            tabBarIcon: ({ size }) => (
              <Ionicons
                name="add-circle-outline"
                size={size}
                color={COLORS.primary}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: "Profile",
            tabBarIcon: ({ size }) => (
              <Image
                source={
                  user?.imageUrl ? (
                    { uri: user.imageUrl }
                  ) : (
                    <Ionicons
                      name="person-circle-outline"
                      size={size}
                      color={COLORS.primary}
                      style={styles.profileIcon}
                    />
                  )
                }
                style={styles.profileIcon}
                resizeMode="cover"
              />
            ),
          }}
        />
      </Tabs>
    </GestureHandlerRootView>
  );
}
