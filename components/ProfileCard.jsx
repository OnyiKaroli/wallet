import { View, Text, StyleSheet } from "react-native";
import { styles } from "../assets/styles/profile.styles";

export const ProfileCard = ({ summary }) => {
  return (
    <View style={styles.balanceCard}>
      <Text style={styles.balanceTitle}>Networth</Text>
      <Text style={styles.balanceAmount}>KES {parseFloat(summary.balance).toFixed(2)}</Text>
    </View>
  );
};
