import React, { useRef, useState } from "react";
import moment from "moment";
import Button from "../Button/Button";
import FullCalendar from "@fullcalendar/react"; // must go before plugins
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
import interactionPlugin from "@fullcalendar/interaction"; // needed for day Interaction
import momentTimezonePlugin from "@fullcalendar/moment-timezone"; // needed for timezone

import { URLS } from "../../helpers/urls";
import Toast from "../../components/Toast/Toast";
import axios from "axios";

const Reserve = () => {
    const [date, setDate] = useState(new Date());
    const calendarRef = useRef(null);
    const [reserve, setReserve] = useState({
        fullname: "",
        company: "",
        comment: "",
        begin_event: "",
        end_event: "",
    });

    const submitHandler = async (e) => {
        e.preventDefault();
        if (
            reserve.fullname.length &&
            reserve.company.length &&
            reserve.comment.length &&
            reserve.begin_event.length &&
            reserve.end_event.length
        ) {
            try {
                const res = await axios.post(URLS.reservation.base, reserve);
                if (res.status === 200) {
                    setReserve((prev) => ({
                        fullname: "",
                        company: "",
                        comment: "",
                        begin_event: "",
                        end_event: "",
                    }));
                    Toast.success(
                        "Müraciətiniz qeydə alındı, təşəkkürlər",
                        "",
                        5
                    );
                } else {
                    Toast.error(
                        "Müraciyətiniz zamanı xəta baş verdi, zəhmət olmasa daha sonra yoxlayasınız",
                        "",
                        5
                    );
                }
            } catch (err) {
                Toast.error(
                    "Müraciyətiniz zamanı xəta baş verdi, zəhmət olmasa daha sonra yoxlayasınız",
                    "",
                    5
                );
            }
        } else {
            if (reserve.begin_event.length) {
                Toast.info(
                    "Zəhmət olmasa bütün xanaları doldurasınız",
                    "Boş xanalar mövcüddur",
                    5
                );
            } else {
                Toast.info("Zəhmət olmasa tarixi seçin", "Tarix seçilməyib", 5);
            }
        }
    };

    const dateHandler = (date) => {
        setReserve((prev) => ({
            ...prev,
            begin_event: moment(date.startStr).format("YYYY-MM-DD hh:mm:ss"),
            end_event: moment(date.endStr).format("YYYY-MM-DD hh:mm:ss"),
        }));
    };

    return (
        <div className="reserve">
            <div className="row d-flex">
                <div className="col-sm-12 col-md-6">
                    <form onSubmit={submitHandler}>
                        <div className="mb-3">
                            <input
                                type="text"
                                className="form-control"
                                id="reserve-name"
                                placeholder="Ad və Soyad"
                                value={reserve.fullname}
                                onChange={(e) =>
                                    setReserve((obj) => ({
                                        ...obj,
                                        fullname: e.target.value,
                                    }))
                                }
                            />
                        </div>
                        <div className="mb-3">
                            <input
                                type="text"
                                className="form-control"
                                id="reserve-company"
                                placeholder="Şirkət/Təşkilat"
                                value={reserve.company}
                                onChange={(e) =>
                                    setReserve((obj) => ({
                                        ...obj,
                                        company: e.target.value,
                                    }))
                                }
                            />
                        </div>

                        <div className="mb-3">
                            <textarea
                                className="form-control pb-4"
                                id="reserve-message"
                                rows="14"
                                placeholder="İsmarıc"
                                value={reserve.comment}
                                onChange={(e) =>
                                    setReserve((obj) => ({
                                        ...obj,
                                        comment: e.target.value,
                                    }))
                                }
                            ></textarea>
                        </div>
                        <div className="reserve-button">
                            <Button text="GÖNDƏRİN" type="submit" />
                        </div>
                    </form>
                </div>
                <div className="col-sm-12 col-md-6 reserve-calendar">
                    <div className="reserve-shape"></div>
                    <FullCalendar
                        plugins={[
                            dayGridPlugin,
                            interactionPlugin,
                            momentTimezonePlugin,
                        ]}
                        initialView="dayGridMonth"
                        events={[
                            { title: "event 1", date: "2021-07-08" },
                            { title: "event 2", date: "2021-07-09" },
                        ]}
                        selectable={true}
                        select={dateHandler}
                        unselectAuto={false}
                        selectAllow={function (select) {
                            return moment().diff(select.start, "days") <= 0;
                        }}
                        timeZone="Asia/Baku"
                        longPressDelay={1}
                        ref={calendarRef}
                    />
                    <div className="reserve-shape"></div>
                </div>
            </div>
        </div>
    );
};

export default Reserve;
