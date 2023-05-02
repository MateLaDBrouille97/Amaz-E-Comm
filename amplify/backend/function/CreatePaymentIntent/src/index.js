const stripe = require('stripe')('sk_test_51L2ir5A08aA5aeHI58BrpUkwjfQNdNVwcxPzOZQaojAFmMSA8KxpTAMwnLg13Segp8E2OA9xJBgZULptuWAV4i5600Qwp27IZg')
// event
// {
//   "typeName": "Query" | "Mutation", /* Filled dynamically based on @function usage location */
//   "fieldName": "createPaymentMethod", /* Filled dynamically based on @function usage location */
//   "arguments": { amount  /* GraphQL field arguments via $ctx.arguments */ },
//   "identity": { /* AppSync identity object via $ctx.identity */ },
//   "source": { /* The object returned by the parent resolver. E.G. if resolving field 'Post.comments', the source is the Post object. */ },
//   "request": { /* AppSync request object. Contains things like headers. */ },
//   "prev": { /* If using the built-in pipeline resolver support, this contains the object returned by the previous function. */ },
// }
exports.handler = async (event) => {
    const { typeName, arguments } = event;

    if (typeName !== 'Mutation') {
        throw new Error('Request is not a mutation');
    }

    if (!arguments?.amount) {
        throw new Error('Amount argument is required');
    }

    // create payment intent
    const paymentIntent = await stripe.paymentIntents.create({
        amount: arguments.amount,
        currency: 'usd'
    });

    return {
        clientSecret: paymentIntent.client_secret,
    }
};


//Dans package jason de la lambda function il faut ajouter 
// "dependencies": {
//     "stripe": "^8.148.0" ==> C'est la version de stripe que l'on utilise 
//   }
//On doit connecter la fonction lambda a une mutation 
//