import { getOrders } from "@/lib/actions/action";
import { auth } from "@clerk/nextjs/server";
import React from "react";

const Orders = async () => {
  const { userId } = await auth();

  const orders = await getOrders(userId as string);

  return (
    <div className="px-10 py-5 max-sm:px-5">
      <p className="text-heading3-bold my-10">Your Orders</p>
      {!orders ||
        (orders.length === 0 && (
          <p className="text-body-bold my-5">You have no orders yet.</p>
        ))}

      <div className="flex flex-col gap-10">
        {orders.map((order: OrderType) => (
          <div className="flex flex-col gap-8 hover:bg-grey-1" key={order._id}>
            <div className="flex gap-20 max-md:flex-col max-md:gap-3">
              <p className="text-body-bold">Order ID: {order._id}</p>
              <p className="text-base-bold">
                Total Amount: ${order.totalAmount}
              </p>
            </div>
            <div className="flex flex-col gap-5">
              {order.products.map((orderItem: OrderItemType) => (
                <div key={orderItem._id} className="flex gap-4">
                  <div className="flex flex-col justify-between">
                    <p className="text-small-medium">
                      {" "}
                      Title:{" "}
                      <span className="text-small-bold">
                        {orderItem.product?.title}
                      </span>
                    </p>

                    {orderItem.color && (
                      <p className="text-small-medium">
                        {" "}
                        Color:{" "}
                        <span className="text-small-bold">
                          {orderItem.color}
                        </span>
                      </p>
                    )}

                    {orderItem.size && (
                      <p className="text-small-medium">
                        {" "}
                        Size:{" "}
                        <span className="text-small-bold">
                          {orderItem.size}
                        </span>
                      </p>
                    )}

                    <p className="text-small-medium">
                      {" "}
                      Unit price:{" "}
                      <span className="text-small-bold">
                        {orderItem.product?.price}
                      </span>
                    </p>

                    <p className="text-small-medium">
                      {" "}
                      Quantity:{" "}
                      <span className="text-small-bold">
                        {orderItem.quantity}
                      </span>
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;

export const dynamic = "force-dynamic";
