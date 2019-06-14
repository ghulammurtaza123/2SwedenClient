import React from "react"
import Segment from "../Segment"
import { minutesToHM } from "../../tools/StringFormating"
import Maps from "../Map";



export default function Route(props) {
    let isBlue = 0;
    let list = props.segments.map(s => s.sInfo);
    list.push(props.segments[props.segments.length - 1].eInfo);

    let list2 = []
    props.segments.map(s => s.path.map(p => list2.push(p)))

    const tableId = `table-${props.dataKey}-${props.tripDataKey}`

    const updateInfoLogo = () => {
        const btn = document.getElementById(tableId+"-info-btn")
        const info = document.getElementById(tableId+"-info")
        if (btn.attributes["aria-expanded"])
            info.className = btn.attributes["aria-expanded"].value === "true" ? "fa fa-caret-down" : "fa fa-caret-right"
    }

    return (

        <tbody>
            <tr className={"blue my-rounded tr " + (props.tripDataKey === undefined ? " segment2 " : " segment ")} onClick={updateInfoLogo}>
                <td data-target={`#${tableId}`}
                    data-toggle="collapse" className="col " >

                    <i id={tableId+"-info"} className={"fa fa-caret-right"}
                        style={{ fontSize: "18px", position: "relative", float: "left" }}
                    />
                    {props.segments[0].from} - {props.segments[props.segments.length - 1].to}
                </td>
                <td id={tableId+"-info-btn"}
                    data-target={`#${tableId}`}
                    data-toggle="collapse" 
                    className="col">{props.segments.map(s => s.transport).join(" - ")}</td>
                <td data-target={`#${tableId}`}
                    data-toggle="collapse" className="col">{minutesToHM(props.duration)}</td>
                <td data-target={`#${tableId}`}
                    data-toggle="collapse">{props.price}</td>
                {props.tripDataKey === undefined ? <td style={{display: "none"}}></td> : <td> <input type="radio" className="handOnHover" name={`optradio${props.tripDataKey}`} value={props.dataKey} /></td>}




            </tr>

            <tr className="tr">

                <td colSpan="20" className='my-rounded text-center table collapse' id={tableId} >
                    <div className="p-0 row" >
                   
                        <div className="col-12 col-lg-6 border-right-2 bg-seablue tables" >
                           <div className="p-5" >
                            <div className="segment2 title">
                                <h5>{"From-To "}</h5>
                                <h5>{"Transport "}</h5>
                                <h5>{"Duration "}</h5>
                                <h5>{`Price(${props.currency})`}</h5>
                            </div>



                            {props.segments.map(s => <Segment
                                key={s.index}
                                transport={s.transport}
                                from={s.from}
                                to={s.to}
                                price={s.price}
                                duration={s.duration}
                                currency={s.currency}
                                blue={isBlue++ % 2 === 1}
                            />)}
                        </div>
                        </div>
                        <div className="col-12 col-lg-6 border-right-2 p-0 h-100">
                            <Maps places={list} path={list2} />

                        </div>
                    </div>


                </td>

            </tr>

        </tbody>


    )

}