import { type FormEvent, useState } from "react";
import Image from "next/image";
import { format } from "date-fns";
import { cx } from "class-variance-authority";

import { type RouterInputs, type RouterOutputs } from "@utils/trpc";

import setCountryFlags from "@misc/setCountryFlags";

interface Props {
  match: RouterOutputs["groups"]["find"]["matches"][0];
  onClick: (payload: RouterInputs["results"]["add"]) => void;
}

interface StateProps {
  homeTeamScore: string;
  awayTeamScore: string;
  winner: "home" | "away" | null;
}

export default function MatchItem({
  match: {
    id,
    date,
    location,
    stadium,
    stage,
    results,
    homeTeamCode,
    awayTeamCode,
  },
  onClick,
}: Props) {
  const [isClickable, setIsClickable] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [scoreInput, setScoreInput] = useState<StateProps>({
    homeTeamScore:
      results[0]?.homeTeamScore !== null &&
      results[0]?.homeTeamScore !== undefined
        ? String(results[0]?.homeTeamScore)
        : "",
    awayTeamScore:
      results[0]?.awayTeamScore !== null &&
      results[0]?.homeTeamScore !== undefined
        ? String(results[0]?.awayTeamScore)
        : "",
    winner: null,
  });

  const homeTeamData = setCountryFlags(
    homeTeamCode || results[0]?.homeTeamCode
  );
  const awayTeamData = setCountryFlags(
    awayTeamCode || results[0]?.awayTeamCode
  );

  const showSuccess = () => {
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 2000);
  };

  const handleDrawInPlayoff = (
    isClickable: boolean,
    isHome: boolean,
    winner: "home" | "away" | null
  ) => {
    if (isClickable) {
      if ((isHome && winner === "home") || (!isHome && winner === "away")) {
        return "cursor-pointer border-2 border-default-500";
      }
      return "cursor-pointer border border-golden-500";
    }
    return "border border-golden-500";
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const { homeTeamScore, awayTeamScore, winner } = scoreInput;
    if (stage.toLowerCase() !== "group_stage") {
      if (homeTeamScore === awayTeamScore && !scoreInput.winner) {
        setIsClickable(true);
        return;
      }
      onClick({
        matchId: id,
        homeTeamScore: Number(homeTeamScore),
        awayTeamScore: Number(awayTeamScore),
        winner,
      });
      setIsClickable(false);
      showSuccess();
      return;
    }
    onClick({
      matchId: id,
      homeTeamScore: Number(homeTeamScore),
      awayTeamScore: Number(awayTeamScore),
    });
    showSuccess();
  };

  return (
    <div className="relative flex min-h-[68px] w-full items-center justify-between p-2 sm:py-5 sm:px-6">
      <div>
        <p className="text-sm text-dark-900 sm:text-lg">
          {format(new Date(date), "dd MMM yyyy HH'h'mm")}
        </p>
        <p className="text-xs text-dark-900 sm:text-sm">
          {location} - {stadium}
        </p>
      </div>
      <div>
        <div className="relative flex items-center gap-2">
          {showToast && (
            <div className="absolute left-[41.5px] -bottom-4 rounded bg-green-200 py-[2px] px-1 sm:-bottom-6 sm:left-[56px]">
              <p className="text-[8px] text-green-700 sm:text-[10px]">
                Placar salvo
              </p>
            </div>
          )}
          {isClickable && (
            <div className="absolute left-[26.5px] -bottom-6 rounded bg-red-200 py-[2px] px-1 sm:left-[39px]">
              <p className="text-[8px] text-red-700 sm:text-[10px]">
                Selecione o vencedor
              </p>
            </div>
          )}
          <div className="flex items-center gap-1">
            <label>
              <div
                className={cx([
                  "relative grid h-8 w-8 place-items-center overflow-hidden rounded-full border border-golden-500 sm:h-[40px] sm:w-12 sm:rounded",
                  handleDrawInPlayoff(isClickable, true, scoreInput.winner),
                ])}
                onClick={() => setScoreInput({ ...scoreInput, winner: "home" })}
              >
                {homeTeamData?.flag ? (
                  <Image
                    className="object-cover"
                    src={homeTeamData.flag}
                    fill
                    alt={homeTeamData.name}
                  />
                ) : null}
              </div>
            </label>
            <input
              className="h-8 w-7 rounded-sm border border-golden-500 p-1 text-center text-xs focus:border-2 focus:border-default-500 focus:outline-none sm:h-[40px] sm:w-8 sm:text-base"
              value={scoreInput.homeTeamScore}
              onChange={(e) =>
                setScoreInput({
                  ...scoreInput,
                  homeTeamScore: e.target.value,
                })
              }
            />
          </div>
          <div className="flex items-center gap-1">
            <input
              className="h-8 w-7 rounded-sm border border-golden-500 p-1 text-center text-xs focus:border-2 focus:border-default-500 focus:outline-none sm:h-[40px] sm:w-8 sm:text-base"
              value={scoreInput.awayTeamScore}
              onChange={(e) =>
                setScoreInput({
                  ...scoreInput,
                  awayTeamScore: e.target.value,
                })
              }
            />
            <label>
              <div
                className={cx([
                  "relative grid h-8 w-8 place-items-center overflow-hidden rounded-full border border-golden-500 sm:h-[40px] sm:w-12 sm:rounded",
                  handleDrawInPlayoff(isClickable, false, scoreInput.winner),
                ])}
                onClick={() => setScoreInput({ ...scoreInput, winner: "away" })}
              >
                {awayTeamData?.flag ? (
                  <Image
                    className="object-cover"
                    src={awayTeamData.flag}
                    fill
                    alt={awayTeamData.name}
                  />
                ) : null}
              </div>
            </label>
          </div>
          <button
            className="rounded bg-default-500 p-2 text-xs text-cream-500 hover:bg-default-700"
            onClick={handleSubmit}
            disabled={
              !(
                (homeTeamCode || results[0]?.homeTeamCode) &&
                (awayTeamCode || results[0]?.awayTeamCode)
              )
            }
          >
            Salvar
          </button>
        </div>
      </div>
    </div>
  );
}
