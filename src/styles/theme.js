// src/styles/theme.js
import colors from "./colors";
import fonts from "./fonts";
import spacing from "./spacing";

const theme = {
  colors,
  fonts,
  spacing,
  borderRadius: {
    sm: 4,
    md: 8,
    lg: 16,
  },
  shadows: {
    sm: {
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.1,
      shadowRadius: 2,
      elevation: 1,
    },
    md: {
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 3 },
      shadowOpacity: 0.15,
      shadowRadius: 4,
      elevation: 3,
    },
  },
};

export default theme;
