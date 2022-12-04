import { ILocation } from "../../../types";

interface Props {
  location: ILocation;
}

const Location = ({ location }: Props) => {
  const { name, type, dimension, residentsAmount } = location;
  return (
    <div>
      <p>
        <b>Location name:</b> {name}
      </p>
      {type && (
        <p>
          <b>Location type:</b> {type}
        </p>
      )}
      {dimension && (
        <p>
          <b>Location dimension:</b> {dimension}
        </p>
      )}
      <p>
        <b>Amount of Residents:</b> {residentsAmount}
      </p>
    </div>
  );
};

export default Location;
