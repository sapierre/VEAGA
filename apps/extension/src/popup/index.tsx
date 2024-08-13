import "@turbostarter/ui/globals";
import { Icons } from "@turbostarter/ui";

import "~styles/globals.css";

const Popup = () => {
  return (
    <div className="font-sans">
      <h1 className="p-10 text-destructive">Hellosss World</h1>
      <Icons.Logo className="w-10 text-primary" />
    </div>
  );
};

export default Popup;
