import React from "react";
type Preference = {
  title: string;
  reason: string;
};

type Props = {
  title: string;
  reasons: object | undefined;
  setPreferences: React.Dispatch<React.SetStateAction<Preference[]>>;
};

function ChooseReasons({ title, reasons, setPreferences }: Props) {
  const [selectedReason, setSelectedReason] = React.useState<string>();

  return (
    <>
      {reasons &&
        (reasons[title] as string[])?.map((reason, index) => (
          <button
            key={index}
            className={`w-full rounded-md border-2 bg-slate-100 p-3 ${
              selectedReason === reason ? "border-purple-500" : "border-black"
            }}`}
            onClick={() => {
              setSelectedReason(reason);
              setPreferences((prev) => {
                if (prev) {
                  // check if the title is already in the array
                  const index = prev.findIndex((p) => p.title === title);
                  if (index !== -1) {
                    // if it is, replace it with the new reason
                    (prev[index] as Preference).reason = reason;
                    return [...prev];
                  }
                  // if it isn't, add it to the array
                  return [...prev, { title, reason }];
                }
                return [{ title, reason }];
              });
            }}
          >
            {reason}
          </button>
        ))}
    </>
  );
}

export default ChooseReasons;
