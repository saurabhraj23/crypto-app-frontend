import React from "react";
import { Box, VStack, Text, Avatar, Stack } from "@chakra-ui/react";
function Footer() {
  return (
    <Box
      bgColor={"blackAlpha.900"}
      color={"white"}
      px={"8"}
      py={["2", "8"]}
      h={"12vh"}
    >
      <Stack direction={["column", "row"]} h={"full"} alignItems={"center"}>
        <VStack alignItems={["center", "flex-start"]} w={"full"}>
          <Text fontWeight={"bold"}>About Us</Text>
          <Text
            fontWeight={"thin"}
            letterSpacing={"widest"}
            fontSize={"sm"}
            textAlign={["center", "left"]}
          >
            We are thr crypto trading app in INDIA.Please visit our site for
            trading in crypto exchanges and coins.
          </Text>
        </VStack>
        <VStack>
          <Avatar mt={["4", "0"]} boxSize={10} />
          <Text>FOUNDER</Text>
        </VStack>
      </Stack>
    </Box>
  );
}
export default Footer;
