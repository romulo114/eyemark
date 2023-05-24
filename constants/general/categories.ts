import {
  Minstry1,
  Minstry2,
  Minstry3,
  Minstry4,
  Sector1,
  Sector2,
  Sector3,
  Sector4,
  State1,
  State2,
  State3,
  State4,
} from "@/public/assets/PNG";
import { Ministries, Sectors, States } from "@/public/assets/SVG/categories";

const categoriesData: {
  title: string;
  link: string;
  images: any;
  description: string;
  icon: any;
}[] = [
  {
    title: "Sectors",
    link: "sectors",
    images: [Sector1, Sector2, Sector3, Sector4],
    description:
      "From aviation to healthcare and other sectors of the Nigerian economy, Eyemark keeps you up to date on the status of each project along with additional information like the allocated budget and many more.",
    icon: Sectors,
  },
  {
    title: "Ministries",
    link: "ministries",
    images: [Minstry1, Minstry2, Minstry3, Minstry4],
    description:
      "The Federal Ministries of Nigeria are civil service entities that are responsible for delivering various types of government service.",
    icon: Ministries,
  },
  {
    title: "States",
    link: "states",
    images: [State1, State2, State3, State4],
    description:
      "With a federation of 36 states and a federal capital territory, view projects as they are classified according to each state.",
    icon: States,
  },
];

export default categoriesData;
