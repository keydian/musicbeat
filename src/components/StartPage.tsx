import { Typography } from "@mui/material";
import {useEffect, useState} from 'react'
import {dispatch_to_props, FullProps, state_to_props} from "../redux/redux";
import {connect} from "react-redux";
import '../styles/StartPage.css';
import {Song} from "../types/types";
import {getHomepage} from "../axios/axios";
import DiscoveryQueue from "../components/trending/DiscoveryQueue"
import Trending from "../components/trending/Trending"

function StartPage(Props: FullProps) {

const [discoveryQueue, setDiscoveryQueue]=useState<Song[]>()
const [trending, setTrending]=useState<Song[]>()

const getHomepageSongs = () =>{
    if(Props.isLogged){
        getHomepage().then(
            res =>{
                setDiscoveryQueue(res.data[0]);
                setTrending(res.data[1])
                console.log("Homepage set.")
            }
        ).catch(
            err =>{
                if (err.response) {
                    console.log(err.response)
                    alert(err.response.message)
                }
            }
        )
    }
}
    useEffect(()=>{
        getHomepageSongs()
    }, [Props.isLogged])

    
    return (
        <div className = "StartPage">
           <div className="TitleText">
            <Typography variant="h5">
               Your Discovery
            </Typography>
           </div>
           <div className="DiscoveryQueue">
           <div>
               {discoveryQueue !== undefined &&
                <DiscoveryQueue
                songs={discoveryQueue}
                ></DiscoveryQueue>
               }
           </div>
           </div>
          
           <div className="TitleText">
           <Typography variant="h5">
                Trending
            </Typography>
           </div>
           <div className = "Trending">
               <div>
               {trending !== undefined &&
                    <Trending songs={trending}/>
                }
               </div>
           </div>
        </div>
    )
}

export default connect(state_to_props, dispatch_to_props)(StartPage);