import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Button,
  StructuredListWrapper,
  StructuredListRow,
  StructuredListCell,
  StructuredListBody,
  Loading,
  Modal,
} from "@carbon/react";
import { TaskAdd, TaskRemove, IbmLpa } from "@carbon/icons-react";
import { cn } from "../lib/utils";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { notify } from "../lib/utils";
import { HUF } from "../lib/utils";
import {
  apply,
  deleteApplication,
  loadApplicants,
} from "../lib/actions/applicationsActions";

const Job = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const { adverts, isLoading, error } = useSelector((state) => state.adverts);
  const { user } = useSelector((state) => state.user);
  const { applications, applicants } = useSelector(
    (state) => state.applications,
  );

  const [ad, setAd] = useState({});
  const [hasApplied, setHasApplied] = useState(
    applications.some((application) => application.jobId === parseInt(id)),
  );
  const [applicantsOpen, setApplicantsOpen] = useState(false);

  const jobTypes = {
    "full-time": "Teljes munkaidős",
    "part-time": "Részmunkaidős",
    internship: "Gyakornok",
  };

  useEffect(() => {
    if (user.role === "company") {
      dispatch(loadApplicants(parseInt(id)));
    } else {
      setHasApplied(
        applications.some((application) => application.jobId === parseInt(id)),
      );
    }
    if (adverts.length > 0) {
      const ad = adverts.find((ad) => ad.id === parseInt(id));
      if (ad === undefined) {
        notify("Az álláshirdetés nem található!", "error");
        navigate("/");
        return;
      }
      setAd(ad);
    }
  }, [adverts, applications]);

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
        {user.role === "jobseeker" ? (
          <Button
            size="md"
            kind={hasApplied ? "danger" : "primary"}
            className={cn("flex items-center gap-3")}
            onClick={() => {
              if (hasApplied) {
                dispatch(deleteApplication(parseInt(id)));
              } else {
                dispatch(apply(parseInt(id)));
              }
            }}
          >
            {hasApplied ? <TaskRemove size={24} /> : <TaskAdd size={24} />}
            {hasApplied ? "Leadás" : "Jelentkezés"}
          </Button>
        ) : (
          <Button
            size="md"
            kind="primary"
            className={cn("flex items-center gap-3")}
            onClick={() => setApplicantsOpen(true)}
          >
            <IbmLpa size={24} />
            Jelentkezők
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
              {jobTypes[ad.type]}
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
      <Modal
        open={applicantsOpen}
        onRequestClose={() => setApplicantsOpen(false)}
        passiveModal
        modalHeading="Jelentkezők"
      >
        <StructuredListWrapper>
          <StructuredListBody>
            {applicants.map((applicant) => (
              <StructuredListRow key={applicant.id}>
                <StructuredListCell className={cn("text-lg")}>
                  {applicant.user.fullname}
                </StructuredListCell>
              </StructuredListRow>
            ))}
          </StructuredListBody>
        </StructuredListWrapper>
      </Modal>
    </div>
  );
};

export default Job;
