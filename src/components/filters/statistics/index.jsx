"use client"

import {
  FormControl,
  IconButton,
  Paper,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { useFormik } from "formik";
import { getStyles } from "./styles";
import { Backspace } from "@mui/icons-material";

const StatsFilterComponent = ({ setFilters = () => {} }) => {
  const styles = getStyles();

  const formik = useFormik({
    initialValues: {
      startDate: null,
      endDate: null,
    },
    onChange: (values) => {
      setFilters(values);
    },
  });

  return (
    <Grid container alignItems={"center"} spacing={2}>
      <Grid size={12}>
        <Paper elevation={20}>
          <Stack direction={"row"} spacing={2} sx={[styles.dateContainer]}>
            <Typography variant="subtitle2" sx={styles.dateInputTitle}>
              Start date
            </Typography>

            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                openTo="year"
                id="startDate"
                name="startDate"
                sx={styles.dateInput}
                value={
                  formik.values.startDate
                    ? dayjs(formik.values.startDate, "DD/MM/YYYY")
                    : null
                }
                format="DD/MM/YYYY"
                onChange={(date) => {
                  const setDate = date ?? null;
                  formik.setFieldValue("startDate", setDate);
                  setFilters({ ...formik.values, startDate: setDate });
                }}
                slotProps={{
                  textField: {
                    size: "small",
                    placeholder: "Select start date",
                  },
                }}
              />
            </LocalizationProvider>

            <Tooltip title="Clear start date" placement="right">
              <IconButton
                onClick={() => {
                  formik.setFieldValue("startDate", null);
                  setFilters({ ...formik.values, startDate: null });
                }}
              >
                <Backspace sx={{ color: "red" }} />
              </IconButton>
            </Tooltip>
          </Stack>
        </Paper>
      </Grid>

      <Grid size={12}>
        <Paper elevation={20}>
          <Stack direction={"row"} spacing={2} sx={[styles.dateContainer]}>
            <Typography variant="subtitle2" sx={styles.dateInputTitle}>
              End date
            </Typography>

            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                openTo="year"
                id="endDate"
                name="endDate"
                sx={styles.dateInput}
                value={
                  formik.values.endDate
                    ? dayjs(formik.values.endDate, "DD/MM/YYYY")
                    : null
                }
                format="DD/MM/YYYY"
                onChange={(date) => {
                  const setDate = date ?? null;
                  formik.setFieldValue("endDate", setDate);
                  setFilters({ ...formik.values, endDate: setDate });
                }}
                slotProps={{
                  textField: {
                    size: "small",
                    placeholder: "Select end date",
                  },
                }}
              />
            </LocalizationProvider>

            <Tooltip title="Clear end date" placement="right">
              <IconButton
                onClick={() => {
                  formik.setFieldValue("endDate", null);
                  setFilters({ ...formik.values, endDate: null });
                }}
              >
                <Backspace sx={{ color: "red" }} />
              </IconButton>
            </Tooltip>
          </Stack>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default StatsFilterComponent;
