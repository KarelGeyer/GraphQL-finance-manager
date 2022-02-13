import graphql from 'graphql'
const { GraphQLScalarType, Kind } = graphql;

const DateTime = {
    DateTime: new GraphQLScalarType({
        name: "DateTime",
        description: "Datetime scalar type",

        parseValue(value) {
            return new Date(value)
        },

        parseLiteral(ast) {
            if (ast.kind === Kind.INT) {
                return parseInt(ast.value, 10)
            }

            return null
        },

        serialize(value) {
            const date = new Date(value)

            return date
        }
    })
}

export default DateTime