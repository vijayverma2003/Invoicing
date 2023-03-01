import React from "react";
import Input from "../common/Input";
import { invoiceFormModel } from "../../models/models";

interface InvoiceProductsProps {
  onTabularChange: (
    e: React.ChangeEvent<HTMLInputElement>,
    arr: string,
    index: number
  ) => void;
  data: { [key: string]: any };
  index: number;
}

function InvoiceProducts({
  onTabularChange,
  data,
  index,
}: InvoiceProductsProps) {
  const { name, cost, discount, qty, packing_charges } = invoiceFormModel.model;

  return (
    <div className="grid grid-1x4">
      <Input
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          onTabularChange(e, "products", index)
        }
        {...name}
        value={data.products[index]["name"]}
      />
      <div className="grid grid-1x2">
        <Input
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            onTabularChange(e, "products", index)
          }
          {...cost}
          value={data.products[index]["cost"]}
        />
        <Input
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            onTabularChange(e, "products", index)
          }
          {...qty}
          value={data.products[index]["qty"]}
        />
      </div>
      <div className="grid grid-1x2">
        <Input
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            onTabularChange(e, "products", index)
          }
          {...discount}
          value={data.products[index]["discount"]}
        />
        <Input
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            onTabularChange(e, "products", index)
          }
          {...packing_charges}
          value={data.products[index]["packing_charges"]}
        />
      </div>
      <div className="grid grid-1x2">
        <Input
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            onTabularChange(e, "products", index)
          }
          {...discount}
          placeholder="Total"
          value={data.products[index]["discount"]}
        />
        <Input
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            onTabularChange(e, "products", index)
          }
          {...discount}
          placeholder="Total Incl. Tax"
          value={data.products[index]["discount"]}
        />
      </div>
    </div>
  );
}

export default InvoiceProducts;
