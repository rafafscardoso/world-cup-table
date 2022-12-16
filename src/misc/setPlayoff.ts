const matchTable = (code: string) => {
  switch (code) {
    case "group-a-winner":
      return "r-16-a";
    case "group-b-runner-up":
      return "r-16-a";
    case "group-c-winner":
      return "r-16-b";
    case "group-d-runner-up":
      return "r-16-b";
    case "group-d-winner":
      return "r-16-c";
    case "group-c-runner-up":
      return "r-16-c";
    case "group-b-winner":
      return "r-16-d";
    case "group-a-runner-up":
      return "r-16-d";
    case "group-e-winner":
      return "r-16-e";
    case "group-f-runner-up":
      return "r-16-e";
    case "group-g-winner":
      return "r-16-f";
    case "group-h-runner-up":
      return "r-16-f";
    case "group-f-winner":
      return "r-16-g";
    case "group-e-runner-up":
      return "r-16-g";
    case "group-h-winner":
      return "r-16-h";
    case "group-g-runner-up":
      return "r-16-h";
    case "r-16-e-winner":
      return "qf-a_home";
    case "r-16-f-winner":
      return "qf-a_away";
    case "r-16-a-winner":
      return "qf-b_home";
    case "r-16-b-winner":
      return "qf-b_away";
    case "r-16-g-winner":
      return "qf-c_home";
    case "r-16-h-winner":
      return "qf-c_away";
    case "r-16-c-winner":
      return "qf-d_home";
    case "r-16-d-winner":
      return "qf-d_away";
    case "qf-a-winner":
      return "sf-a_home";
    case "qf-b-winner":
      return "sf-a_away";
    case "qf-c-winner":
      return "sf-b_home";
    case "qf-d-winner":
      return "sf-b_away";
    case "sf-a-runner-up":
      return "tp_home";
    case "sf-b-runner-up":
      return "tp_away";
    case "sf-a-winner":
      return "final_home";
    case "sf-b-winner":
      return "final_away";
    default:
      return null;
  }
};

export default function setPlayoff(code?: string) {
  if (code && (code.includes("group") || code.includes("sf"))) {
    return {
      winnerCode: String(matchTable(`${code}-winner`)),
      runnerUpCode: String(matchTable(`${code}-runner-up`)),
    };
  }
  return { winnerCode: String(matchTable(`${code}-winner`)) };
}
