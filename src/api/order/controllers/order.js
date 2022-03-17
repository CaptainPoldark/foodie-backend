"use strict";

/**
 *  order controller
 */

const { createCoreController } = require("@strapi/strapi").factories;
const stripe = require("stripe")(
  "sk_test_51KUL8gJDtFQDLEs18Nrb19KgkFBieHeyx4MGfJp6v8rtWpvzaBQ7beYFpWCbrfrUTBTyvI71PCIIShvHZXPp5zEO00eW1ir0v8"
);

module.exports = createCoreController("api::order.order", ({ strapi }) => ({
  async create(ctx) {
    console.log(ctx.request);
    const { address, amount, dishes, token, city, state } =
      ctx.request.body.data;
    /*     console.log(token);
    stripe.customers.create({
      email: ctx.state.user.email,
    }); */
    const stripeAmount = Math.floor(amount * 100);
    // charge on stripe
    const charge = await stripe.charges.create({
      // Transform cents to dollars.
      amount: stripeAmount,
      currency: "usd",
      description: `Order ${new Date()} by ${ctx.state.user.email}`,
      source: token,
      /*       billing_details: {
        address: {
          city: city,
          country: "US",
          line1: address,
          line2: null,
          state: state,
        },
        email: ctx.state.user.email,
        name: ctx.state.user.username,
      }, */
    });

    console.log(ctx.state.user.username);
    // Register the order in the database
    // wrap the core function to leave the original core controller logic in place
    const order = {
      user: ctx.state.user.username,
      charge_id: charge.id,
      amount: stripeAmount,
      address,
      dishes,
      city,
      state,
    };

    ctx.query = { ...ctx.query, local: "en" };
    console.log("Query:");

    ctx.request.body.data.user = ctx.state.user.username;
    ctx.request.body.data.charge_id = charge.id;
    console.log(ctx.request.body);
    console.log("Query:");
    const { data, meta } = await super.create(ctx);
    data.author = ctx.request.body.data.user;
    console.log(`Data: ${JSON.stringify(data)}`);
    meta.date = Date.now();
    console.log(data);

    return { data, meta };
  },
}));
