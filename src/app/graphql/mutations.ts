import { gql } from "@apollo/client";

export const REGISTER_USER = gql`
  mutation Register(
    $name: String!
    $email: String!
    $password: String!
    $role: String!
  ) {
    register(name: $name, email: $email, password: $password, role: $role) {
      id
      email
    }
  }
`;

export const LOGIN_USER = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password)
  }
`;

export const CREATE_TASK = gql`
  mutation CreateTask($title: String!, $description: String!) {
    createTask(title: $title, description: $description) {
      id
      title
      description
    }
  }
`;

export const EDIT_TASK = gql`
  mutation EditTask($taskId: ID!, $title: String, $description: String) {
    editTask(taskId: $taskId, title: $title, description: $description) {
      id
      title
      description
    }
  }
`;

export const DELETE_TASK = gql`
  mutation DeleteTask($taskId: ID!) {
    deleteTask(taskId: $taskId) {
      id
      title
    }
  }
`;
