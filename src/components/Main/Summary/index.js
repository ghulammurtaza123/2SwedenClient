import React from 'react'
import Route from '../../Route'

export default function Summary(props) {
    return (
        <div>
            <h1 className="w-100 text-center text-blue">My Adventure To Sweden</h1>

            <table className="my-rounded text-center table-borderless table">
                <thead >
                    <tr className="segment2 title tr">

                        <th scope="col">From --> To </th>
                        <th scope="col">Transport </th>
                        <th scope="col">Duration </th>
                        
                        <th scope="col">Price({props.routes[0].currency}) </th>
                    </tr>
                </thead>
                {props.routes.map((r, ri) => {
                    return <Route
                        key={ri}
                        dataKey={ri}
                        currency={r.currency}
                        segments={r.segments}
                        duration={r.duration}
                        price={r.price}
                        origin={r.startPoint}
                        destination={r.endPoint}
                    />
                })}
                </table>
        </div>
               

        
    )
}
