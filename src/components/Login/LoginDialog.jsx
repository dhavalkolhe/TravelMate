import React from "react";

import { Dialog } from "@mui/material";

import { LoginCard } from "./";

export function LoginDialog() {
  return (
    <>
      <Dialog>
        <LoginCard />
      </Dialog>
    </>
  );
}
