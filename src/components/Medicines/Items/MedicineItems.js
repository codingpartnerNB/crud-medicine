import { useContext } from "react";
import Card from "../../UI/Card";
import MedicineContext from "../../../store/medicine-context";
import MedItem from "./MedItem";

const MedicineItems = () => {
  const medCtx = useContext(MedicineContext);
  const itemList = medCtx.items.map((item) => (
    <MedItem
      key={item.id}
      id={item.id}
      name={item.name}
      desc={item.desc}
      price={item.price}
      amount={item.amount}
    />
  ));
  return (
    <Card>
      <table>
        <thead>
          <th>Medicine Name</th>
          <th>Description</th>
          <th>Price</th>
          <th>Amount</th>
        </thead>
        <tbody>{itemList}</tbody>
      </table>
    </Card>
  );
};

export default MedicineItems;
