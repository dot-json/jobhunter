import SearchField from "../components/SearchField";
import { cn } from "../lib/utils";
import { useSelector } from "react-redux";
import { Loading } from "@carbon/react";
import { useNavigate } from "react-router-dom";
import { HUF } from "../lib/utils";

const Home = () => {
  const navigate = useNavigate();
  const { adverts, isLoading, error } = useSelector((state) => state.adverts);

  return (
    <div className={cn("flex flex-col gap-12 py-16")}>
      <SearchField />
      <div className={cn("flex w-full flex-col")}>
        <div className={cn("flex items-center justify-between p-4")}>
          <p className={cn("font-bold")}>ÁLLÁS NEVE</p>
          <p className={cn("font-bold")}>FIZETÉSI SÁV</p>
        </div>
        <hr className={cn("border-t-cds-border")} />
        {!isLoading ? (
          <>
            {adverts.map((advert) => (
              <div key={advert.id}>
                <div
                  className={cn(
                    "flex cursor-pointer items-center justify-between p-4 transition-colors hover:bg-cds-w-bg-hover",
                  )}
                  onClick={() => navigate(`/job/${advert.id}`)}
                >
                  <div>
                    <p className={cn("font-bold")}>{advert.position}</p>
                    <p className={cn("text-sm font-light")}>{advert.city}</p>
                  </div>
                  <div>
                    <p className={cn("font-bold")}>
                      {HUF.format(advert.salaryFrom)} -{" "}
                      {HUF.format(advert.salaryTo)}
                    </p>
                    <p className={cn("text-right font-light")}>{advert.type}</p>
                  </div>
                </div>
                <hr className={cn("border-t-cds-border")} />
              </div>
            ))}
          </>
        ) : (
          <Loading />
        )}
      </div>
    </div>
  );
};

export default Home;
