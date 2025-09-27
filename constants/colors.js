// constants/colors.js
const coffeeTheme = {
  primary: "#8B593E",
  background: "#FFF8F3",
  text: "#4A3428",
  border: "#E5D3B7",
  white: "#FFFFFF",
  textLight: "#9A8478",
  expense: "#E74C3C",
  income: "#2ECC71",
  card: "#FFFFFF",
  shadow: "#000000",
};

const forestTheme = {
  primary: "#2E7D32",
  background: "#E8F5E9",
  text: "#1B5E20",
  border: "#C8E6C9",
  white: "#FFFFFF",
  textLight: "#66BB6A",
  expense: "#C62828",
  income: "#388E3C",
  card: "#FFFFFF",
  shadow: "#000000",
};

const purpleTheme = {
  primary: "#6A1B9A",
  background: "#F3E5F5",
  text: "#4A148C",
  border: "#D1C4E9",
  white: "#FFFFFF",
  textLight: "#BA68C8",
  expense: "#D32F2F",
  income: "#388E3C",
  card: "#FFFFFF",
  shadow: "#000000",
};

const oceanTheme = {
  primary: "#0277BD",
  background: "#E1F5FE",
  text: "#01579B",
  border: "#B3E5FC",
  white: "#FFFFFF",
  textLight: "#4FC3F7",
  expense: "#EF5350",
  income: "#26A69A",
  card: "#FFFFFF",
  shadow: "#000000",
};

const safaricomTheme = {
  primary: "#1BAA5A", // Safaricom green
  background: "#F9FFF9", // Very light greenish background
  text: "#212121", // Dark neutral text
  border: "#D6EFD8", // Light green border
  white: "#FFFFFF",
  textLight: "#66BB6A", // Softer green for secondary text
  expense: "#E53935", // Red for negative
  income: "#43A047", // Darker green for positive
  card: "#FFFFFF",
  shadow: "#000000",
};

const airtelTheme = {
  primary: "#E60000", // Airtel red
  background: "#FFF5F5", // very light red-tint background
  text: "#212121", // dark neutral text
  border: "#F5C2C0", // light red border
  white: "#FFFFFF",
  textLight: "#FF6B6B", // softer red for secondary text
  expense: "#C62828", // darker red for expenses
  income: "#2E7D32", // green for income (contrast)
  card: "#FFFFFF",
  shadow: "#000000",
};

const mashupTheme = {
  primary: "#1BAA5A", // Safaricom green (main brand color)
  background: "#FFF9F9", // very light warm background (leans toward Airtel’s softness)
  text: "#212121", // dark neutral text for balance
  border: "#E5E5E5", // neutral border
  white: "#FFFFFF",
  textLight: "#66BB6A", // softer green for secondary text
  expense: "#E60000", // Airtel red for negative values
  income: "#2ECC71", // bright green for positive values
  card: "#FFFFFF",
  shadow: "#000000",
  accent: "#FF3B3B", // Airtel bold red accent (buttons, highlights)
};

export const THEMES = {
  coffee: coffeeTheme,
  forest: forestTheme,
  purple: purpleTheme,
  ocean: oceanTheme,
  safaricom: safaricomTheme,
  airtel: airtelTheme,
  mashup: mashupTheme,
};

// 👇 change this to switch theme
export const COLORS = THEMES.airtel;
