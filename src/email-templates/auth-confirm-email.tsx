import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text,
} from "@react-email/components";
import * as React from "react";

interface LinearLoginCodeEmailProps {
  validationCode?: string;
}

export default function LinearLoginCodeEmail({
  validationCode,
}: LinearLoginCodeEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>Welcome!</Preview>
      <Body style={main}>
        <Container style={container}>
          <Img
            src={`/blog.svg`}
            width="42"
            height="42"
            alt="Linear"
            style={logo}
          />
          <Heading style={heading}>Seu código para nosso blogDev</Heading>
          <Section style={buttonContainer}>
            <Button
              className="py-2 px-4"
              style={button}
              href="https://blog-prisma-gray.vercel.app/"
            >
              Login
            </Button>
          </Section>
          <Text style={paragraph}>
            Abaixo está o código seu código de verificação. Pode copiar e colar
            no seu navegador.
          </Text>
          <code style={code}>{validationCode}</code>
          <Hr style={hr} />
          <Link href="https://blog-prisma-gray.vercel.app/" style={reportLink}>
            ThiagoDev
          </Link>
        </Container>
      </Body>
    </Html>
  );
}

const logo = {
  borderRadius: 21,
  width: 42,
  height: 42,
};

const main = {
  backgroundColor: "#ffffff",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const container = {
  margin: "0 auto",
  padding: "20px 0 48px",
  width: "560px",
};

const heading = {
  fontSize: "24px",
  letterSpacing: "-0.5px",
  lineHeight: "1.3",
  fontWeight: "400",
  color: "#484848",
  padding: "17px 0 0",
};

const paragraph = {
  margin: "0 0 15px",
  fontSize: "15px",
  lineHeight: "1.4",
  color: "#3c4149",
};

const buttonContainer = {
  padding: "27px 0 27px",
};

const button = {
  backgroundColor: "#5e6ad2",
  borderRadius: "3px",
  fontWeight: "600",
  color: "#fff",
  fontSize: "15px",
  textDecoration: "none",
  textAlign: "center" as const,
  display: "block",
};

const reportLink = {
  fontSize: "14px",
  color: "#b4becc",
};

const hr = {
  borderColor: "#dfe1e4",
  margin: "42px 0 26px",
};

const code = {
  fontFamily: "monospace",
  fontWeight: "700",
  padding: "1px 4px",
  backgroundColor: "#dfe1e4",
  letterSpacing: "-0.3px",
  fontSize: "21px",
  borderRadius: "4px",
  color: "#3c4149",
};
