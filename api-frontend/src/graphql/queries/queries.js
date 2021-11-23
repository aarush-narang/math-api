import {
    gql
} from "@apollo/client";

export const solveQuadraticQuery = gql`
  query solveQuadraticQuery($y: GraphQLNumber!, $a: GraphQLNumber!, $b: GraphQLNumber!, $c: GraphQLNumber!) {
    solveQuadratic(y: $y, a: $a, b: $b, c: $c) {
      roots
    }
  }
`;