

import { FaTh, FaCommentAlt, } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { MdOutlineRecommend, MdOutlineScreenSearchDesktop } from "react-icons/md";

const menu = [
  {
    title: "Dashboard",
    icon: <FaTh />,
    path: "/dashboard",
  },
  {
    title: "Recommendation",
    icon: <MdOutlineRecommend />,
    path: "/recommendation",
  },
  {
    title: "Top Destinations",
    icon: <MdOutlineScreenSearchDesktop />,   
    path: "/top-destinations",
  },
  {
    title: "Account",
    icon: <CgProfile />,
    childrens: [
      {
        title: "Profile",
        path: "/profile",
      },
      {
        title: "Edit Profile",
        path: "/edit-profile",
      },
    ],
  },
  {
    title: "Report Bug",
    icon: <FaCommentAlt />,
    path: "/contactus",
  },
  {
    title: "Add destination",
    icon: <FaCommentAlt />,
    path: "/add-destination",
  },
];

export default menu;



/*
import { FaTh, FaCommentAlt, } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { MdOutlineRecommend, MdOutlineScreenSearchDesktop } from "react-icons/md";
import { ShowOnAdminLogin } from "../components/protect/HiddenLiks";


const menu = [
  {
    title: "Dashboard",
    icon: <FaTh />,
    path: "/dashboard",
  },
  {
    title: "Recommendation",
    icon: <MdOutlineRecommend />,
    path: "/recommendations",
  },
  {
    title: "Top Destinations",
    icon: <MdOutlineScreenSearchDesktop />,   
    path: "/top-destinations",
  },
  {
    title: "Account",
    icon: <CgProfile />,
    childrens: [
      {
        title: "Profile",
        path: "/profile",
      },
      {
        title: "Edit Profile",
        path: "/edit-profile",
      },
    ],
  },
  {
    title: "Report Bug",
    icon: <FaCommentAlt />,
    path: "/contactus",
  },

  {
    
    title: "Add destination",
    icon: <FaCommentAlt />,
    path: "/add-destination",
    
  },
  
];

export default menu;
*/










