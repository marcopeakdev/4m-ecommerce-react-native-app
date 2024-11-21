import { getEntryById } from './contentfulApiCalls';

export const generalData = generalData => {
  const { data } = generalData;
  const { id, mainSections, secondarySections } = data;
  const { content } = data.details;

  return { id, content, mainSections, secondarySections };
};

export const mainSectionData = data => {
  const { id, icon, photo, title, titleIcon, active } =
    data.data;
  const { content } = data.data.details;

  return {
    id,
    icon,
    photo,
    title,
    titleIcon,
    content,
    active
  };
};

export const secondarySectionData = data => {
  const { id, titleIcon, title, active, faq } = data.data;
  const { content } = data.data.details;

  return {
    id,
    titleIcon,
    title,
    active,
    content,
    faq
  };
};
