/** @format */

export type overviewCardPropTypes = {
  icon: any;
  title: string;
  description: string;
  link: string;
  images: string[];
};

export type subcategoryCardPropTypes = {
  subcategory: {
    image: string;
    title: string;
    allocated_budget: number;
    active_projects: number;
    username: string;
  };
};
