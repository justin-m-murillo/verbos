import { 
  TbHome, 
  TbWorld, 
  TbUsersGroup,
  TbBookmark,
  TbBookmarkFilled,
  TbBookmarks, 
  TbPhoto,
  TbPhotoEdit,
  TbPhotoPlus,
  TbLogout,
  TbEdit,
  TbHeartFilled,
  TbHeartPlus,
  TbTrash,
  TbMapPin,
  TbSearch,
  TbFilterSearch,
} from 'react-icons/tb';

export const twIconColor           = 'text-indigo-500';
export const twIconLikedColor      = 'text-rose-600'; 
export const twImgPlaceholderColor = 'text-zinc-800';
export const twSearchColor         = 'text-zinc-500';
export const twTrashColor          = 'text-zinc-500';
export const twTrashColorHover     = 'hover:text-rose-800';

export const IconHome         = TbHome;
export const IconWorld        = TbWorld;
export const IconPeople       = TbUsersGroup;
export const IconSave         = TbBookmark;
export const IconSaveFilled   = TbBookmarkFilled;
export const IconAllSaved     = TbBookmarks;
export const IconPost         = TbPhoto;
export const IconPostCreate   = TbPhotoPlus;
export const IconPostEdit     = TbPhotoEdit;
export const IconPostDelete   = TbTrash;
export const IconLogout       = TbLogout;
export const IconEdit         = TbEdit;
export const IconHeartPlus    = TbHeartPlus;
export const IconHeartLiked   = TbHeartFilled;
export const IconMapPin       = TbMapPin;
export const IconSearch       = TbSearch;
export const IconSearchFilter = TbFilterSearch;

export const getSidebarLinks = () => [
  {
    Icon: IconHome,
    route: "/",
    label: "Home",
  },
  {
    Icon: IconWorld,
    route: "/explore",
    label: "Explore",
  },
  {
    Icon: IconPeople,
    route: "/all-users",
    label: "People",
  },
  {
    Icon: IconAllSaved,
    route: "/saved",
    label: "Saved",
  },
  {
    Icon: IconPostCreate,
    route: "/create-post",
    label: "Create Post",
  },
];

export const getBottombarLinks = () => [
  {
    Icon: IconHome,
    route: "/",
    label: "Home",
  },
  {
    Icon: IconWorld,
    route: "/explore",
    label: "Explore",
  },
  {
    Icon: IconAllSaved,
    route: "/saved",
    label: "Saved",
  },
  {
    Icon: IconPostCreate,
    route: "/create-post",
    label: "Create",
  },
];