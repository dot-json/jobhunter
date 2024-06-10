import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Button,
  StructuredListWrapper,
  StructuredListRow,
  StructuredListCell,
  StructuredListBody,
  Loading,
} from "@carbon/react";
import { Pen } from "@carbon/icons-react";
import { cn } from "../lib/utils";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { notify } from "../lib/utils";
import { HUF } from "../lib/utils";

const Job = () => {
  const navigate = useNavigate();
  const [ad, setAd] = useState({});
  const { id } = useParams();
  const { adverts, isLoading, error } = useSelector((state) => state.adverts);
  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    if (adverts.length > 0) {
      const ad = adverts.find((ad) => ad.id === parseInt(id));
      if (ad === undefined) {
        notify("Az álláshirdetés nem található!", "error");
        navigate("/");
        return;
      }
      setAd(ad);
    }
  }, [adverts.length]);

  if (adverts.length === 0 || isLoading) {
    return <Loading />;
  }

  return (
    <div
      className={cn(
        "my-8 flex size-full flex-col gap-8 bg-cds-background-secondary p-12 md:my-16",
      )}
    >
      <div className={cn("grid grid-cols-[1fr_auto]")}>
        <div className={cn("flex flex-col gap-1")}>
          <h1 className={cn("text-2xl font-bold")}>{ad.company}</h1>
          <p>Megtetszett a lehetőség? Jelentkezz!</p>
        </div>
        {user.role === "jobseeker" && (
          <Button
            size="md"
            kind="primary"
            className={cn("flex items-center gap-3")}
          >
            <Pen size={24} />
            Jelentkezés
          </Button>
        )}
      </div>
      <StructuredListWrapper>
        <StructuredListBody>
          <StructuredListRow>
            <StructuredListCell className={cn("text-lg")} head>
              Név
            </StructuredListCell>
            <StructuredListCell className={cn("text-lg")}>
              {ad.company}
            </StructuredListCell>
          </StructuredListRow>
          <StructuredListRow>
            <StructuredListCell className={cn("text-lg")} head>
              Pozíció
            </StructuredListCell>
            <StructuredListCell className={cn("text-lg")}>
              {ad.position}
            </StructuredListCell>
          </StructuredListRow>
          <StructuredListRow>
            <StructuredListCell className={cn("text-lg")} head>
              Leírás
            </StructuredListCell>
            <StructuredListCell className={cn("text-lg")}>
              {ad.description}
            </StructuredListCell>
          </StructuredListRow>
          <StructuredListRow>
            <StructuredListCell className={cn("text-lg")} head>
              Fizetési sáv
            </StructuredListCell>
            <StructuredListCell className={cn("text-lg")}>
              {HUF.format(ad.salaryFrom)} - {HUF.format(ad.salaryTo)}
            </StructuredListCell>
          </StructuredListRow>
          <StructuredListRow>
            <StructuredListCell className={cn("text-lg")} head>
              Foglalkoztatás típusa
            </StructuredListCell>
            <StructuredListCell className={cn("text-lg")}>
              {ad.type}
            </StructuredListCell>
          </StructuredListRow>
          <StructuredListRow>
            <StructuredListCell className={cn("text-lg")} head>
              Home office
            </StructuredListCell>
            <StructuredListCell className={cn("text-lg")}>
              {ad.homeOffice ? "Van" : "Nincs"}
            </StructuredListCell>
          </StructuredListRow>
        </StructuredListBody>
      </StructuredListWrapper>
    </div>
  );
};

export default Job;
