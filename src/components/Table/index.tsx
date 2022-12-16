import Image from "next/image";

import { TableItem } from "models/Group";
import setCountryFlags from "@misc/setCountryFlags";

interface Props {
  code: string;
  table: TableItem[];
}

export default function Table({ code, table }: Props) {
  return (
    <div className="mb-4 w-full overflow-hidden rounded border border-golden-500 bg-cream-500">
      <div className="grid grid-cols-12 border-b border-golden-500 bg-default-700 py-2">
        <div className="col-span-4 ml-2 flex items-center">
          <p className="text-sm text-cream-500 sm:text-base">{`Grupo ${code
            .split("-")[1]
            .toUpperCase()}`}</p>
        </div>
        <div className="grid place-items-center">
          <p className="text-sm text-cream-500 sm:text-base">J</p>
        </div>
        <div className="grid place-items-center">
          <p className="text-sm text-cream-500 sm:text-base">V</p>
        </div>
        <div className="grid place-items-center">
          <p className="text-sm text-cream-500 sm:text-base">E</p>
        </div>
        <div className="grid place-items-center">
          <p className="text-sm text-cream-500 sm:text-base">D</p>
        </div>
        <div className="grid place-items-center">
          <p className="text-sm text-cream-500 sm:text-base">GM</p>
        </div>
        <div className="grid place-items-center">
          <p className="text-sm text-cream-500 sm:text-base">GS</p>
        </div>
        <div className="grid place-items-center">
          <p className="text-sm text-cream-500 sm:text-base">SG</p>
        </div>
        <div className="grid place-items-center">
          <p className="text-sm text-cream-500 sm:text-base">Pts</p>
        </div>
      </div>
      {table?.map((item, idx) => {
        const teamData = setCountryFlags(item.code);
        return (
          <div
            key={item.id}
            className={`grid grid-cols-12 py-1 ${
              idx !== 0 && "border-t border-golden-500"
            }`}
          >
            <div className="col-span-4 ml-2 flex items-center">
              <div className="mr-2 grid h-7 w-7 place-items-center overflow-hidden rounded-full border border-golden-500 sm:h-8 sm:w-8">
                <Image
                  className="object-cover"
                  src={teamData?.flag}
                  width={64}
                  height={64}
                  alt="Flag"
                />
              </div>
              <p className="text-xs text-dark-900 sm:text-base">
                {teamData.name}
              </p>
            </div>
            <div className="grid place-items-center text-xs text-dark-900 sm:text-base">
              <p>{item.victories + item.draws + item.defeats}</p>
            </div>
            <div className="grid place-items-center text-xs text-dark-900 sm:text-base">
              <p>{item.victories}</p>
            </div>
            <div className="grid place-items-center text-xs text-dark-900 sm:text-base">
              <p>{item.draws}</p>
            </div>
            <div className="grid place-items-center text-xs text-dark-900 sm:text-base">
              <p>{item.defeats}</p>
            </div>
            <div className="grid place-items-center text-xs text-dark-900 sm:text-base">
              <p>{item.gs}</p>
            </div>
            <div className="grid place-items-center text-xs text-dark-900 sm:text-base">
              <p>{item.gc}</p>
            </div>
            <div className="grid place-items-center text-xs text-dark-900 sm:text-base">
              <p>{item.gd}</p>
            </div>
            <div className="grid place-items-center text-xs text-dark-900 sm:text-base">
              <p>{item.pts}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
