import React from "react";
import { useQuery, useMutation } from '@apollo/client';
import { solveQuadraticQuery } from '../graphql/queries/queries';
import { mutation } from '../graphql/mutations/mutations';

export function HomePage() {
    const { loading, error, data } = useQuery(solveQuadraticQuery, { variables: { y: 0, a: 1, b: 4, c: 5 } })
    if (!loading && !error) {
        return (
            <div>
                {data.solveQuadratic.roots[0]}, {data.solveQuadratic.roots[1]}
            </div>
        )
    }
    else {
        return <p>{JSON.stringify(error)}</p>
    }
}