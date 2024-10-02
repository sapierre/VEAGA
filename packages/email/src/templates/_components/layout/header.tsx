import { Img } from "@react-email/components";

interface HeaderProps {
  readonly siteUrl: string;
}

export const Header = ({ siteUrl }: HeaderProps) => {
  return (
    <Img
      src={`${siteUrl}/images/logo-text.png`}
      alt="Turbostarter Logo"
      className="mb-10"
      height={45}
    />
  );
};
