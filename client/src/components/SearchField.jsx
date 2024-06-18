import { useState, useRef } from "react";
import {
  Search,
  Button,
  NumberInput,
  Dropdown,
  TextInput,
  Checkbox,
} from "@carbon/react";
import { Search as SearchIcon, Filter } from "@carbon/icons-react";
import { AnimatePresence, motion } from "framer-motion";
import { useWindowWidth } from "@react-hook/window-size";
import { cn } from "../lib/utils";
import {
  setSalaryRange,
  setJobType,
  setCity,
  setHomeOffice,
  resetFilters,
} from "../lib/actions/filterActions";
import { useDispatch, useSelector } from "react-redux";

const SearchField = () => {
  const salaryMinRef = useRef();
  const salaryMaxRef = useRef();
  const windowWidth = useWindowWidth();
  const [filtersOpen, setFiltersOpen] = useState(false);

  const dispatch = useDispatch();
  const filters = useSelector((state) => state.filters);

  const toggleFilters = () => {
    setFiltersOpen((prev) => !prev);
  };

  const jobTypes = [
    { id: "all", text: "Összes" },
    { id: "full-time", text: "Teljes munkaidős" },
    { id: "part-time", text: "Részmunkaidős" },
    { id: "internship", text: "Gyakornok" },
  ];

  const handleSalaryMinChange = (e) => {
    dispatch(setSalaryRange(e.target.value, filters.salaryRange.max));
  };
  const handleSalaryMaxChange = (e) => {
    dispatch(setSalaryRange(filters.salaryRange.min, e.target.value));
  };
  const handleJobTypeChange = (id) => {
    dispatch(setJobType(id));
  };
  const handleCityChange = (e) => {
    dispatch(setCity(e.target.value));
  };
  const handleHomeOfficeChange = (e) => {
    dispatch(setHomeOffice(e.target.checked));
  };

  const filterBoxVariants = {
    initial: {
      height: 0,
      overflow: "hidden",
    },
    animate: {
      height: windowWidth < 1024 ? "18.4375rem" : "11rem",
      overflow: "visible",
      transition: {
        duration: 0.5,
        ease: "easeInOut",
        overflow: {
          delay: 0.49,
        },
      },
    },
    exit: {
      height: 0,
      overflow: "hidden",
      transition: {
        duration: 0.5,
        ease: "easeInOut",
      },
    },
  };
  return (
    <div className="grid grid-cols-[1fr_auto_auto] grid-rows-[auto_auto] gap-x-2">
      <Search
        size="lg"
        labelText="Állások keresése"
        placeholder="Állások keresése..."
        className={cn("mb-2 [grid-area:1/1/1/1]")}
      />
      <Button
        size="lg"
        className={cn(
          "mb-2 hidden items-center gap-2 [grid-area:1/2/1/2] md:flex",
        )}
      >
        <SearchIcon size={18} />
        Keresés
      </Button>
      <Button
        size="lg"
        hasIconOnly
        renderIcon={SearchIcon}
        iconDescription="Keresés"
        className={cn("mb-2 grid [grid-area:1/2/1/2] md:hidden")}
      />
      <Button
        size="lg"
        className={cn(
          "mb-2 hidden items-center gap-2 [grid-area:1/3/1/3] md:flex",
        )}
        kind="secondary"
        onClick={toggleFilters}
      >
        <Filter size={18} />
        Szűrők
      </Button>
      <Button
        size="lg"
        kind="secondary"
        hasIconOnly
        renderIcon={Filter}
        iconDescription="Szűrők"
        className={cn("mb-2 grid [grid-area:1/3/1/3] md:hidden")}
        onClick={toggleFilters}
      />
      <AnimatePresence>
        {filtersOpen && (
          <motion.div
            key="filter-box"
            initial="initial"
            animate="animate"
            exit="exit"
            variants={filterBoxVariants}
            className={cn(
              "grid h-[18.4375rem] content-start [grid-area:2/1/-1/-1] lg:h-[11rem]",
            )}
          >
            <div
              className={cn(
                "grid size-full grid-cols-1 place-items-center gap-4 py-4 lg:grid-cols-2",
              )}
            >
              <div className={cn("flex size-full gap-4")}>
                <TextInput
                  type="number"
                  id="salaryFrom"
                  labelText="Minimum fizetés"
                  placeholder="0"
                  onChange={handleSalaryMinChange}
                />
                <TextInput
                  type="number"
                  id="salaryTo"
                  labelText="Maximum fizetés"
                  placeholder="5000000"
                  onChange={handleSalaryMaxChange}
                />
              </div>
              <Dropdown
                id="munkaido"
                items={jobTypes}
                itemToString={(item) => (item ? item.text : "")}
                initialSelectedItem={jobTypes[0]}
                label="Munkavégzés helye"
                titleText="Munkavégzés helye"
                className={cn("flex w-full flex-col items-start")}
                onChange={(e) => handleJobTypeChange(e.selectedItem.id)}
              />
              <TextInput
                id="telepules"
                labelText="Település"
                placeholder="Budapest"
                className={cn("w-full")}
                onChange={(e) => handleCityChange(e)}
              />
              <Checkbox
                id="home-office"
                labelText="Home office lehetőség"
                className={cn("w-full self-center")}
                onChange={(e) => handleHomeOfficeChange(e)}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SearchField;
