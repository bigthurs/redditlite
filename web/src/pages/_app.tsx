import { ChakraProvider, ColorModeProvider } from "@chakra-ui/react";
import { withUrqlClient } from "next-urql";
import theme from "../theme";
import { Provider } from "urql";
import { createUrqlClient } from "../utils/createUrqlClient";

function MyApp({ Component, pageProps, urqlClient }: any) {
  return (
    <ChakraProvider resetCSS theme={theme}>
      <ColorModeProvider
        options={{
          useSystemColorMode: true,
        }}
      >
        <Component {...pageProps} />
      </ColorModeProvider>
    </ChakraProvider>
  );
}

export default MyApp;
