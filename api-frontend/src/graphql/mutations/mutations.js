import { gql } from '@apollo/client';

export const mutation = gql`
    mutation mutationname($param1: String!, $param2: Int) {
        mutationname(param1: $param1value, param2: $param2value) {
            returnvalue1
            returnvalue2
        }
    }
`;