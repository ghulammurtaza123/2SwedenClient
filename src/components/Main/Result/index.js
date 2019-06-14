import React from 'react'
import Trip from '../../Trip'

function selectedTrip(results, callback) {
    const forms = results.map((r, ri) => document.forms[`selectedRoute${ri}`])
    let arrSelected = []
    for (let i = 0; i < results.length; i++) {
        if (forms[i][`optradio${i}`].value === "") {
            forms[i][`tripButton${i}`].style.background = "#dc3545"

            return
        }

        arrSelected.push(results[i].data.routes[forms[i][`optradio${i}`].value])
        //console.log(forms[i][`optradio${i}`].value)

    }

    callback(arrSelected)

}


export default class Result extends React.Component {
    constructor() {
        super()
        this.state = {
            sortCat: "stops",
            isSortAsc: true
            
        }
        this.changeSort = this.changeSort.bind(this);
    }
    changeSort(event){
        // const target = (event.target.id)
        // console.log(event.target.id)
  
        const value = event.target.id
       
        if(this.state.sortCat === value){
           
            this.setState({isSortAsc:!this.state.isSortAsc})
            
        }
        else{
           
            this.setState({sortCat:value})
            
        }

        
             
    
    
    
    
    }
    render() {
        return (
            <div className="container">
                <h1 className="w-100 text-center text-blue">Choose one route per Trip</h1>
                {this.props.results.map((t, ti) =>
                    <Trip 
                        currencyCode={t.data.currencyCode} 
                        routes={t.data.routes} 
                        dataKey={ti} 
                        key={ti} 
                        start={t.start} 
                        stop={t.stop}
                        sortCat={this.state.sortCat}
                        isSortAsc={this.state.isSortAsc}
                        changeSort={this.changeSort}

                    />
                )}

                <button className="btn btn-block btn-danger" onClick={() => selectedTrip(this.props.results, x => this.props.changePageTo(x, "summary"))}>Continue</button>

            </div>

        )
    }


    // sortRoutes() {
    //     return
    //     // Sorts state.routes depending on value of element with id: "sortBy"
    //     let sortAlg
    //     switch (document.getElementById("sortBy").value) {
    //         case "duration":
    //             sortAlg = (r1, r2) => r1.duration - r2.duration
    //             break
    //         case "price":
    //             sortAlg = (r1, r2) => r1.price - r2.price
    //             break
    //         case "connections":
    //             sortAlg = (r1, r2) => r1.segments.length - r2.segments.length
    //             break
    //         default:
    //             sortAlg = (r1, r2) => r1.duration - r2.duration
    //     }

    //     let sortedList = this.state.routes.sort(sortAlg)

    //     this.setState({
    //         routes: sortedList
    //     })
    // }
}
