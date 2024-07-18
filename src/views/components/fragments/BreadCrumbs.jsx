import React, { useEffect, useState } from 'react'
import { MDCON, RICON, RXCON } from '../../../lib/icons'
import BreadCrumbsItem from '../elements/BreadCrumbsItem';
import { useLocation } from 'react-router-dom';

const BreadCrumbs = () => {

    const [current,setCurrent] = useState("/dashboard")
    const [active,setActive] = useState(null)

    const {text,icon,path} = link.filter((item)=> item.text === "Admin")
    const links = link.filter((item)=>item.text !== "Admin");
    const currentLink = useLocation().pathname
    useEffect(()=>{
        setCurrent(currentLink)
        setActive(links.filter((item)=>item.path === current))
    },[currentLink,current])
  return(
    <div class="breadcrumbs text-3xl">
  <ul>
    <BreadCrumbsItem
        icon={icon}
        text={text}
        path={path}
    />
    {
        active && (
            <BreadCrumbsItem
                icon={active.icon}
                text={active.text}
                path={active.path}
            />
        )
    }
  </ul>
</div>
  )
}

const link = [
    {
      text: "Admin",
      icon: <MDCON.MdAdminPanelSettings/>,
      path: "/dashboard"  
    },
    {
        text: "Dashboard",
        icon: <MDCON.MdHomeFilled/>,
        path: "/dashboard"  
    },
    {
        text: "Machine",
        icon: <RICON.RiRobot3Fill/>,
        path: "/machine"  
    },
    {
        text: "Admin",
        icon: <RXCON.RxActivityLog/>,
        path: "/log-activity"  
    },
]

export default BreadCrumbs