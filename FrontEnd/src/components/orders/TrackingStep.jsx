import React from "react";

const iconStyles = {
  done: "bg-green-500 text-white",
  active: "bg-orange-500 text-white",
  pending: "bg-gray-200 text-gray-400",
};
const lineStyles = { done: "bg-green-500", active: "bg-orange-300", pending: "bg-gray-200" };
const labelStyles = { done: "text-gray-900", active: "text-gray-900", pending: "text-gray-400" };
const descStyles = { done: "text-gray-500", active: "text-gray-500", pending: "text-gray-300" };

const TrackingStep = ({ step, isLast }) => {
  return (
    <div>
      <div className="flex gap-4">
        <div className="flex flex-col items-center">
          <div
            className={`w-10 h-10 rounded-full flex items-center justify-center text-base font-bold shrink-0 z-10 ${iconStyles[step.status]}`}
          >
            {step.icon}
          </div>
          {!isLast && (
            <div className={`w-0.5 flex-grow min-h-12 my-1 ${lineStyles[step.status]}`} />
          )}
        </div>
        <div className={`flex-1 ${!isLast ? "pb-8" : ""}`}>
          <p className={`m-0 font-bold text-base ${labelStyles[step.status]}`}>{step.label}</p>
          <p className={`mt-1 text-xs ${descStyles[step.status]}`}>{step.description}</p>
        </div>
      </div>
    </div>
  );
};

export default TrackingStep;
