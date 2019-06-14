import React from "react"
import {minutesToHM} from "../../tools/StringFormating"

export default function Segment(props) {
    return (
        <div className={"segment2 m-0 "+ (props.blue? "yellow" : "blue")}>

            <p className="col m-0">{`${props.from}-${props.to}`}</p>
            <p className="col yellow m-0">{props.transport}</p>
            <p className="col m-0">{minutesToHM(props.duration)}</p>
            <p>{`${props.price}`}</p>
        </div>
    )
}