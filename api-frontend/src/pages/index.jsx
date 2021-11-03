import React from "react";
import { useQuery, useMutation } from '@apollo/client';
import { booksQuery } from '../graphql/queries/queries';
import { mutation } from '../graphql/mutations/mutations';

export function HomePage() {
    const { loading, error, data } = useQuery(booksQuery)
    if (!loading && !error) {
        const books = data.books
        console.log(books)
        return (
            books.map(book => {
                return (
                    <div>
                        <h2>{book.name}</h2>
                        <h3>{book.author.name}</h3>
                    </div>
                )
            })
        )
    }
    else {
        return <p>{JSON.stringify(error)}</p>
    }
}