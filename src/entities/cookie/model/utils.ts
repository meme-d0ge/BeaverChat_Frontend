import {StatusCookie} from "@/entities/cookie/model/interface";
export const getStatusCookie = () => {
    if (typeof window !== "undefined") {
        const status = localStorage.getItem('cookie')
        if (status) {
            switch (status) {
                case StatusCookie.accepted:
                    return StatusCookie.accepted
                case StatusCookie.notAccepted:
                    return StatusCookie.notAccepted
            }
        }
        return StatusCookie.notAccepted
    }
}
export const setStatusCookie = (state: StatusCookie) => {
    localStorage.setItem('cookie', state);
}