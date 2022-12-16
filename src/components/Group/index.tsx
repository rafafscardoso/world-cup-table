import { useState } from "react";
import Image from "next/image";
import { cx } from "class-variance-authority";

import Loader from "@components/Loader";
import MatchItem from "@components/MatchItem";
import TableNavBar from "@components/TableNavBar";

import setCountryFlags from "@misc/setCountryFlags";

import { type RouterInputs, trpc } from "@utils/trpc";

export type Groups =
  | "group-a"
  | "group-b"
  | "group-c"
  | "group-d"
  | "group-e"
  | "group-f"
  | "group-g"
  | "group-h";

export default function Group() {
  const [groupCode, setGroupCode] = useState<Groups>("group-a");

  const {
    data: group,
    isLoading,
    isFetching,
    refetch,
  } = trpc.groups.find.useQuery({
    code: groupCode,
  });

  const onSuccess = () => {
    refetch();
  };

  const { mutate } = trpc.results.add.useMutation({ onSuccess });

  const handleSubmit = (payload: RouterInputs["results"]["add"]) => {
    mutate(payload);
  };

  const handleChangeGroup = (value: Groups) => {
    setGroupCode(value);
  };

  return (
    <div className="flex w-full flex-col items-center justify-center">
      <TableNavBar group={groupCode} onChange={handleChangeGroup} />
      <div className="mb-4 w-full overflow-hidden rounded border border-golden-500 bg-cream-500">
        <div className="grid grid-cols-12 bg-default-700 py-2 text-sm text-cream-500 sm:text-base">
          <div className="col-span-4 ml-2 flex items-center"></div>
          <div className="grid place-items-center">J</div>
          <div className="grid place-items-center">V</div>
          <div className="grid place-items-center">E</div>
          <div className="grid place-items-center">D</div>
          <div className="grid place-items-center">GM</div>
          <div className="grid place-items-center">GS</div>
          <div className="grid place-items-center">SG</div>
          <div className="grid place-items-center">Pts</div>
        </div>
        <div className="relative min-h-[149px] sm:min-h-[163px]">
          {(isLoading || isFetching) && (
            <div className="absolute z-10 grid h-full w-full place-items-center">
              <Loader />
            </div>
          )}
          <div className={cx([isLoading || isFetching ? "opacity-50" : ""])}>
            {group?.table?.map((item) => {
              const teamData = setCountryFlags(item.teamCode);
              return (
                <div
                  key={item.teamCode}
                  className="grid grid-cols-12 border-t border-golden-500 py-1 text-xs text-dark-900 sm:text-base"
                >
                  <div className="col-span-4 ml-2 flex items-center">
                    <div className="relative mr-2 grid h-7 w-7 place-items-center overflow-hidden rounded-full border border-golden-500 sm:h-8 sm:w-8">
                      <Image
                        className="object-cover"
                        src={teamData?.flag}
                        fill
                        alt="Flag"
                      />
                    </div>
                    {teamData.name}
                  </div>
                  <div className="grid place-items-center">
                    {item.victories + item.draws + item.defeats}
                  </div>
                  <div className="grid place-items-center">
                    {item.victories}
                  </div>
                  <div className="grid place-items-center">{item.draws}</div>
                  <div className="grid place-items-center">{item.defeats}</div>
                  <div className="grid place-items-center">{item.gs}</div>
                  <div className="grid place-items-center">{item.gc}</div>
                  <div className="grid place-items-center">{item.gd}</div>
                  <div className="grid place-items-center">{item.pts}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div className="relative min-h-[381px] w-full rounded border border-golden-500 bg-cream-300 sm:min-h-[533px]">
        {(isLoading || isFetching) && (
          <div className="absolute z-10 grid h-full w-full place-items-center">
            <Loader />
          </div>
        )}
        {group?.matches.map((match, idx) => (
          <div
            className={cx([
              "w-full",
              idx !== 0 ? "border-t border-golden-500" : "",
              isLoading || isFetching ? "opacity-50" : "",
            ])}
            key={match.id}
          >
            <MatchItem match={match} onClick={handleSubmit} />
          </div>
        ))}
      </div>
    </div>
  );
}
