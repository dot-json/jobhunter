import { useState, useEffect } from "react";
import { Loading, Button, TextInput, Modal } from "@carbon/react";
import { Edit, Add, Close, TrashCan } from "@carbon/icons-react";
import { cn } from "../lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { useSelector, useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import {
  loadExperiences,
  updateExperience,
  createExperience,
  deleteExperience,
} from "../lib/actions/experiencesActions";

const Dashboard = () => {
  const dispatch = useDispatch();
  const [editMode, setEditMode] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [toEdit, setToEdit] = useState(-1);
  const user = useSelector((state) => state.user.user);
  const { experiences, isLoading, error } = useSelector(
    (state) => state.experiences,
  );
  const { register, handleSubmit, setValue } = useForm();

  const roleMap = {
    jobseeker: "Álláskereső",
    company: "Cég",
  };

  const handleEdit = (data) => {
    if (data) {
      setValue("company", data.company);
      setValue("title", data.title);
      setValue("interval", data.interval);
    } else {
      setValue("company", "");
      setValue("title", "");
      setValue("interval", "");
    }
  };

  const handleDelete = (id) => {
    dispatch(deleteExperience(id));
  };

  const onSubmit = (data) => {
    if (toEdit !== -1) {
      const newExp = {
        id: toEdit,
        company: data.company,
        title: data.title,
        interval: data.interval,
      };
      dispatch(updateExperience(newExp));
      setToEdit(-1);
      setEditModalOpen(false);
    } else {
      dispatch(createExperience(data));
      setEditModalOpen(false);
    }
  };

  useEffect(() => {
    dispatch(loadExperiences());
  }, [dispatch]);

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <p>Error loading experiences: {error}</p>;
  }

  return (
    <div
      className={cn(
        "my-8 flex size-full flex-col gap-8 md:my-16 md:bg-cds-background-secondary md:p-8",
      )}
    >
      <div
        className={cn(
          "grid grid-cols-1 grid-rows-[auto_auto] items-center gap-4 md:grid-cols-[1fr_auto] md:grid-rows-1",
        )}
      >
        <div className={cn("flex flex-col gap-1")}>
          <h1 className={cn("text-2xl font-bold")}>Személyes adatok</h1>
          <p>Adataid és tapasztalataid egy helyen</p>
        </div>
        <AnimatePresence mode="wait" initial={false}>
          {editMode ? (
            <motion.div
              key="save-reset"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.1, ease: "easeInOut" }}
            >
              <Button
                size="lg"
                kind="danger"
                className={cn("flex items-center gap-2")}
                onClick={() => setEditMode(false)}
              >
                <Close size={24} />
                Szerkesztés befejezése
              </Button>
            </motion.div>
          ) : (
            <motion.button
              key="edit"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.1, ease: "easeInOut" }}
              type="button"
              className={cn(
                "flex cursor-pointer items-center gap-2 px-4 py-4 font-bold transition-colors hover:bg-cds-hover active:bg-cds-active",
              )}
              onClick={() => setEditMode(true)}
            >
              <Edit size={24} />
              Tapasztalatok szerkesztése
            </motion.button>
          )}
        </AnimatePresence>
      </div>
      <div className={cn("flex flex-col")}>
        <hr className={cn("border-t-cds-border")} />
        <div className={cn("grid grid-cols-3 px-2 py-4")}>
          <p className={cn("text-lg font-bold")}>Név</p>
          <p className={cn("col-span-2 text-lg")}>{user.fullname}</p>
        </div>
        <hr className={cn("border-t-cds-border")} />
        <div className={cn("grid grid-cols-3 px-2 py-4")}>
          <p className={cn("text-lg font-bold")}>Email</p>
          <p className={cn("col-span-2 text-lg")}>{user.email}</p>
        </div>
        <hr className={cn("border-t-cds-border")} />
        <div className={cn("grid grid-cols-3 px-2 py-4")}>
          <p className={cn("text-lg font-bold")}>Státusz</p>
          <p className={cn("col-span-2 text-lg")}>{roleMap[user.role]}</p>
        </div>
        <hr className={cn("border-t-cds-border")} />
      </div>
      <h2 className={cn("text-xl font-bold")}>Tapasztalatok</h2>
      <div>
        <div className={cn("flex flex-col")}>
          <hr className={cn("border-t-cds-border")} />
          {experiences?.map((exp) => {
            if (!exp) return null;

            return (
              <div className={cn("relative w-full")}>
                <div
                  key={exp.id}
                  className={cn(
                    "grid grid-cols-3 px-2 py-4",
                    editMode &&
                      "cursor-pointer hover:bg-cds-hover active:bg-cds-active",
                  )}
                  onClick={() => {
                    if (editMode) {
                      handleEdit(exp);
                      setToEdit(exp.id);
                      setEditModalOpen(true);
                    }
                  }}
                >
                  <p className={cn("text-lg font-bold")}>{exp?.company}</p>
                  <p
                    className={cn(
                      "col-span-2 flex flex-col text-lg md:flex-row md:gap-2",
                    )}
                  >
                    <span>{exp?.interval} |</span>
                    <span>{exp?.title}</span>
                  </p>
                </div>
                <AnimatePresence>
                  {editMode && (
                    <motion.div
                      key="delete"
                      initial={{ scale: 0.9, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.9, opacity: 0 }}
                      transition={{ duration: 0.1, ease: "easeInOut" }}
                      className={cn(
                        "absolute right-0 top-0 z-20 grid h-full place-items-center px-2",
                      )}
                    >
                      <Button
                        hasIconOnly
                        renderIcon={TrashCan}
                        kind="danger"
                        iconDescription="Törlés"
                        onClick={() => handleDelete(exp.id)}
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
                <hr className={cn("border-t-cds-border")} />
              </div>
            );
          })}
        </div>
        <AnimatePresence>
          {editMode && (
            <motion.div
              initial={{ height: "0rem", opacity: 0 }}
              animate={{ height: "4rem", opacity: 1 }}
              exit={{ height: "0rem", opacity: 0 }}
              transition={{ duration: 0.2, ease: "easeInOut" }}
              className={cn(
                "grid cursor-pointer place-items-center overflow-hidden transition-colors hover:bg-cds-hover active:bg-cds-active",
              )}
              onClick={() => {
                handleEdit(null);
                setToEdit(-1);
                setEditModalOpen(true);
              }}
            >
              <Add size={32} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <Modal
        open={editModalOpen}
        onRequestClose={() => setEditModalOpen(false)}
        modalHeading={toEdit !== -1 ? "Szerkesztés" : "Hozzáadás"}
        primaryButtonText="Mentés"
        secondaryButtonText="Vissza"
        onRequestSubmit={handleSubmit(onSubmit)}
      >
        <form className={cn("flex flex-col gap-4")}>
          <TextInput id="company" labelText="Cég" {...register("company")} />
          <TextInput id="position" labelText="Pozíció" {...register("title")} />
          <div className={cn("flex gap-4")}>
            <TextInput
              id="interval"
              labelText="Időszak"
              {...register("interval")}
            />
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default Dashboard;
