import { cx } from "class-variance-authority";

import Loader from "@components/Loader";
import MatchItem from "@components/MatchItem";

import { type RouterInputs, trpc } from "@utils/trpc";

export default function Playoff() {
  const {
    data: playoff,
    isLoading,
    isFetching,
    refetch,
  } = trpc.playoffs.find.useQuery();

  const onSuccess = () => {
    refetch();
  };

  const { mutate } = trpc.results.add.useMutation({ onSuccess });

  const handleSubmit = (payload: RouterInputs["results"]["add"]) => {
    mutate(payload);
  };

  const round16 = playoff?.matches?.filter(
    (match) => match.stage.toLowerCase() === "round_16"
  );
  const quarterFinals = playoff?.matches?.filter(
    (match) => match.stage.toLowerCase() === "quarter_final"
  );
  const semiFinals = playoff?.matches?.filter(
    (match) => match.stage.toLowerCase() === "semi_final"
  );
  const thirdPlace = playoff?.matches?.filter(
    (match) => match.stage.toLowerCase() === "third_place"
  );
  const final = playoff?.matches?.filter(
    (match) => match.stage.toLowerCase() === "final"
  );

  return (
    <div className="flex w-full flex-col items-center justify-center">
      <h1 className="mb-2 text-xl font-bold text-white">Oitavas de Final</h1>
      <div className="relative mb-2 min-h-[503px] w-full rounded border border-golden-500 bg-cream-300 sm:min-h-[711px]">
        {(isLoading || isFetching) && (
          <div className="absolute z-10 grid h-full w-full place-items-center">
            <Loader />
          </div>
        )}
        {round16?.map((match, idx) => (
          <div
            key={match.id}
            className={cx([
              "w-full",
              idx !== 0 ? "border-t border-golden-500" : "",
              isLoading || isFetching ? "opacity-50" : "",
            ])}
          >
            <MatchItem key={match.id} match={match} onClick={handleSubmit} />
          </div>
        ))}
      </div>
      <h1 className="mb-2 text-xl font-bold text-white">Quartas de Final</h1>
      <div className="relative mb-2 min-h-[243px] w-full rounded border border-golden-500 bg-cream-300 sm:min-h-[355px]">
        {(isLoading || isFetching) && (
          <div className="absolute z-10 grid h-full w-full place-items-center">
            <Loader />
          </div>
        )}
        {quarterFinals?.map((match, idx) => (
          <div
            key={match.id}
            className={cx([
              "w-full",
              idx !== 0 ? "border-t border-golden-500" : "",
              isLoading || isFetching ? "opacity-50" : "",
            ])}
          >
            <MatchItem key={match.id} match={match} onClick={handleSubmit} />
          </div>
        ))}
      </div>
      <h1 className="mb-2 text-xl font-bold text-white">Semi Finais</h1>
      <div className="relative mb-2 min-h-[105px] w-full rounded border border-golden-500 bg-cream-300 sm:min-h-[177px]">
        {(isLoading || isFetching) && (
          <div className="absolute z-10 grid h-full w-full place-items-center">
            <Loader />
          </div>
        )}
        {semiFinals?.map((match, idx) => (
          <div
            key={match.id}
            className={cx([
              "w-full",
              idx !== 0 ? "border-t border-golden-500" : "",
              isLoading || isFetching ? "opacity-50" : "",
            ])}
          >
            <MatchItem key={match.id} match={match} onClick={handleSubmit} />
          </div>
        ))}
      </div>
      <h1 className="mb-2 text-xl font-bold text-white">
        Disputa de Terceiro Lugar
      </h1>
      <div className="relative mb-2 min-h-[68px] w-full rounded border border-golden-500 bg-cream-300 sm:min-h-[88px]">
        {(isLoading || isFetching) && (
          <div className="absolute z-10 grid h-full w-full place-items-center">
            <Loader />
          </div>
        )}
        {thirdPlace?.map((match, idx) => (
          <div
            key={match.id}
            className={cx([
              "w-full",
              idx !== 0 ? "border-t border-golden-500" : "",
              isLoading || isFetching ? "opacity-50" : "",
            ])}
          >
            <MatchItem key={match.id} match={match} onClick={handleSubmit} />
          </div>
        ))}
      </div>
      <h1 className="mb-2 text-xl font-bold text-white">Final</h1>
      <div className="min-h-[68px]rounded relative  w-full border border-golden-500 bg-cream-300 sm:min-h-[88px]">
        {(isLoading || isFetching) && (
          <div className="absolute z-10 grid h-full w-full place-items-center">
            <Loader />
          </div>
        )}
        {final?.map((match, idx) => (
          <div
            key={match.id}
            className={cx([
              "w-full",
              idx !== 0 ? "border-t border-golden-500" : "",
              isLoading || isFetching ? "opacity-50" : "",
            ])}
          >
            <MatchItem key={match.id} match={match} onClick={handleSubmit} />
          </div>
        ))}
      </div>
    </div>
  );
}
