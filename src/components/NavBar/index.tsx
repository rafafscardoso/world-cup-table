interface Props {
  onChange: (value: boolean) => void;
  show: boolean;
}

export default ({ show, onChange }: Props) => {
  return (
    <div className="w-full flex flex-row gap-4 justify-between pb-4">
      <div
        className={`w-full grid place-items-center px-4 py-3 rounded cursor-pointer border border-golden-500 ${
          show ? "bg-default-300" : "bg-default-700"
        }`}
        onClick={() => onChange(false)}
      >
        <p className="text-xs sm:text-base text-cream-500">Fase de Grupos</p>
      </div>
      <div
        className={`w-full grid place-items-center px-4 py-3 rounded cursor-pointer border border-golden-500 ${
          show ? "bg-default-700" : "bg-default-300"
        }`}
        onClick={() => onChange(true)}
      >
        <p className="text-xs sm:text-base text-cream-500">Mata-mata</p>
      </div>
    </div>
  );
};
