import React from "react";
import { Link } from "react-router-dom";
import "./HomeComponents.css";

import locationIcon from "../../resources/icons/locationIcon.svg";
import destinationIcon from "../../resources/icons/destinationIcon.svg";
// import dateIcon from "../../resources/icons/dateIcon.svg";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";

import {
  Box,
  Stack,
  Button,
  Typography,
  FormControl,
  TextField,
  InputAdornment,
  IconButton,
} from "@mui/material";
import DatePicker from "@mui/lab/DatePicker";

export function SearchBox() {
  return (
    <Stack
      direction="column"
      spacing={4}
      sx={{
        backgroundColor: "#DFDFF0",
        borderRadius: "10px",
        width: "fit-content",
        height: "fit-content",
        padding: "1rem",
        alignItems: "flex-start",
        justifyContent: "center",
      }}
    >
      <Stack direction="column" spacing={4}>
        <FormControl variant="outlined" sx={{ zIndex: "1" }}>
          <Stack
            direction={{
              xs: "column",
              md: "row",
            }}
            spacing={2}
            alignItems={{
              xs: "flex-start",
              md: "flex-end",
            }}
            sx={{ flexWrap: "wrap" }}
          >
            <Box>
              <Typography class="subtitle1">Traveling from</Typography>
              <TextField
                size="small"
                placeholder="Enter Location"
                sx={{
                  width: "190px",
                  backgroundColor: "white",
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <IconButton edge="start">
                        <img src={locationIcon} alt={"logo"} />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Box>

            <Box>
              <Typography class="subtitle1">Destination</Typography>
              <TextField
                size="small"
                placeholder="Enter Location"
                sx={{
                  width: "190px",
                  backgroundColor: "white",
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <IconButton edge="start">
                        <img src={destinationIcon} alt={"logo"} />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Box>
            <Box>
              <Typography class="subtitle1">Date</Typography>
              {/* <TextField
                size="small"
                placeholder="DD-MM-YYYY"
                sx={{
                  width: "160px",
                  backgroundColor: "white",
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <IconButton edge="start">
                        <img src={dateIcon} alt={"logo"} />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              /> */}

              <DatePicker
                openTo="day"
                views={["month", "day"]}
                // value={value}
                // onChange={(newValue) => {
                //   setValue(newValue);
                // }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    size="small"
                    // placeholder="DD-MM-YYYY"
                    sx={{
                      width: "160px",
                      backgroundColor: "white",
                    }}
                    // InputProps={{
                    //   startAdornment: (
                    //     <InputAdornment position="start">
                    //       <IconButton edge="start">
                    //         <img src={dateIcon} alt={"logo"} />
                    //       </IconButton>
                    //     </InputAdornment>
                    //   ),
                    // }}
                  />
                )}
              />
            </Box>

            <Link to="/searchRequests">
              <Button
                variant="contained"
                startIcon={<SearchOutlinedIcon />}
                sx={{
                  backgroundColor: "#001963",
                  "&:hover": {
                    backgroundColor: "#062580",
                  },
                  height: "40px",
                  width: "150px",
                }}
              >
                Search
              </Button>
            </Link>
          </Stack>
        </FormControl>

        <Box display="flex" justifyContent="space-between">
          <Typography class="redText">Add request</Typography>
          <Typography class="redText">
            <u>Help?!</u>
          </Typography>
        </Box>
      </Stack>
    </Stack>
  );
}
