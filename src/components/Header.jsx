import React, { useState } from "react";
import { HStack, Button, useStatStyles } from "@chakra-ui/react";
import { Link } from "react-router-dom";
function Header() {
  return (
    <HStack gap={4} p={4} bgColor={"black"} color={"white"}>
      <Button variant={"unstyled"}>
        <Link to="/">Home</Link>
      </Button>
      <Button variant={"unstyled"}>
        <Link to="/exchanges">Exchanges</Link>
      </Button>
      <Button variant={"unstyled"}>
        <Link to="/Coins">Coins</Link>
      </Button>
    </HStack>
  );
}

export default Header;
