import Image from "next/image";
import Section from "./_components/Section";
import LayananUnggulan from "./_components/LayananUnggulan";
import FasilitasLayanan from "./_components/FasilitasLayanan";

export default function Home() {
  return (
    <div>
      <Section />
      <LayananUnggulan />
      <FasilitasLayanan />
    </div>
  );
}
