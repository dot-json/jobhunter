import { useEffect } from "react";
import { TextInput, TextArea, Dropdown, Checkbox, Button } from "@carbon/react";
import { Send, Save } from "@carbon/icons-react";
import { useForm } from "react-hook-form";
import { cn, notify } from "../lib/utils";
import { createAdvert, updateAdvert } from "../lib/actions/advertsActions";
import { useDispatch, useSelector } from "react-redux";

const AdvertForm = ({ id, setOpen }) => {
  const dispatch = useDispatch();

  const { register, handleSubmit, setValue, getValues, reset } = useForm({
    defaultValues: {
      company: "",
      position: "",
      city: "",
      description: "",
      type: "full-time",
      salaryFrom: 0,
      salaryTo: 5000000,
      homeOffice: false,
    },
  });

  const { adverts, isLoading, error } = useSelector((state) => state.adverts);
  useEffect(() => {
    if (id !== -1 && !isLoading && adverts.length > 0) {
      const ad = adverts.find((ad) => ad.id === parseInt(id));
      setValue("company", ad.company);
      setValue("position", ad.position);
      setValue("city", ad.city);
      setValue("description", ad.description);
      setValue("type", ad.type);
      setValue("salaryFrom", ad.salaryFrom);
      setValue("salaryTo", ad.salaryTo);
      setValue("homeOffice", ad.homeOffice);
    }
  }, [adverts.length, isLoading, id]);

  const jobTypes = [
    { id: "full-time", text: "Teljes munkaidős" },
    { id: "part-time", text: "Részmunkaidős" },
    { id: "internship", text: "Gyakornok" },
  ];

  useEffect(() => {
    register("type");
  }, [register, getValues]);

  const handleReset = () => {
    reset();
    setValue("type", "full-time");
    setValue("salaryFrom", 0);
    setValue("salaryTo", 5000000);
  };

  const isSalaryValid = (value_min, value_max) => {
    if (value_min > value_max) {
      notify("A minimális bér nem lehet nagyobb a maximális bérnél!", "error");
      return false;
    }
    return true;
  };

  const onSubmit = (data) => {
    if (id === -1) {
      if (!isSalaryValid(data.salaryFrom, data.salaryTo)) return;
      dispatch(createAdvert(data));
      if (!error) {
        handleReset();
        setOpen(false);
      } else {
        console.log(error);
      }
    } else {
      if (!isSalaryValid(data.salaryFrom, data.salaryTo)) return;
      dispatch(updateAdvert({ id: id, ...data }));
      if (!error) {
        handleReset();
        setOpen(false);
      }
    }
  };

  return (
    <form
      className={cn("flex flex-col gap-8")}
      onSubmit={handleSubmit(onSubmit)}
    >
      <div
        className={cn(
          "grid grid-cols-1 grid-rows-[repeat(auto,6)] gap-8 md:grid-cols-2 md:grid-rows-3",
        )}
      >
        <TextInput
          labelText="Cégnév"
          id="company"
          required
          className={cn("[grid-area:1/1/2/1]")}
          {...register("company")}
        />
        <Dropdown
          id="type"
          items={jobTypes}
          itemToString={(item) => (item ? item.text : "")}
          initialSelectedItem={jobTypes[0]}
          label="Munkavégzés helye"
          titleText="Munkavégzés helye"
          className={cn("flex w-full flex-col items-start [grid-area:2/1/3/1]")}
          onChange={(e) => setValue("type", e.selectedItem.id)}
        />
        <TextInput
          labelText="Település"
          id="city"
          required
          className={cn("[grid-area:3/1/4/1]")}
          {...register("city")}
        />
        <TextInput
          labelText="Pozíció"
          id="position"
          required
          className={cn("[grid-area:4/1/5/1] md:[grid-area:1/2/2/2]")}
          {...register("position")}
        />
        <TextArea
          labelText="Leírás"
          id="description"
          required
          className={cn("h-full [grid-area:5/1/6/1] md:[grid-area:2/2/4/2]")}
          {...register("description")}
        />
      </div>
      <div
        className={cn("grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3")}
      >
        <TextInput
          type="number"
          id="salaryFrom"
          labelText="Minimum fizetés"
          required
          {...register("salaryFrom")}
        />
        <TextInput
          type="number"
          id="salaryTo"
          labelText="Maximum fizetés"
          required
          {...register("salaryTo")}
        />
        <Checkbox
          id="homeOffice"
          labelText="Home office lehetőség"
          className={cn("w-full self-end")}
          {...register("homeOffice")}
        />
      </div>
      <Button
        type="submit"
        size="xl"
        className={cn("mt-4 flex items-center gap-2")}
      >
        {id === -1 ? (
          <>
            <Send size={24} className={cn("-scale-x-100")} />
            Hirdetés feladása
          </>
        ) : (
          <>
            <Save size={24} className={cn("-scale-x-100")} />
            Mentés
          </>
        )}
      </Button>
    </form>
  );
};

export default AdvertForm;
