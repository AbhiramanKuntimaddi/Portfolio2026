import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Link,
  Preview,
  Section,
  Text,
  Tailwind,
} from "@react-email/components";

interface ContactEmailProps {
  name: string;
  email: string;
  message: string;
}

export const ContactEmail = ({ name, email, message }: ContactEmailProps) => {
  return (
    <Html>
      <Head />
      <Preview>
        {"// new message from "}
        {name}
      </Preview>
      <Tailwind
        config={{
          theme: {
            extend: {
              colors: {
                background: "#040811",
                surface: "#0a1120",
                foreground: "#dcdee2",
                muted: "#6b7486",
                line: "#1b2336",
                accent: "#1b54ff",
              },
            },
          },
        }}
      >
        <Body className="bg-background font-sans m-0 py-10 px-4 text-foreground">
          <Container className="max-w-140 mx-auto bg-surface border border-line rounded-xl overflow-hidden">
            <Section className="bg-background px-6 py-3.5 border-b border-line">
              <table
                width="100%"
                cellPadding={0}
                cellSpacing={0}
                role="presentation"
              >
                <tr>
                  <td align="left">
                    <span className="inline-block w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
                    <span className="inline-block w-2.5 h-2.5 rounded-full bg-[#febc2e] ml-2" />
                    <span className="inline-block w-2.5 h-2.5 rounded-full bg-[#28c840] ml-2" />
                  </td>
                  <td align="right">
                    <Text className="text-[11px] font-mono text-muted tracking-wider m-0">
                      ~/inbox/contact
                    </Text>
                  </td>
                </tr>
              </table>
            </Section>

            <Section className="px-8 pt-9 pb-8">
              <Text className="text-accent text-[12px] font-mono tracking-[0.25em] m-0 mb-5">
                {"// new transmission"}
              </Text>

              <Heading className="text-[40px] leading-[0.95] font-bold tracking-tight text-foreground uppercase m-0">
                Message
              </Heading>
              <Heading className="text-[40px] leading-[0.95] font-bold tracking-tight text-accent uppercase m-0">
                Received.
              </Heading>

              <table
                width="100%"
                cellPadding={0}
                cellSpacing={0}
                role="presentation"
                className="mt-9"
              >
                <tr>
                  <td className="pb-5">
                    <Text className="text-[11px] text-muted font-mono tracking-wider m-0 lowercase">
                      const from
                    </Text>
                    <Text className="text-[17px] text-foreground font-semibold m-0 mt-1">
                      {name}
                    </Text>
                  </td>
                </tr>
                <tr>
                  <td className="pb-5 border-t border-line pt-5">
                    <Text className="text-[11px] text-muted font-mono tracking-wider m-0 lowercase">
                      const reply_to
                    </Text>
                    <Link
                      href={`mailto:${email}`}
                      className="text-[17px] text-accent font-semibold m-0 mt-1 inline-block no-underline"
                    >
                      {email}
                    </Link>
                  </td>
                </tr>
              </table>

              <Text className="text-[11px] text-muted font-mono tracking-wider m-0 mt-3 mb-3 lowercase">
                {"// message"}
              </Text>
              <Section className="bg-background border border-line rounded-lg px-6 py-5">
                <Text className="text-[15px] text-foreground leading-relaxed m-0 whitespace-pre-wrap">
                  {message}
                </Text>
              </Section>

              <Section className="text-center mt-7">
                <Link
                  href={`mailto:${email}?subject=Re%3A%20your%20message`}
                  className="inline-block bg-accent text-white text-[13px] font-mono tracking-wide font-semibold no-underline rounded-md px-6 py-3"
                >
                  reply()
                </Link>
              </Section>
            </Section>

            <Hr className="border-line m-0" />

            <Section className="px-8 py-5">
              <table
                width="100%"
                cellPadding={0}
                cellSpacing={0}
                role="presentation"
              >
                <tr>
                  <td align="left">
                    <Text className="text-[11px] font-mono text-muted m-0 tracking-wide">
                      <span className="text-accent/70">{"// "}</span>
                      sent from akport.dev
                    </Text>
                  </td>
                  <td align="right">
                    <Text className="text-[11px] font-mono text-[#28c840] m-0 tracking-wide">
                      ● delivered
                    </Text>
                  </td>
                </tr>
              </table>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default ContactEmail;
