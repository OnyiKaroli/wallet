import { View, Text, Image } from "react-native";
import { useUser } from "@clerk/clerk-expo";
import { useState } from "react";
import { useRouter } from "expo-router";
import PageLoader from "../../components/PageLoader";
import { styles } from "../../assets/styles/profile.styles";
import ProfileCard from "../../components/ProfileCard";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../../constants/colors";
import { useEffect } from "react";
import { useTransactions } from "../../hooks/useTransactions";

export default function Profile() {
  const { user } = useUser();
  const router = useRouter();
  const [refreshing, setRefreshing] = useState(false);
  const { summary, isLoading, loadData } = useTransactions(user.id);

  const onRefresh = async () => {
    setRefreshing(true);
    await loadData();
    setRefreshing(false);
  };

  useEffect(() => {
    loadData();
  }, [loadData]);

  if (isLoading && !refreshing) return <PageLoader />;

  return (
    <View style={styles.card}>
      {/* PROFILE IMAGE */}
      <Image
        source={
          user?.imageUrl
            ? { uri: user.imageUrl }
            : require("../../assets/images/profile.png")
        }
        style={styles.profileImage}
        resizeMode="cover"
      />

      {/* USER DETAILS */}
      <Text style={styles.name}>
        {user.fullName}{" "}
        <Ionicons name="checkmark-circle" size={25} color={COLORS.primary} />
      </Text>

      <Text style={styles.bio}>
        {user.primaryEmailAddress?.emailAddress || "No email available"}
      </Text>

      {/* STATS */}
      <Text style={styles.balanceAmount}>
        KES {parseFloat(summary.balance)}
      </Text>
    </View>
  );
}