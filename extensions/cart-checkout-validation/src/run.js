// @ts-check

// Use JSDoc annotations for type safety
/**
 * @typedef {import("../generated/api").RunInput} RunInput
 * @typedef {import("../generated/api").FunctionRunResult} FunctionRunResult
 */

/**
 * @param {RunInput} input
 * @returns {FunctionRunResult}
 */
export function run(input) {
  const D_Config = {
    maxOrderValue: 1000.0, 
    minOrders: 5,
  };

 
  let config = input.shop?.metafield?.value ? JSON.parse(input.shop.metafield.value) : D_Config;

  const maxOrderValue = config?.maxOrderValue ? config?.maxOrderValue : D_Config.maxOrderValue;
  const minOrders = config?.minOrders ? config?.minOrders : D_Config.minOrders;

  const error = {
    localizedMessage: `There is an order maximum of ${maxOrderValue} DT for customers without established order history (minimum ${minOrders} orders required).`,
    target: "cart",
  };

  const orderSubtotal = parseFloat(input.cart.cost.subtotalAmount.amount);
  const errors = [];

  if (orderSubtotal > maxOrderValue) {
    const numberOfOrders = input.cart.buyerIdentity?.customer?.numberOfOrders ? input.cart.buyerIdentity?.customer?.numberOfOrders : 0;

    if (numberOfOrders < minOrders) {
      errors.push(error);
    }
  }

  return { errors };
}