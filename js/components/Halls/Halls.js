import React from "react";
import { useHistory } from "react-router-dom";
import HallImage from "../HallImage/HallImage";

const Halls = ({ halls, selected }) => {
    const history = useHistory();
    const navClick = (hall, idx) =>
        history.push({
            pathname: `/halls/${idx + 1}`,
        });
    return (
        <div className="hallImages row d-flex justify-content-center">
            {halls.map((hall, idx) => (
                <div
                    className="col-8 col-sm-6 col-md-6 col-lg-3"
                    key={`hall-div-${idx}`}
                >
                    <HallImage
                        order={idx + 1}
                        src={`/storage/uploads/${hall.photo}`}
                        title={hall.title}
                        selected={selected}
                        onclick={() => navClick(hall, idx)}
                    />
                </div>
            ))}
        </div>
    );
};

export default Halls;
