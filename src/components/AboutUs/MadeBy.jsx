import React from "react";
import { Link } from "react-router-dom";

import { Box, Stack, Typography } from "@mui/material";

import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";

import avatar1 from "../../resources/images/avatar1.png";
import avatar2 from "../../resources/images/avatar2.png";

export function MadeBy() {
  const Person = ({ image, pname, contribution, linkedin, github }) => {
    return (
      <Stack
        direction="column"
        spacing={1}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box>
          <img src={image} alt={pname} />
        </Box>

        <Stack
          direction="column"
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography variant="h4">{pname}</Typography>
          <Typography variant="subtitle1">{contribution}</Typography>
        </Stack>

        <Stack direction="row" spacing={4}>
          <a href={linkedin} target="_blank" rel="noopener noreferrer">
            <LinkedInIcon fontSize="large" />
          </a>
          <a href={github} target="_blank" rel="noopener noreferrer">
            <GitHubIcon fontSize="large" />
          </a>
        </Stack>
      </Stack>
    );
  };

  return (
    <>
      <Stack direction="column" spacing={4} sx={{ width: "100%" }}>
        <Stack
          direction="row"
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
          }}
        >
          <Typography variant="h3">Made By</Typography>
          <Typography variant="subtitle1" color="#F03E51" component={Link}>
            <u>travelmateVIT.com</u>
          </Typography>
        </Stack>

        <Stack
          direction="row"
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          <Person
            image={avatar1}
            pname="Anushka"
            contribution="Development"
            linkedin="https://www.linkedin.com/in/kumari-anushka-1410"
            github="https://github.com/anuxoxo"
          />
          <Person
            image={avatar2}
            pname="Dhaval"
            contribution="Development"
            linkedin="https://www.linkedin.com/in/dhaval-kolhe"
            github="https://github.com/dhavalkolhe"
          />

          <Person
            image={avatar1}
            pname="Monalisa"
            contribution="Design"
            linkedin="https://www.linkedin.com/in/monalisa-maiti-4b789b1b8"
            github="https://github.com/monalisamaiti"
          />

          <Person
            image={avatar2}
            pname="Vansh"
            contribution="Design & Development"
            linkedin="https://www.linkedin.com/in/vansh-chinda-310884189/"
            github="https://github.com/vanshchinda"
          />
        </Stack>
      </Stack>
    </>
  );
}
