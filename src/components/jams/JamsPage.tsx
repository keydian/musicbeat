import { connect } from "react-redux";
import { dispatch_to_props, FullProps, state_to_props } from "../../redux/redux";


function JamsPage(Props : FullProps) {


    return (
        <div>

        </div>
    )
}

export default connect(state_to_props,dispatch_to_props)(JamsPage)