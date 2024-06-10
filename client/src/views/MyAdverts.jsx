import { useState, useEffect } from "react";
import { cn, HUF } from "../lib/utils";
import { useSelector, useDispatch } from "react-redux";
import { Button, Modal } from "@carbon/react";
import {
  Portfolio,
  Location,
  Money,
  TrashCan,
  Launch,
  Edit,
  Add,
} from "@carbon/icons-react";
import { useNavigate } from "react-router-dom";
import { deleteAdvert } from "../lib/actions/advertsActions";
import AdvertForm from "../components/AdvertForm";

const MyAdverts = () => {
  const [id, setId] = useState(-1);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [myAdverts, setMyAdverts] = useState([]);
  const [open, setOpen] = useState(false);
  const user = useSelector((state) => state.user.user);
  const { adverts } = useSelector((state) => state.adverts);

  const handleDelete = (id) => {
    dispatch(deleteAdvert(id));
  };

  useEffect(() => {
    setMyAdverts(adverts.filter((ad) => ad.userId === user.id));
  }, [adverts.length]);

  return (
    <div className={cn("my-8 flex size-full flex-col gap-6 md:my-16")}>
      {myAdverts.length > 0 ? (
        <div className={cn("flex flex-col gap-6")}>
          {myAdverts.map((ad) => (
            <div
              key={ad.id}
              className={cn(
                "grid grid-cols-1 gap-4 bg-cds-background-secondary p-4 md:grid-cols-[1fr_auto] md:gap-y-0",
              )}
            >
              <div className={cn("flex flex-col gap-3")}>
                <h3 className={cn("text-2xl font-bold")}>{ad.position}</h3>
                <div className={cn("flex flex-col gap-4 sm:flex-row")}>
                  <p className={cn("flex items-center gap-1 text-sm")}>
                    <Portfolio />
                    {ad.type}
                  </p>
                  <p className={cn("flex items-center gap-1 text-sm")}>
                    <Location />
                    {ad.homeOffice ? "Van Home-Office" : " Nincs Home-Office"}
                  </p>
                  <p className={cn("flex items-center gap-1 text-sm")}>
                    <Money />
                    {HUF.format(ad.salaryFrom)} - {HUF.format(ad.salaryTo)}
                  </p>
                </div>
              </div>
              <div className={cn("flex items-center gap-4 justify-self-end")}>
                <Button
                  hasIconOnly
                  renderIcon={Edit}
                  kind="secondary"
                  iconDescription="Szerkesztés"
                  onClick={() => {
                    setId(ad.id);
                    setOpen(true);
                  }}
                />
                <Button
                  hasIconOnly
                  renderIcon={Launch}
                  iconDescription="Megtekintés"
                  onClick={() => navigate(`/job/${ad.id}`)}
                />
                <Button
                  hasIconOnly
                  renderIcon={TrashCan}
                  kind="danger"
                  iconDescription="Törlés"
                  onClick={() => handleDelete(ad.id)}
                />
              </div>
            </div>
          ))}
          <button
            className={cn(
              "grid w-full place-items-center py-6 transition-colors hover:bg-cds-hover active:bg-cds-active",
            )}
            onClick={() => {
              setId(-1);
              setOpen(true);
            }}
          >
            <Add size={48} />
          </button>
        </div>
      ) : (
        <button
          className={cn(
            "grid w-full place-items-center py-6 transition-colors hover:bg-cds-hover active:bg-cds-active",
          )}
          onClick={() => {
            setId(-1);
            setOpen(true);
          }}
        >
          <Add size={48} />
        </button>
      )}
      <Modal
        open={open}
        onRequestClose={() => setOpen(false)}
        modalHeading={id === -1 ? "Új hirdetés feladása" : "Szerkesztés"}
        passiveModal
      >
        <AdvertForm id={id} setOpen={setOpen} />
      </Modal>
    </div>
  );
};

export default MyAdverts;
