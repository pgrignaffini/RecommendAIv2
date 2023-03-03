import React from "react";
import type { Preference, Reasons } from "typings";

type Props = {
  title: string;
  reasons: Reasons | undefined;
  setPreferences: React.Dispatch<React.SetStateAction<Preference[]>>;
};

function ChooseReasons({ title, reasons, setPreferences }: Props) {
  const [selectedReasons, setSelectedReasons] = React.useState<string[]>([]);

  React.useEffect(() => {
    setPreferences((prev: Preference[]): Preference[] => {
      if (prev) {
        const index = prev.findIndex((p) => p.title === title);
        if (index !== -1) {
          return [
            ...prev.slice(0, index),
            { ...prev[index], reasons: selectedReasons },
            ...prev.slice(index + 1),
          ] as Preference[];
        }
        return [...prev, { title, reasons: selectedReasons }];
      }
      return [{ title, reasons: selectedReasons }];
    });
  }, [selectedReasons, title, setPreferences]);

  const toggleReasonSelection = (reason: string) => {
    if (selectedReasons.includes(reason)) {
      // If the reason is already selected, remove it from the selectedReasons array
      setSelectedReasons((prev) =>
        prev.filter((selected) => selected !== reason)
      );
    } else {
      // If the reason is not selected, add it to the selectedReasons array
      setSelectedReasons((prev) => [...prev, reason]);
    }
  };

  return (
    <>
      {(reasons?.[title] as string[])?.map((reason) => (
        <button
          key={reason}
          className={`btn ${
            selectedReasons.includes(reason) ? "" : "btn-outline"
          } btn-info flex space-x-2`}
          onClick={() => toggleReasonSelection(reason)}
        >
          <p className="text-[0.7rem] md:text-[1rem] md:leading-5">
            {reason} {selectedReasons.includes(reason) && " ✔"}
          </p>
        </button>
      ))}
    </>
  );
}

export default ChooseReasons;
