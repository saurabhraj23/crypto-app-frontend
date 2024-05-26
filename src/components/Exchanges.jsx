import React, { useEffect, useState } from "react";
import { server } from "../index";
import axios from "axios";
import {
  Container,
  HStack,
  VStack,
  Image,
  Heading,
  Text,
} from "@chakra-ui/react";
import Loader from "./Loader";
import ErrorComponent from "../components/ErrorComponent";
import { transform } from "framer-motion";

function Exchanges() {
  const [exchanges, setExchanges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const Exchanges = async () => {
      try {
        const { data } = await axios.get(`${server}/exchanges`);
        console.log(data);
        setExchanges(data);
        setLoading(false);
      } catch (e) {
        console.log(e);
        setError(true);
        setLoading(false);
      }
    };

    Exchanges();
  }, []);

  if (error) return <ErrorComponent />;

  return (
    <Container maxW={"container.xl"}>
      {loading ? (
        <Loader />
      ) : (
        <>
          <HStack wrap={"wrap"} justifyContent={"space-around"}>
            {exchanges.map((item, idx) => (
              <ExchangeCard
                key={idx}
                name={item.name}
                rank={item.rank}
                img={item.image}
                url={item.url}
              />
            ))}
          </HStack>
        </>
      )}
    </Container>
  );
}

const ExchangeCard = ({ name, rank, url, img }) => (
  <a href={url} target="blank">
    <VStack
      w={"52"}
      p={"8"}
      shadow={"lg"}
      borderRadius={"lg"}
      transition={"all 0.2s"}
      m={"4"}
      css={{
        "&:hover": { transform: "scale(1.1) translateY(1rem)" },
      }}
    >
      <Image src={img} w={10} h={10} objectFit={"contain"} alt="exchanges" />
      <Heading size={"md"} noOfLines={1}>
        {rank}
      </Heading>
      <Text noOfLines={1}>{name}</Text>
    </VStack>
  </a>
);

export default Exchanges;
