export interface User {
    id: Number;
    fname: string;
    lname: string;
    designation: string;
    address: string;
    phone: string;
    email: string;
    pin: Number
    role: Number
    //update - able
    roomEnter: Array<Number>
    roomExit: Array<Number>

    currentRoom: Number
    enterTime: Number
    totalTime: Number
}