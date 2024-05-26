import React, { useEffect, useState } from "react";
import { server } from "../index";
import axios from "axios";
import { Container, HStack, RadioGroup, Radio, Button } from "@chakra-ui/react";
import Loader from "./Loader";
import ErrorComponent from "../components/ErrorComponent";
import CoinCard from "../components/CoinCard";

function Coins() {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [currency_type, setCurrencyType] = useState("inr");
  const [page, setPage] = useState(1);
  const btn = new Array(36).fill(1);
  useEffect(() => {
    const fetchCoins = async () => {
      try {
        const { data } = await axios.get(
          `${server}/coins/markets?vs_currency=${currency_type}&page=${page}&per_page=100`
        );
        console.log(data);
        setCoins(data);
        setLoading(false);
      } catch (e) {
        console.log(e);
        setError(true);
        setLoading(false);
      }
    };

    fetchCoins();
  }, [currency_type, page]);

  if (error) return <ErrorComponent message={"Error Fetching Coins"} />;

  return (
    <Container maxW={"container.xl"}>
      <RadioGroup
        defaultValue={currency_type}
        onChange={setCurrencyType}
        margin={4}
      >
        <Radio value="inr">INR</Radio>
        <Radio mx={6} value="usd">
          USD
        </Radio>
        <Radio value="eur">EUR</Radio>
      </RadioGroup>
      {loading ? (
        <Loader />
      ) : (
        <>
          <HStack wrap={"wrap"} justifyContent={"space-evenly"}>
            {coins.map((item, idx) => (
              <CoinCard
                id={item.id}
                key={idx}
                name={item.name}
                symbol={item.symbol}
                img={item.image}
                price={item.current_price}
                currency_type={currency_type}
              />
            ))}
          </HStack>
          {btn.map((i, idx) => (
            <Button
              w={4}
              // borderRadius={20}
              bgColor={"blackAlpha.900"}
              onClick={(e) => setPage(idx + 1)}
              margin={1}
              color={"whiteAlpha.900"}
              _hover={{
                bg: "white",
                color: "black",
                shadow: "lg",
                transform: " translateY(-0.2rem)",
              }}
            >
              {idx}
            </Button>
          ))}
        </>
      )}
    </Container>
  );
}

export default Coins;
