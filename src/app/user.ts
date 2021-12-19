export class User {
    id: Number;
    fname: string;
    lname: string;
    designation: string;
    address: string;
    phone: number;
    email: string;
    pin: Number
    role: Number
    //update - able
    roomEnter: Array<Number>
    roomExit: Array<Number>

    currentRoom: Number
    enterTime: Number
    totalTime: Number
    constructor() {
        this.id = 1;
        this.fname = "testF";
        this.lname = "testL";
        this.designation = "TestD";
        this.address = "TestAddress";
        this.phone = 1521108127;
        this.email = "test@gmail.com";
        this.pin = 1234;
        this.role = 0;
        //update - able
        this.roomEnter = [-1, -1, -1];
        this.roomExit = [-1, -1, -1];

        this.currentRoom = -1;
        this.enterTime = -1;
        this.totalTime = 0;
    }
}