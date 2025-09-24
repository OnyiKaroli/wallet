import { SignedIn, SignedOut, useUser } from "@clerk/clerk-expo";
import { Link } from "expo-router";
import { Text, View } from "react-native";
import { SignOutButton } from "@/components/SignOutButton";
import { useTransactions } from "@/hooks/useTransactions";
import { useEffect } from "react";

export default function Page() {
  const { user } = useUser();
  const { transactions, summary, isLoading, deleteTransaction } =
    useTransactions(user.id); // Uncomment this line to enable React Query Devtools

  useEffect(() => {
    loadData();
  }, [loadData]);

  console.log("Transactions:", transactions);
  console.log("Summary:", summary);

  return (
    <View>
      <SignedIn>
        <Text>Hello {user?.emailAddresses[0].emailAddress}</Text>
        <SignOutButton />
      </SignedIn>
      <SignedOut>
        <Link href="/(auth)/SignIn">
          <Text>Sign in</Text>
        </Link>
        <Link href="/(auth)/SignUp">
          <Text>Sign up</Text>
        </Link>
      </SignedOut>
    </View>
  );
}
