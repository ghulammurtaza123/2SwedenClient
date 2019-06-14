const decodePolyline = require('decode-google-map-polyline');


export function get_r2r(origin, destination, currencyCode, callback=(e)=>(e)) {
    return fetch(`api/r2r/${origin}/${destination}/${currencyCode}`)
        // .then(d => {
        //     console.log(d)
        //     return d
        // })
        
        .then(res => res.json())
           .then(data => {
        //    console.log(data) // for debugging
            

            let routes = data.routes.map(r => {
                // console.log(r)  //For debugging

                let segments = r.segments.map((s, si) => {
                    return {
                        path:(s.segmentKind==="surface")
                            ? decodePolyline(s.path) :
                            [
                                {
                                    lat: data.places[s.depPlace].lat, 
                                    lng: data.places[s.depPlace].lng 
                                },
                                {
                                    lat: data.places[s.arrPlace].lat, 
                                    lng: data.places[s.arrPlace].lng
                                }
                            ],
                        transport: data.vehicles[s.vehicle].name,
                        from: data.places[s.depPlace].shortName,
                        to: data.places[s.arrPlace].shortName,
                        sInfo: {
                            coords:{
                                lat: data.places[s.depPlace].lat, 
                                lng: data.places[s.depPlace].lng 
                            }, 
                            name:data.places[s.depPlace].shortName
                        },
                        eInfo:{
                            coords:{
                                lat: data.places[s.arrPlace].lat, 
                                lng: data.places[s.arrPlace].lng 
                            }, 
                            name:data.places[s.arrPlace].shortName
                        },
                        price: (s.indicativePrices)?s.indicativePrices[0].price : "-",
                        currency: (s.indicativePrices)?s.indicativePrices[0].currency:"",
                        duration: s.transitDuration,
                        index: si
                    }
                })

                return {
                    duration: r.totalDuration,
                    price: (r.indicativePrices)?r.indicativePrices[0].price:"-", //If price is unknown, set to "-".
                    currency: (r.indicativePrices)?r.indicativePrices[0].currency:"", //If no price, set currency to empty string.
                    segments: segments,
                    startPoint: data.places[r.segments[0].depPlace].shortName,
                    endPoint: data.places[r.segments[r.segments.length-1].arrPlace].shortName
                }
            })
           
            return {
                oCoords: {lat: data.places[0].lat, lng:data.places[0].lng},
                dCoords: {lat: data.places[1].lat, lng:data.places[1].lng},
                data: data.data,
                routes: routes,
                currencyCode: data.routes[0].indicativePrices[0].currency
            }
    
        })
        .then(d => {
            callback(d)
            return d
        })
        .catch(console.error)
}

export function get_CC(callback=(e)=>(e)) {
    
    fetch(`api2/CC`)
        // .then(d => {
        //     console.log(d)
        //     return d
        // })
        
        .then(res => res.json())
           .then(data => {
               return data.currency.code
    
        })
        .then(d => {
            callback(d)
            return d
        })
        .catch(console.error)

}

export function get_r2r2(arr, currencyCode, callback=(e)=>(e)) {

    arr = arr.map(t => {
        return {
            key: `${t.origin}-${t.destination}`,
            trip: t
        }
    })

    let trips = {}

    arr.forEach(t => {
        trips[t.key] = t.trip
    })



    return Promise.all(Object.values(trips).map(e => get_r2r(e.origin, e.destination, currencyCode)))
        .then(d => {

            return arr.map(trip => {
                if(trip.trip.origin === trip.trip.destination){
                    return null
                }
                return {
                    data: d.find(p => (p.data === trip.key)),
                    start: (trip.trip.origin === "Are, Sweden")?"Åre":trip.trip.origin,
                    stop: (trip.trip.destination === "Are, Sweden")?"Åre":trip.trip.destination
                }
            })
        })
        .then(d => {
            callback(d)
            return d
    })
}
