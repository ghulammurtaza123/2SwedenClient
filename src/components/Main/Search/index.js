import React from "react"
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

import { get_r2r2, get_CC } from "../../../tools/DAO"
import DayOfEvents from "../../DayOfEvents";

const events = require("../../../tools/Events.json")



export default class Search extends React.Component {
    constructor() {
        super()

        this.state = {
            localCurrency: "$$$",
            highlights: []
        }
    }

    componentDidMount() {
        get_CC(curr => this.setState({ localCurrency: curr }))
    }


    highlight(event) {
        const target = event.target
        const value = target.value
        let highlights = this.state.highlights

        highlights = highlights.filter(e => e !== value)


        if (target.className.includes("active"))
            highlights.push(value)


        this.setState({ highlights: highlights })
        // console.log(highlights)
    }


    render() {
        let i = 0 //Each Route needs a unique key.
        let eventNamesList = {}
        const cityNames = ["Stockholm", "Åre", "Falun"]

        events.flatMap(day => Object.values(day.events))
            .forEach(city => city.forEach(event => eventNamesList[event.name] = ""))
        eventNamesList = Object.keys(eventNamesList)

        return (
            <div className="container">
                {/* <h1 className="w-100 text-center text-blue">Choose Origin and select events</h1> */}
                <form name="search" className="row" onSubmit={e => e.preventDefault()}>
                    <div className="col-12 col-md-3">
                        <input
                            required
                            placeholder="🔍From"
                            name="origin"
                            className="form-control"
                        />
                        <div className="form-group w-100">
                            <select name="currencyCode" className="custom-select">
                                <option value={this.state.localCurrency}>{`Local currency(${this.state.localCurrency})`}</option>
                                <option value="USD">USD</option>
                                <option value="EUR">EUR</option>
                                <option value="CAD">CAD</option>
                                <option value="CHF">CHF</option>
                                <option value="GBP">GBP</option>
                                <option value="HUF">HUF</option>
                                <option value="NOK">NOK</option>
                                <option value="PLN">PLN</option>
                                <option value="SEK">SEK</option>
                            </select>
                        </div>
                    </div>
                    <div className="btn-group btn-group-toggle overflow-auto col-12 col-md-9 p-0 my-rounded">
                        {eventNamesList.map((e, ei) =>
                            <button key={ei} onClick={ev => this.highlight(ev)} value={e} type="button" className="btn btn-primary" data-toggle="button">
                                {e}
                            </button>)
                        }
                    </div>
                </form>
                <div className="row py-2">
                    <Carousel
                        responsive={{
                            desktop: {
                                breakpoint: { max: 3000, min: 1024 },
                                items: 5
                            },
                            tablet: {
                                breakpoint: { max: 1024, min: 576 },
                                items: 3
                            },
                            mobile: {
                                breakpoint: { max: 576, min: 0 },
                                items: 2
                            }
                        }}
                    >
                        <div className="h-100 mx-1">

                            <div className="list-group my-city-list h-100">

                                <button
                                    className={"list-group-item list-group-item-action list-group-item-danger active my-rounded text-center"}
                                >
                                    City
        </button>
                                {cityNames.map((e, ei) =>
                                    <button key={ei} className={"list-group-item list-group-item-action my-1 my-rounded overflow-auto bkg-"+(e ==="Åre"?"are":e)}>

                                        <div className="d-flex justify-content-center align-items-start py-1" >
                                            <h4 className={"m-0 text-yellow "}>{e}</h4>
                                        </div>

                                    </button>)}
                            </div>
                        </div>

                        {events.map(d =>
                            <DayOfEvents date={d.date} events={d.events} key={i++} highlights={this.state.highlights} />
                        )}
                    </Carousel>
                </div>
                <div className="row">
                    <button onClick={() => this.search()} className="btn btn-primary mb-0 text-yellow btn-block">Search</button>
                </div>
            </div>
        )
    }



    search() {
        const searchForm = document.forms["search"]
        const dayForms = events.map((day, dayIndex) => document.forms[`day-${dayIndex + 1}`])

        const origin = searchForm["origin"].value
        if (origin.trim() === "") {
            searchForm["origin"].style.background = "#dc3545"
            window.scrollTo(0, 0)
            return
        }
        const currency = searchForm["currencyCode"].value

        let stops = {
            0: origin
        }

        const choices = ["none", "Stockholm", "Are, Sweden", "Falun"]
       

        dayForms.map(f => {
            for (let c of choices) {
                if (f[c].className.includes("active")) {
                    return c
                }
              
            }
            
            return null
        }).forEach((c, ci) => {
            if (c !== "none") {

                const x = Object.values(stops)

                if (x[Object.keys(stops).reduce((o1, o2) => Math.max(Number.parseInt(o1), Number.parseInt(o2)))] !== c)
                    stops[ci + 1] = c
            }
        })

        if(Object.keys(stops).length === 1) {
            window.scrollTo(0, 0)
                alert("Choose an event")
                return
        }

        stops[Object.keys(stops).reduce((o1, o2) => Math.max(Number.parseInt(o1), Number.parseInt(o2))) + 2] = origin


        let y = Object.values(stops)
        let routes = []

        y.forEach((city, index) => {
            const nextCity = y[index + 1]
            if (nextCity !== undefined && nextCity !== city )
                routes.push({
                    origin: city,
                    destination: nextCity
                })
        })

        // if (routes[0].origin === routes[0].destination) {
        //     window.scrollTo(0, 0)
        //     alert("Choose an event")
        //     return
        // }

        get_r2r2(routes, currency, d => {
            return this.props.changePageTo(d, "result")
        })
    }
}

