import { Message, onMessage } from "~/lib/messaging";

const getMessage = (filename: string) => {
  return `Edit ${filename} and save to reload.`;
};

onMessage(Message.HELLO, ({ data }) => getMessage(data));
