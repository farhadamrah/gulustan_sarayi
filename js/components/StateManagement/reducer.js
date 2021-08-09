export const initialState = {
    halls: [],
    events: [],
    timeline: [],
    years: [],
};

export const reducer = (state, action) => {
    switch (action.type) {
        case "GET_HALLS":
            return {
                ...state,
                halls: action.halls,
            };
        case "GET_EVENTS":
            return {
                ...state,
                events: action.events,
            };
        case "GET_TIMELINE":
            return {
                ...state,
                timeline: action.timeline,
            };
        case "GET_YEARS":
            const newArr = [];
            for (
                let i = +new Date(action.timeline[0]?.date).getFullYear();
                i <=
                +new Date(
                    action.timeline[action.timeline.length - 1]?.date
                ).getFullYear() +
                    10;
                i += 10
            ) {
                newArr.push(Math.round(i / 10) * 10);
            }
            newArr.push(+newArr[newArr.length - 1] + 10);
            return {
                ...state,
                years: newArr,
            };
        default:
            return state;
    }
};
