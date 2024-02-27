// import { Box, useStyleConfig} from '@chakra-ui/react';

import { useStyleConfig, chakra } from "@chakra-ui/react";
import { forwardRef } from "@chakra-ui/react";
import { CustomCardProps } from "../../../app/theme/theme";

const CustomCard = forwardRef<CustomCardProps, "div">((props, ref) => {
  const { size, variant, ...rest } = props;
  const styles = useStyleConfig("Card", { size, variant });

  return <chakra.div ref={ref} __css={styles} {...rest} />;
});

export default CustomCard;
