import { gql } from '@apollo/client';

export const GET_ALL_PLANETS = gql`
  query GetAllPlanets {
    getAllPlanets {
      id
      name
      textureUrl
      diameter
      temp
      detailInfo
    }
  }
`;

export const GET_ALL_SCIENTISTS = gql`
  query GetAllScientists {
    getAllScientists {
      id
      name
      field
      bio
      image
      achievements
    }
  }
`;

export const GET_ALL_MISSIONS = gql`
  query GetAllMissions {
    getAllMissions {
      id
      name
      status
      description
      agency
      year
      details
      objectives
    }
  }
`;

// Authentication Mutations
export const SIGNUP_MUTATION = gql`
  mutation Signup($email: String!, $password: String!, $name: String!) {
    signup(email: $email, password: $password, name: $name) {
      token
      user {
        id
        email
        name
      }
    }
  }
`;

export const LOGIN_MUTATION = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        id
        email
        name
      }
    }
  }
`;
