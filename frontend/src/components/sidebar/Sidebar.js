import React, { useState, useEffect } from "react";
import "./Sidebar.scss";
import { HiMenuAlt3 } from "react-icons/hi";
import { SiYourtraveldottv } from "react-icons/si";
import { FaTh, FaCommentAlt, } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { MdOutlineRecommend, MdOutlineScreenSearchDesktop } from "react-icons/md";
import { BiMessageSquareAdd } from "react-icons/bi";
import SidebarItem from "./SidebarItem";
import { useNavigate } from "react-router-dom";
import { getUser } from "../../services/authService";

const Sidebar = ({ children }) => {
  const [isOpen, setIsOpen] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  const navigate = useNavigate();

  const goHome = () => {
    navigate("/");
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await getUser();
        setIsAdmin(user.admin === "true");
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUser();
  }, []);

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
      title: "Contact us",
      icon: <FaCommentAlt />,
      path: "/contactus",
    },
  ];

  if (isAdmin) {
    menu.push({
      title: "Add destination",
      icon: <BiMessageSquareAdd />,
      path: "/add-destination",
    });
  }

  return (
    <div className="layout">
      <div className="sidebar" style={{ width: isOpen ? "230px" : "60px" }}>
        <div className="top_section">
          <div className="logo" style={{ display: isOpen ? "block" : "none" }}>
            <SiYourtraveldottv
              size={30}
              style={{ cursor: "pointer" }}
              onClick={goHome}
            />
          </div>

          <div className="bars" style={{ marginLeft: isOpen ? "100px" : "0px" }}>
            <HiMenuAlt3 size={30} onClick={toggle} />
          </div>
        </div>
        {menu.map((item, index) => {
          return <SidebarItem key={index} item={item} isOpen={isOpen} />;
        })}
      </div>

      <main
        style={{
          paddingLeft: isOpen ? "230px" : "60px",
          transition: "all .5s",
        }}
      >
        {children}
      </main>
    </div>
  );
};

export default Sidebar;
