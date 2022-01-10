import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { useState } from "react";
import useSWR from "swr";
import Fetcher from "../components/Fetcher";
import Notification from "react-web-notification";
import { Box, Button, Text, Heading, Container, Flex } from "theme-ui";
import { NextSeo } from "next-seo";

export default function Home() {
  return (
    <Container>
      <Head>
        <link rel="icon" href="/lft-icon.jpg" />
      </Head>
      <NextSeo
        title="LFT Notifications | lft.tk.gg"
        description="A minimal app to notify you when LFTs are available on the NHS home delivery scheme"
        twitter={{
          site: "@MattieTK",
        }}
        openGraph={{
          type: "website",
          locale: "en_GB",
          url: "https://lft.tk.gg",
          site_name: "LFT Notifications",
          images: [
            {
              url: "https://lft.tk.gg/lft.png",
              width: 256,
              height: 240,
              alt: "LFT Notifications",
            },
          ],
        }}
      />

      <Flex
        sx={{
          minHeight: "100vh",
          padding: "4rem 0",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            maxWidth: "50%",
            maxHeight: "10%",
            display: "block",
          }}
        >
          <Image
            src="/lft.png"
            width={256}
            height={240}
            alt="Lateral Flow Test (as drawn by me!)"
            layout="intrinsic"
          />
        </Box>
        <Heading as="h1" sx={{ fontSize: [6, 7, 8] }}>
          LFT Notifications
        </Heading>

        <Text sx={{ padding: [4, 5], fontSize: [4, 5], textAlign: "center" }}>
          Leave the window open, and get a notification when LFTs are available
          again.
        </Text>
        <Fetcher />
      </Flex>
    </Container>
  );
}
