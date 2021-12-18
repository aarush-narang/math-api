import {
    gql,
} from "@apollo/client";

export const solveQuadraticQuery = gql`
  query solveQuadraticQuery($y: Float!, $a: Float!, $b: Float!, $c: Float!) {
    solveQuadratic(y: $y, a: $a, b: $b, c: $c) {
      roots
      vertex
      yIntercept
    }
  }
`;