import React from "react"


function CityButton(props) {
    let i = 1

    return (
        <button name={props.city} type="button" data-toggle="list" className={"list-group-item list-group-item-action my-1 my-rounded blue overflow-auto"} id={`${props.day}${props.city[0]}`}>
                {props.events.map(e => 
                    <div className="d-flex justify-content-between py-1" key={i++}>
                        <p className={"m-0"+(props.highlights.includes(e.name)? " text-yellow": "")}>{e.name}</p>
                        {(e.isMedal) ? <i className="fas fa-award align-self-center"></i> : ""}
                    </div>
                )}
        </button>
    )
} 

export default function DayOfEvents(props) {
    const dayNo = Number.parseInt(props.date.substring(0,2))-6

    return (
        <form name={`day-${dayNo}`} className="h-100 mx-1">
           
            <div className="list-group my-city-list h-100">

            <button
                name="none"
                type="button" 
                data-toggle="list" 
                className={"list-group-item list-group-item-action list-group-item-danger active my-rounded"}
            >
                <h6 className="text-center">{props.date}</h6>
                <h6 className="text-center">{`(Day ${dayNo})`}</h6>
        </button>
                
                    <CityButton
                        highlights={props.highlights}
                        city={"Stockholm"}
                        day={Number.parseInt(props.date.substring(0,2))-6}
                        events={props.events.s}
                    />
                    <CityButton
                        highlights={props.highlights}
                        city={"Are, Sweden"}
                        day={Number.parseInt(props.date.substring(0,2))-6}
                        events={props.events.å}
                    />
                    <CityButton
                        highlights={props.highlights}
                        city={"Falun"}
                        day={Number.parseInt(props.date.substring(0,2))-6}
                        events={props.events.f}
                    />
            </div>
        </form>
    )
}