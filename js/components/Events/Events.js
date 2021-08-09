import React from "react";
import Event from "../Event/Event";

const Events = ({ events, selected }) => {
    return (
        <div className="container-fluid" id="events-section">
            {events.map((event, idx) => (
                <Event
                    key={"event-" + idx}
                    img={`/storage/uploads/${event.photo}`}
                    name={event.title}
                    color="event1"
                    type={idx+1}
                    selected={selected}
                />
            ))}
        </div>
    );
};

export default Events;
