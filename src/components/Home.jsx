import React from "react";
import { Box, Image, Text } from "@chakra-ui/react";
import img from "../assets/btc.png";
import { motion } from "framer-motion";
function Home() {
  return (
    <Box w={"100%"} h={"81vh"} bgColor={"blackAlpha.900"}>
      <motion.div
        style={{ height: " 80vh" }}
        animate={{ translateY: "20px" }}
        transition={{
          duration: 2,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      >
        <Image
          w={"full"}
          h={"full"}
          filter={"grayscale(1)"}
          src={img}
          objectFit={"contain"}
        ></Image>
      </motion.div>
      <Text
        textAlign={"center"}
        fontWeight={"thin"}
        fontSize={"6xl"}
        top={-20}
        letterSpacing={"widest"}
        color={"whiteAlpha.800"}
        mt={"-4rem"}
      >
        CryptoBox
      </Text>
    </Box>
  );
}

export default Home;
