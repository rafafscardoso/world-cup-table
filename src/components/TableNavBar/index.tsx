import { type Groups } from "@components/Group";

interface Props {
  onChange: (value: Groups) => void;
  group: Groups;
}

export default function TableNavBar({ group, onChange }: Props) {
  return (
    <div className="mb-4 grid w-full grid-cols-4 grid-rows-2 gap-2">
      <div
        className={`grid w-full cursor-pointer place-items-center rounded p-2 ${
          group === "group-a" ? "bg-default-700" : "bg-cream-500"
        }`}
        onClick={() => onChange("group-a")}
      >
        <p
          className={`text-xs sm:text-base ${
            group === "group-a" ? "text-cream-500" : "text-dark-900"
          }`}
        >
          Grupo A
        </p>
      </div>
      <div
        className={`grid w-full cursor-pointer place-items-center rounded p-2 ${
          group === "group-b" ? "bg-default-700" : "bg-cream-500"
        }`}
        onClick={() => onChange("group-b")}
      >
        <p
          className={`text-xs sm:text-base ${
            group === "group-b" ? "text-cream-500" : "text-dark-900"
          }`}
        >
          Grupo B
        </p>
      </div>
      <div
        className={`grid w-full cursor-pointer place-items-center rounded p-2 ${
          group === "group-c" ? "bg-default-700" : "bg-cream-500"
        }`}
        onClick={() => onChange("group-c")}
      >
        <p
          className={`text-xs sm:text-base ${
            group === "group-c" ? "text-cream-500" : "text-dark-900"
          }`}
        >
          Grupo C
        </p>
      </div>
      <div
        className={`grid w-full cursor-pointer place-items-center rounded p-2 ${
          group === "group-d" ? "bg-default-700" : "bg-cream-500"
        }`}
        onClick={() => onChange("group-d")}
      >
        <p
          className={`text-xs sm:text-base ${
            group === "group-d" ? "text-cream-500" : "text-dark-900"
          }`}
        >
          Grupo D
        </p>
      </div>
      <div
        className={`grid w-full cursor-pointer place-items-center rounded p-2 ${
          group === "group-e" ? "bg-default-700" : "bg-cream-500"
        }`}
        onClick={() => onChange("group-e")}
      >
        <p
          className={`text-xs sm:text-base ${
            group === "group-e" ? "text-cream-500" : "text-dark-900"
          }`}
        >
          Grupo E
        </p>
      </div>
      <div
        className={`grid w-full cursor-pointer place-items-center rounded p-2 ${
          group === "group-f" ? "bg-default-700" : "bg-cream-500"
        }`}
        onClick={() => onChange("group-f")}
      >
        <p
          className={`text-xs sm:text-base ${
            group === "group-f" ? "text-cream-500" : "text-dark-900"
          }`}
        >
          Grupo F
        </p>
      </div>
      <div
        className={`grid w-full cursor-pointer place-items-center rounded p-2 ${
          group === "group-g" ? "bg-default-700" : "bg-cream-500"
        }`}
        onClick={() => onChange("group-g")}
      >
        <p
          className={`text-xs sm:text-base ${
            group === "group-g" ? "text-cream-500" : "text-dark-900"
          }`}
        >
          Grupo G
        </p>
      </div>
      <div
        className={`grid w-full cursor-pointer place-items-center rounded p-2 ${
          group === "group-h" ? "bg-default-700" : "bg-cream-500"
        }`}
        onClick={() => onChange("group-h")}
      >
        <p
          className={`text-xs sm:text-base ${
            group === "group-h" ? "text-cream-500" : "text-dark-900"
          }`}
        >
          Grupo H
        </p>
      </div>
    </div>
  );
}
