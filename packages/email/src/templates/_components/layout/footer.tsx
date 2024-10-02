import { Img, Link, Text } from "@react-email/components";

interface FooterProps {
  readonly siteUrl: string;
}

export const Footer = ({ siteUrl }: FooterProps) => {
  return (
    <>
      <Img
        src={`${siteUrl}/images/logo.png`}
        alt="Turbostarter Logo"
        height={45}
        className="mt-12"
      />
      <Text className="max-w-[250px] leading-normal text-muted-foreground">
        <Link
          href="https://turbostarter.dev"
          className="text-muted-foreground"
          style={{ textDecoration: "underline" }}
        >
          TurboStarter.
        </Link>{" "}
        Ship your startup everywhere. In minutes.
      </Text>
    </>
  );
};
