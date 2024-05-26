import { Alert, AlertIcon, Container } from "@chakra-ui/react";
import React from "react";

function ErrorComponent({ message }) {
  return (
    <Container minW={"container.xl"}>
      <Alert
        status="error"
        position={"fixed"}
        bottom={"4"}
        left={"50%"}
        transform={"translateX(-50%)"}
        w={"50%"}
      >
        <AlertIcon />
        {message}
      </Alert>
    </Container>
  );
}

export default ErrorComponent;
