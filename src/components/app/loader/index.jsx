import { Backdrop } from "@mui/material";
import { useAppContext } from "@root/context/app/index";

const FullScreenLoader = ({}) => {
  const { loader } = useAppContext();

  const sharedStyleProps = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  };

  return (
    <Backdrop
      sx={{
        backgroundColor: `rgba(0, 0, 0, ${loader?.backdrop ?? 1})`,
        zIndex: (theme) => theme.zIndex.drawer + 9999,
        position: "absolute",
        ...sharedStyleProps,
      }}
      open={loader?.visibility ?? false}
    >
      <div className="loader"></div>
    </Backdrop>
  );
};

export default FullScreenLoader;
