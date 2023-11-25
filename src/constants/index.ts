import { MdOutlineHome, MdOutlinePeople, MdOutlineBookmarkBorder, MdOutlineAddBox } from 'react-icons/md';
import { TbWorld } from 'react-icons/tb';

export const getSidebarLinks = () => [
  {
    Icon: MdOutlineHome,
    route: "/",
    label: "Home",
  },
  {
    Icon: TbWorld,
    route: "/explore",
    label: "Explore",
  },
  {
    Icon: MdOutlinePeople,
    route: "/all-users",
    label: "People",
  },
  {
    Icon: MdOutlineBookmarkBorder,
    route: "/saved",
    label: "Saved",
  },
  {
    Icon: MdOutlineAddBox,
    route: "/create-post",
    label: "Create Post",
  },
];

export const getBottombarLinks = () => [
  {
    Icon: MdOutlineHome,
    route: "/",
    label: "Home",
  },
  {
    Icon: TbWorld,
    route: "/explore",
    label: "Explore",
  },
  {
    Icon: MdOutlineBookmarkBorder,
    route: "/saved",
    label: "Saved",
  },
  {
    Icon: MdOutlineAddBox,
    route: "/create-post",
    label: "Create",
  },
];