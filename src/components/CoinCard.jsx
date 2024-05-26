import React from "react";
import { VStack, Text, Image } from "@chakra-ui/react";
import { Link } from "react-router-dom";
function CoinCard({ name, id, img, price, symbol, currency_type }) {
  return (
    <>
      <Link to={`/coins/${id}`}>
        <VStack
          shadow={"md"}
          borderRadius={"lg"}
          w={"52"}
          p={"8"}
          m={4}
          transition={"all 0.4s"}
          css={{
            "&:hover": {
              transform: "scale(1.1) translateY(1rem)",
            },
            "&:hover .rotate": {
              transform: "rotate(40deg)",
            },
          }}
        >
          <Image
            className="rotate"
            w={10}
            h={10}
            objectFit={"contain"}
            src={img}
            alt="coins"
            transition={"all 0.4s"}
          />
          <Text fontWeight={600} noOfLines={1}>
            {name}
          </Text>
          <Text>{symbol}</Text>
          <Text>
            {currency_type === "inr"
              ? `₹ ${price}`
              : currency_type === "eur"
              ? `€ ${price}`
              : `$ ${price}`}
          </Text>
        </VStack>
      </Link>
    </>
  );
}

export default CoinCard;
