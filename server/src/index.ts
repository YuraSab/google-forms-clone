import { ApolloServer, gql } from 'apollo-server';

enum QuestionType {
  TEXT = 'TEXT',
  MULTIPLE_CHOICE = 'MULTIPLE_CHOICE',
  CHECKBOX = 'CHECKBOX',
  DATE = 'DATE'
}

interface Question {
  id: string;
  title: string;
  type: QuestionType;
  options?: string[];
}

interface Form {
  id: string;
  title: string;
  description?: string;
  questions: Question[];
}

interface Answer {
  questionId: string;
  value: string;
}

interface Response {
  id: string;
  formId: string;
  answers: Answer[];
}

const typeDefs = gql`
  enum QuestionType {
    TEXT
    MULTIPLE_CHOICE
    CHECKBOX
    DATE
  }

  type Question {
    id: ID!
    title: String!
    type: QuestionType!
    options: [String]
  }

  type Form {
    id: ID!
    title: String!
    description: String
    questions: [Question!]!
  }

  type Answer {
    questionId: ID!
    value: String!
  }

  type Response {
    id: ID!
    formId: ID!
    answers: [Answer!]!
  }

  input QuestionInput {
    title: String!
    type: QuestionType!
    options: [String]
  }

  input AnswerInput {
    questionId: ID!
    value: String!
  }

  type Query {
    forms: [Form!]!
    form(id: ID!): Form
    responses(formId: ID!): [Response!]!
  }

  type Mutation {
    createForm(title: String!, description: String, questions: [QuestionInput]): Form
    submitResponse(formId: ID!, answers: [AnswerInput]): Response
  }
`;

const forms: Form[] = [];
const responses: Response[] = [];

const resolvers = {
  Query: {
    forms: (): Form[] => forms,
    form: (_: unknown, { id }: { id: string }): Form | undefined => 
        forms.find(f => f.id === id),
    responses: (_: unknown, { formId }: { formId: string }): Response[] => 
        responses.filter(r => r.formId === formId),
  },
  Mutation: {
    createForm: (
      _: unknown, 
      args: { title: string; description?: string; questions: Omit<Question, 'id'>[] }
    ): Form => {
      const newForm: Form = { 
        id: String(forms.length + 1), 
        title: args.title,
        description: args.description,
        questions: (args.questions || []).map((q, i) => ({ 
            ...q, 
            id: String(i + 1) 
        })) 
      };
      forms.push(newForm);
      return newForm;
    },
    submitResponse: (
      _: unknown, 
      { formId, answers }: { formId: string; answers: Answer[] }
    ): Response => {
      const newResponse: Response = { 
        id: String(responses.length + 1), 
        formId, 
        answers 
      };
      responses.push(newResponse);
      return newResponse;
    }
  }
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});