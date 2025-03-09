export const getStyles = () => {
  return {
    container: {
      flexDirection: "row",
      alignItems: "center",
    },

    dateContainer: {
      borderTopLeftRadius: { xs: 10, md: 20 },
      borderBottomLeftRadius: { xs: 10, md: 20 },
      borderRadius: 1,
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      p: 0.5,
      pl: 1,
      flexGrow: 1,
      px: 2,
    },

    dateInput: {
      bgcolor: "white",
      "& fieldset": { border: "none" },
      "& .MuiOutlinedInput-root": { padding: 0 },
      "& input": { border: "none", outline: "none" },
    },

    dateInputTitle: {
      flexGrow: 1,
    },

    searchInput: {
      flexGrow: 1,
      "& .MuiOutlinedInput-root": {
        "&:hover fieldset": {
          borderColor: "#0A323C",
        },
        "&.Mui-focused fieldset": {
          borderColor: "#0A323C",
        },
      },
      "& .MuiInputLabel-root": {
        color: "gray", // Default label color
      },
      "&:hover .MuiInputLabel-root": {
        color: "#0A323C", // Label color on hover
      },
      "& .MuiInputLabel-root.Mui-focused": {
        color: "#0A323C", // Label color on focus
      },
    },

    searchInputContainer: {
      display: "flex",
    },
  };
};
