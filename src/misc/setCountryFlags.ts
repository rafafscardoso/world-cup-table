export default function setCountryFlags(code?: string | null) {
  switch (code) {
    case "ARG":
      return {
        name: "Argentina",
        flag: "/images/flags/argentina.png",
      };
    case "AUS":
      return {
        name: "Australia",
        flag: "/images/flags/australia.png",
      };
    case "BEL":
      return {
        name: "Belgica",
        flag: "/images/flags/belgium.png",
      };
    case "BRA":
      return {
        name: "Brasil",
        flag: "/images/flags/brazil.png",
      };
    case "CAN":
      return {
        name: "Canada",
        flag: "/images/flags/canada.png",
      };
    case "CMR":
      return {
        name: "Camarões",
        flag: "/images/flags/cameroon.png",
      };
    case "CRC":
      return {
        name: "Costa Rica",
        flag: "/images/flags/costa_rica.png",
      };
    case "CRO":
      return {
        name: "Croácia",
        flag: "/images/flags/croatia.png",
      };
    case "DEN":
      return {
        name: "Dinamarca",
        flag: "/images/flags/denmark.png",
      };
    case "ECU":
      return {
        name: "Equador",
        flag: "/images/flags/ecuador.png",
      };
    case "ENG":
      return {
        name: "Inglaterra",
        flag: "/images/flags/england.png",
      };
    case "ESP":
      return {
        name: "Espanha",
        flag: "/images/flags/spain.png",
      };
    case "FRA":
      return {
        name: "França",
        flag: "/images/flags/france.png",
      };
    case "GER":
      return {
        name: "Alemanha",
        flag: "/images/flags/germany.png",
      };
    case "GHA":
      return {
        name: "Gana",
        flag: "/images/flags/ghana.png",
      };
    case "IRN":
      return {
        name: "Irã",
        flag: "/images/flags/iran.png",
      };
    case "JPN":
      return {
        name: "Japão",
        flag: "/images/flags/japan.png",
      };
    case "KOR":
      return {
        name: "Coréia do Sul",
        flag: "/images/flags/south_korea.png",
      };
    case "KSA":
      return {
        name: "Arábia Saudita",
        flag: "/images/flags/saudi_arabia.png",
      };
    case "MAR":
      return {
        name: "Marrocos",
        flag: "/images/flags/morocco.png",
      };
    case "MEX":
      return {
        name: "México",
        flag: "/images/flags/mexico.png",
      };
    case "NED":
      return {
        name: "Países Baixos",
        flag: "/images/flags/netherlands.png",
      };
    case "POL":
      return {
        name: "Polônia",
        flag: "/images/flags/poland.png",
      };
    case "POR":
      return { name: "Portugal", flag: "/images/flags/portugal.png" };
    case "QAT":
      return {
        name: "Catar",
        flag: "/images/flags/qatar.png",
      };
    case "SEN":
      return {
        name: "Senegal",
        flag: "/images/flags/senegal.png",
      };
    case "SRB":
      return {
        name: "Sérvia",
        flag: "/images/flags/serbia.png",
      };
    case "SUI":
      return {
        name: "Suíça",
        flag: "/images/flags/switzerland.png",
      };
    case "TUN":
      return {
        name: "Tunísia",
        flag: "/images/flags/tunisia.png",
      };
    case "URU":
      return {
        name: "Uruguai",
        flag: "/images/flags/uruguay.png",
      };
    case "USA":
      return {
        name: "Estados Unidos",
        flag: "/images/flags/usa.png",
      };
    case "WAL":
      return {
        name: "País de Gales",
        flag: "/images/flags/wales.png",
      };
    default:
      return { name: "", flag: "" };
  }
}
