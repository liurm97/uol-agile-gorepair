// Chakra imports
import { Box, Flex, Text, useColorModeValue } from "@chakra-ui/react";
import Card from "../../../../../components/components/card/Card";
import { NextAvatar } from "../../../../../components/components/image/Avatar";

export default function Banner(props: {
  banner: string;
  avatar: string;
  name: string;
  job: string;
  email: string;
  [x: string]: any;
}) {
  const { banner, avatar, name, job, email, ...rest } = props;
  // Chakra Color Mode
  const textColorPrimary = useColorModeValue("secondaryGray.900", "white");
  const textColorSecondary = "gray.400";
  const borderColor = useColorModeValue(
    "white !important",
    "#111C44 !important"
  );
  return (
    <Card mb={{ base: "0px", lg: "20px" }} alignItems="center" {...rest}>
      <Box
        bg={`url(${banner})`}
        bgSize="cover"
        borderRadius="16px"
        h="131px"
        w="100%"
      />
      <NextAvatar
        mx="auto"
        src={avatar}
        h="87px"
        w="87px"
        mt="-43px"
        border="4px solid"
        borderColor={borderColor}
      />
      <Text color={textColorPrimary} fontWeight="bold" fontSize="xl" mt="10px">
        {name}
      </Text>
      <Text color={textColorSecondary} fontSize="sm">
        {job}
      </Text>
      <Flex w="max-content" mx="auto" mt="26px">
        <Flex mx="auto" alignItems="center" flexDirection="column">
          <Text color={textColorPrimary} fontWeight="bold" fontSize="xl">
            {email}
          </Text>
          <Text color={textColorSecondary} fontSize="sm" fontWeight="400">
            Email
          </Text>
        </Flex>
      </Flex>
    </Card>
  );
}
