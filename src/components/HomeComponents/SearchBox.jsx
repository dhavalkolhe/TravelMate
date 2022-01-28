import React, { useContext } from "react";
import { Link } from "react-router-dom";
import "./HomeComponents.css";

import locationIcon from "../../resources/icons/locationIcon.svg";
import destinationIcon from "../../resources/icons/destinationIcon.svg";
import dateIcon from "../../resources/icons/dateIcon.svg";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { SearchContext } from "../../context/searchContext";
import city from "../../resources/states.json";

import {
  Box,
  Stack,
  Button,
  Typography,
  FormControl,
  TextField,
  createFilterOptions,
  Autocomplete,
  InputAdornment,
  IconButton,
  useAutocomplete,
} from "@mui/material";

import DatePicker from "@mui/lab/DatePicker";

export function SearchBox() {
  const [search, setSearch] = useContext(SearchContext);
  const OPTIONS_LIMIT = 3;
  const filterOptions = createFilterOptions({
    limit: OPTIONS_LIMIT,
  });
  return (
    <Stack
      direction="column"
      spacing={4}
      sx={{
        backgroundColor: "#DFDFF0",
        borderRadius: "10px",
        width: "fit-content",
        minWidth: "315px",
        height: "fit-content",
        padding: "1rem",
        alignItems: "flex-start",
        justifyContent: "center",
      }}
    >
      <Stack direction="column" spacing={4} width="100%">
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
              {/* <TextField
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
              /> */}
              <Autocomplete
                value={search.currentCity}
                filterOptions={filterOptions}
                // id="country-select-demo"
                sx={{
                  width: "190px",
                  backgroundColor: "white",
                  "& >div": {
                    padding: "0px",
                  },
                }}
                options={city}
                autoHighlight
                disableClearable
                freeSolo
                getOptionLabel={(option) => option.name || search.currentCity}
                onChange={(event, value) => {
                  let selectedCity = value.name.concat(", ", value.state);
                  setSearch((prev) => {
                    return {
                      ...prev,
                      currentCity: selectedCity,
                    };
                  });
                }}
                renderOption={(props, option) => (
                  <Box
                    component="li"
                    sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
                    {...props}
                  >
                    {option.name}, {option.state}
                  </Box>
                )}
                renderInput={(params) => {
                  console.log(params);
                  return (
                    <TextField
                      size="small"
                      {...params}
                      // label="Enter Location"
                      placeholder="Enter Location"
                      //logic to update state when city is not in list
                      onChange={(event, value) => {
                        setSearch((prev) => {
                          return {
                            ...prev,
                            currentCity: event.target.value,
                          };
                        });
                      }}
                      InputProps={{
                        ...params.inputProps,
                        autoComplete: "off",
                        startAdornment: (
                          <InputAdornment position="start">
                            <IconButton edge="start">
                              <img src={locationIcon} alt={"logo"} />
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                  );
                }}
              />
            </Box>

            {/* <Box>
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
            </Box> */}

            <Box className="location-container mr">
              <Typography class="subtitle1 location-subtitle">
                Destination
              </Typography>
              <Autocomplete
                value={search.destinationCity}
                filterOptions={filterOptions}
                sx={{ width: "190px", backgroundColor: "white" }}
                options={city}
                autoHighlight
                disableClearable
                freeSolo
                getOptionLabel={(option) =>
                  option.name || search.destinationCity
                }
                onChange={(event, value) => {
                  // console.log(value);
                  let selectedCity = value.name.concat(", ", value.state);
                  setSearch((prev) => {
                    return {
                      ...prev,
                      destinationCity: selectedCity,
                    };
                  });
                }}
                renderOption={(props, option) => (
                  <Box
                    component="li"
                    sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
                    {...props}
                  >
                    {option.name}, {option.state}
                  </Box>
                )}
                renderInput={(params) => (
                  <TextField
                    size="small"
                    {...params}
                    placeholder="Enter Location"
                    // label="Enter Location"
                    //logic to update state when city is not in list
                    onChange={(event, value) => {
                      setSearch((prev) => {
                        return {
                          ...prev,
                          destinationCity: event.target.value,
                        };
                      });
                    }}
                    InputProps={{
                      ...params.inputProps,
                      autoComplete: "off",
                      startAdornment: (
                        <InputAdornment position="start">
                          <IconButton edge="start">
                            <img src={destinationIcon} alt={"logo"} />
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                )}
              />
            </Box>

            <Box className="mr b-rad">
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
                value={search.date}
                onChange={(newValue) => {
                  setSearch((prev) => {
                    return {
                      ...prev,
                      date: newValue,
                    };
                  });
                }}
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

            <Link to="/search">
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
