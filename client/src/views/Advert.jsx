import { cn } from "../lib/utils";
import { useParams } from "react-router-dom";
import AdvertForm from "../components/AdvertForm";

const Advert = () => {
  const { id } = useParams();

  return (
    <div
      className={cn(
        "my-8 flex size-full flex-col gap-8 md:my-16 md:bg-cds-background-secondary md:p-12",
      )}
    >
      <AdvertForm id={id === undefined ? -1 : id} />
    </div>
  );
};

export default Advert;
