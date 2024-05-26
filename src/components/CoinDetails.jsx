import React, { useEffect, useState } from "react";
import { server } from "../index";
import axios from "axios";
import {
  Container,
  HStack,
  Button,
  Text,
  Box,
  RadioGroup,
  Radio,
  Image,
  VStack,
  Stat,
  StatLabel,
  StatNumber,
  Badge,
  Progress,
  StatHelpText,
  StatArrow,
} from "@chakra-ui/react";
import Loader from "./Loader";
import ErrorComponent from "../components/ErrorComponent";
import { useParams } from "react-router-dom";
import Chart from "../components/Chart";

function CoinDetails() {
  const [coin, setCoin] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [currency_type, setCurrencyType] = useState("inr");
  const [days, setDays] = useState("24h");
  const [chartArray, setChartArray] = useState([]);
  const btns = ["24h", "7d", "14d", "30d", "60d", "200d", "1y", "max"];

  let currency_symbol =
    currency_type === "inr" ? `₹` : currency_type === "eur" ? `€` : `$`;

  const { params } = useParams();
  useEffect(() => {
    const fetchCoin = async () => {
      try {
        const { data } = await axios.get(`${server}/coins/${params}`);
        const { data: chartData } = await axios.get(
          `${server}/coins/${params}/market_chart?vs_currency=${currency_type}&days=${days}`
        );

        setCoin(data);
        setChartArray(chartData.prices);
        setLoading(false);
      } catch (e) {
        console.log(e);
        setError(true);
        setLoading(false);
      }
    };

    fetchCoin();
  }, [params, currency_type, days]);

  const switchChartStats = (item) => {
    switch (item) {
      case "24h":
        setDays("24h");
        setLoading(true);
        break;
      case "7d":
        setDays("7d");
        setLoading(true);
        break;
      case "14d":
        setDays("14d");
        setLoading(true);
        break;
      case "30d":
        setDays("30d");
        setLoading(true);
        break;
      case "60d":
        setDays("60d");
        setLoading(true);
        break;
      case "200d":
        setDays("200d");
        setLoading(true);
        break;
      case "1y":
        setDays("1y");
        setLoading(true);
        break;
      case "max":
        setDays("max");
        setLoading(true);
        break;
      default:
        setDays("24h");
        setLoading(true);
    }
  };

  if (error) return <ErrorComponent message={"Error Fetching Coins"} />;

  return (
    <Container maxW={"container.xl"}>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Box width={"full"} borderWidth={1}>
            <Chart
              arr={chartArray}
              currency_symbol={currency_symbol}
              days={days}
            />
          </Box>
          <HStack my={4}>
            {btns.map((item, idx) => (
              <Button onClick={(event) => switchChartStats(item)} key={idx}>
                {item}
              </Button>
            ))}
          </HStack>
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
          <VStack alignItems={"self-start"} spacing={"4"} p={"16"}>
            <Text fontSize={"small"} alignSelf={"center"} opacity={0.4}>
              Last Updated On{" "}
              {Date(coin.market_data.last_updated).split("G")[0]}
              {}
            </Text>
            {/* <HStack w={"full"} gap={8}> */}
            <Image
              src={coin.image.large}
              w={"16"}
              h={"16"}
              objectFit={"contain"}
            />
            <Stat>
              <StatLabel>{coin.name}</StatLabel>
              <StatNumber>
                {currency_symbol}
                {coin.market_data.current_price[currency_type]}
              </StatNumber>
              <StatHelpText />
              <StatArrow
                type={
                  coin.market_data.market_cap_change_percentage_24h > 0
                    ? "increase"
                    : "decrease"
                }
              />
              {coin.market_data.market_cap_change_percentage_24h}
            </Stat>
            <Badge fontSize={"2xl"}>{`#${coin.market_cap_rank}`}</Badge>
            <CustomBar
              high={`${currency_symbol}${coin.market_data.high_24h[currency_type]}`}
              low={`${currency_symbol}${coin.market_data.low_24h[currency_type]}`}
              value={coin.market_data.current_price[currency_type]}
            />
            {/* </HStack> */}
            <Box w={"full"} p={4}>
              <Item title={"Max Supply"} value={coin.market_data.max_supply} />
              <Item
                title={"Circulating Supply"}
                value={coin.market_data.circulating_supply}
              />
              <Item
                title={"Market Capital"}
                value={`${currency_symbol}${coin.market_data.market_cap[currency_type]}`}
              />
              <Item
                title={"All Time Low"}
                value={`${currency_symbol}${coin.market_data.atl[currency_type]}`}
              />
              <Item
                title={"All Time High"}
                value={`${currency_symbol}${coin.market_data.ath[currency_type]}`}
              />
            </Box>
          </VStack>
        </>
      )}
    </Container>
  );
}

const CustomBar = ({ high, low, value }) => (
  <VStack w={"full"}>
    <Progress value={value} colorScheme={"teal"} w={"full"} />
    <HStack justifyContent={"space-between"} w={"full"}>
      <Badge children={low} colorScheme={"red"} />
      <Text fontSize={"sm"}>24H Range</Text>
      <Badge children={high} colorScheme={"green"} />
    </HStack>
  </VStack>
);

const Item = ({ title, value }) => (
  <HStack justifyContent={"space-between"} w={"full"} my={"4"}>
    <Text fontFamily={"Bebas Neue"} letterSpacing={"widest"}>
      {title}
    </Text>
    <Text>{value}</Text>
  </HStack>
);

export default CoinDetails;
