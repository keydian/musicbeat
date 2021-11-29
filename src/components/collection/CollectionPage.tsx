import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { getFullCollection } from "../../axios/axios";
import { dispatch_to_props, FullProps, state_to_props } from "../../redux/redux";
import { CollectionFull } from "../../types/types";


function CollectionPage(Props : FullProps) {
    let collectionid = useParams().collectionid;
    let navigate = useNavigate();
    const [collection, setCollection] = useState<CollectionFull>()
    

    useEffect(() => {
        if(collectionid && Props.isLogged) {
            getFullCollection(collectionid).then(
                res => {
                    setCollection(res.data)
                }
            ).catch(
                err => {
                    if (err.response) {
                        console.log(err.response)
                    }
                }
            )
        }
    }, [Props.isLogged, collectionid])

    return (
        <div className="CollectionPageWrapper">
            <div className="ColPageUpper">
                
            </div>
            <div className="ColPageLower">

            </div>
        </div>
    )
}

export default connect(state_to_props,dispatch_to_props)(CollectionPage)

