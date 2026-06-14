import { IconType } from "react-icons";
import { FaLinkedinIn, FaGithub, FaInstagram } from "react-icons/fa6";
import { FiMail } from "react-icons/fi";

export interface FormData {
  name: string;
  email: string;
  message: string;
}

export interface ChannelItem {
  label: string;
  value: string;
  href: string;
  external: boolean;
  Icon: IconType;
}

export const channels: ChannelItem[] = [
  {
    label: "LinkedIn",
    value: "abhiraman-kuntimaddi",
    href: "https://www.linkedin.com/in/abhiraman-kuntimaddi-93b037112",
    external: true,
    Icon: FaLinkedinIn,
  },
  {
    label: "GitHub",
    value: "AbhiramanKuntimaddi",
    href: "https://github.com/AbhiramanKuntimaddi",
    external: true,
    Icon: FaGithub,
  },
  {
    label: "Instagram",
    value: "@abhiraman.kuntimaddi",
    href: "https://www.instagram.com/abhiraman.kuntimaddi/",
    external: true,
    Icon: FaInstagram,
  },
  {
    label: "Email",
    value: "abhiraman21696@gmail.com",
    href: "mailto:abhiraman21696@gmail.com",
    external: false,
    Icon: FiMail,
  },
];