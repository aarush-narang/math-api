import { gql } from '@apollo/client';

export const booksQuery = gql`
    query getBooksQuery {
        books {
		    id
            name
            author {
                name
            }
        }
    }   
`;