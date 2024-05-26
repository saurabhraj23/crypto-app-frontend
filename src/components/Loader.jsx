import React from "react";
import { Container, Stack, Spinner } from "@chakra-ui/react";

export default function Loader() {
  return (
    <>
      <Container
        maxW={"container.xl"}
        h={"100vh"}
        justifyContent={"center"}
        alignItems={"center"}
        display={"flex"}
      >
        <Stack>
          <Spinner
            thickness="6px"
            speed="0.65s"
            emptyColor="gray.200"
            color="blue.500"
            // size="xl"
            w={"6rem"}
            h={"6rem"}
          />
        </Stack>
      </Container>
    </>
  );
}
