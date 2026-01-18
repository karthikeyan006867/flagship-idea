import { gql } from '@apollo/client';

export const CREATE_DECISION = gql`
  mutation CreateDecision($input: CreateDecisionInput!) {
    createDecision(createDecisionInput: $input) {
      id
      title
      description
      category
      confidence
      riskLevel
      alternatives
      context
      createdAt
    }
  }
`;

export const GET_DECISIONS = gql`
  query GetDecisions {
    decisions {
      id
      title
      description
      category
      confidence
      riskLevel
      createdAt
      outcomes {
        id
        status
        createdAt
      }
    }
  }
`;

export const GET_DECISION = gql`
  query GetDecision($id: String!) {
    decision(id: $id) {
      id
      title
      description
      category
      context
      confidence
      riskLevel
      alternatives
      createdAt
      updatedAt
      outcomes {
        id
        description
        status
        metrics
        createdAt
      }
    }
  }
`;

export const UPDATE_DECISION = gql`
  mutation UpdateDecision($id: String!, $input: UpdateDecisionInput!) {
    updateDecision(id: $id, updateDecisionInput: $input) {
      id
      title
      description
      confidence
      riskLevel
      updatedAt
    }
  }
`;

export const DELETE_DECISION = gql`
  mutation DeleteDecision($id: String!) {
    removeDecision(id: $id)
  }
`;

export const GET_STATS = gql`
  query GetStats {
    decisions {
      id
      category
      confidence
      riskLevel
      createdAt
    }
  }
`;
