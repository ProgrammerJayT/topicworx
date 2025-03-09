export const getStyles = () => {
  return {
    container: {
      width: "100vw",
      height: "100vh",
      bgcolor: "#ffffff",
    },

    noDataContainer: {
      width: "100%",
      height: "100%",
      display: "flex",
      justifyContent: "center",
    },

    content: {
      width: "100%",
      height: "100%",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      pt: 5,
    },

    visualContainer: {
      px: "20%",
    },

    topHeader: {
      textAlign: "center",
      color: "grey",
      mb: 5,
    },

    visualizerButtonsContainer: {
      mx: 1,
      mt:2
    },

    graphButton: {
      width: "50%",
    },

    tableButton: {
      width: "50%",
    },
  };
};
