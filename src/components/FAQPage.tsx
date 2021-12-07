import { Typography } from "@mui/material";
import {dispatch_to_props, FullProps, state_to_props} from "../redux/redux";
import {connect} from "react-redux";
import '../styles/FAQPage.css';

function FAQPage(Props: FullProps) {

    
    return (
        <div className = "FAQPage">
           <div className="TitleText">
            <Typography variant="h4">
               Frequently Asked Questions
            </Typography>
           </div>
          
           <div className="TitleText">
           <Typography variant="h5">
                Question 1
            </Typography>
           <Typography variant="body1">
                Answer 1
            </Typography>
           </div>
        </div>
    )
}

export default connect(state_to_props, dispatch_to_props)(FAQPage);