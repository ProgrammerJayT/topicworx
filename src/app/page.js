"use client";

import { useEffect, useMemo, useState } from "react";
import { Box, Button, Divider, Paper, Stack, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import dayjs from "dayjs";
import { getStyles } from "./styles";
import StatsFilterComponent from "../components/filters/statistics";
import TableComponent from "../components/table";
import { readStatistics } from "@/utils/api/statistics";
import StatisticsLineChartComponent from "@/components/charts/statistics/line";
import { usePathname } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { useAppContext } from "@/context/app";

const HomePage = () => {
  const { setLoader } = useAppContext();
  const styles = getStyles();
  const [data, setData] = useState([]);
  const [visualizer, setVisualizer] = useState("graph");
  const [filters, setFilters] = useState({ startDate: null, endDate: null });

  const pathname = usePathname();

  const statistics = useQuery({
    queryKey: ["statistics"],
    queryFn: readStatistics,
    enabled: !!pathname,
  });

  useEffect(() => {
    if (statistics.isLoading) {
      console.log("Loading statistics...");
    }
    if (statistics.error) {
      console.error("Error loading statistics:", statistics.error);
    }
    if (statistics.data) {
      setData(statistics.data);
    }
  }, [statistics]);

  useEffect(() => {
    if (statistics.isLoading) {
      setLoader((prev) => ({ ...prev, visibility: true }));
    } else {
      setLoader((prev) => ({ ...prev, visibility: false }));
    }

    if (statistics.error) {
      console.error("Error loading statistics:", statistics.error);
    }

    if (statistics.data) {
      setData(statistics.data);
    }
  }, [statistics.isLoading, statistics.error, statistics.data, setLoader]);

  // ** Filter data based on selected date range **
  const filteredData = useMemo(() => {
    if (!filters.startDate && !filters.endDate) return data;

    return data.filter((item) => {
      const itemDate = dayjs(item.Date, "YYYY/MM/DD");
      const startDate = filters.startDate
        ? dayjs(filters.startDate, "YYYY/MM/DD")
        : null;
      const endDate = filters.endDate
        ? dayjs(filters.endDate, "YYYY/MM/DD")
        : null;

      return (
        (!startDate ||
          itemDate.isAfter(startDate) ||
          itemDate.isSame(startDate)) &&
        (!endDate || itemDate.isBefore(endDate) || itemDate.isSame(endDate))
      );
    });
  }, [data, filters]);

  if (statistics.error) {
    return <div>Error loading statistics</div>;
  }

  return (
    <Box sx={styles.container}>
      <Box sx={styles.content}>
        <Typography variant="h2" sx={styles.topHeader}>
          Covid-19 Statistics
        </Typography>

        <Grid container spacing={2} sx={{ width: "100%", height: "100%" }}>
          {/* Filter Section */}
          <Grid size={{ xs: 12, md: 4 }}>
            <Grid container spacing={5}>
              <Grid size={12}>
                <Stack sx={{ mx: 1 }} spacing={2}>
                  <Typography variant="h5" sx={{ color: "gray" }}>
                    Filters
                  </Typography>
                  <Divider />

                  {/* Pass setFilters to the filter component */}
                  <StatsFilterComponent setFilters={setFilters} />
                </Stack>
              </Grid>

              <Grid size={12}>
                <Stack sx={{ mx: 1 }} spacing={2}>
                  <Typography variant="h5" sx={{ color: "gray" }}>
                    Visualizer
                  </Typography>
                  <Divider />
                </Stack>
                <Paper sx={styles.visualizerButtonsContainer} elevation={20}>
                  <Stack direction={"row"}>
                    <Button
                      onClick={() => {
                        if (visualizer !== "graph") setVisualizer("graph");
                      }}
                      sx={[
                        styles.graphButton,
                        {
                          color: visualizer === "graph" ? "white" : "green",
                          bgcolor: visualizer === "graph" ? "green" : "white",
                        },
                      ]}
                      size="large"
                    >
                      Graph
                    </Button>

                    <Button
                      onClick={() => {
                        if (visualizer !== "table") setVisualizer("table");
                      }}
                      sx={[
                        styles.tableButton,
                        {
                          color: visualizer === "table" ? "white" : "green",
                          bgcolor: visualizer === "table" ? "green" : "white",
                        },
                      ]}
                      size="large"
                    >
                      Table
                    </Button>
                  </Stack>
                </Paper>
              </Grid>
            </Grid>
          </Grid>

          {/* Chart Section */}
          <Grid size={{ xs: 12, md: 8 }}>
            <Box
              sx={{
                width: "100%",
                height: "100%",
                px: 5,
              }}
            >
              {filteredData.length > 0 ? (
                visualizer === "graph" ? (
                  <StatisticsLineChartComponent data={filteredData} />
                ) : (
                  <TableComponent data={filteredData} />
                )
              ) : (
                <Box sx={styles.noDataContainer}>
                  <Typography variant="h4">
                    No data available for the selected date range.
                  </Typography>
                </Box>
              )}
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default HomePage;
