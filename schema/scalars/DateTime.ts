import graphql from "graphql";
const { GraphQLScalarType, Kind } = graphql;

const DateTime = {
  DateTime: new GraphQLScalarType({
    name: "DateTime",
    description: "Datetime scalar type",

    parseValue(value: any) {
      return new Date(value);
    },

    // @ts-ignore
    parseLiteral(ast) {
      if (ast.kind === Kind.INT) {
        return parseInt(ast.value, 10);
      }

      return null;
    },

    serialize(value: any) {
      const date = new Date(value);

      return date;
    },
  }),
};

export default DateTime;
