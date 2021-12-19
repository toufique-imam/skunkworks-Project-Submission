from flask import Flask, json, jsonify, request, session
from flask_cors import CORS

import time
from pymongo import MongoClient
# pprint library is used to make the output look more pretty

'''
Should move db code to other file
'''
app = Flask(__name__)
CORS(app)

# connect to MongoDB, change the << MONGODB URL >> to reflect your own connection string
client = MongoClient(port=27017)
db = client.test


def currentTime():
    return time.time()


class User:
    ROLE_ADMIN = 0
    ROLE_USER = 1

    ROOM_NONE = -1
    ROOM_ONE = 0
    ROOM_TWO = 1
    ROOM_THREE = 2

    def __init__(self, id=-1, fname="testfirst", lname="testlast",
                 designation="test address", address="test address", phone="01521100000", email="test@mail.com", pin=1234, role=ROLE_USER):
        self.id = id
        self.fname = fname
        self.lname = lname
        self.designation = designation
        self.address = address
        self.phone = phone
        self.email = email
        self.pin = pin
        self.role = role
        # update-able
        self.roomEnter = [-1]*3
        self.roomExit = [-1]*3

        self.currentRoom = User.ROOM_NONE
        self.enterTime = -1
        self.totalTime = 0

    def isAdmin(self):
        return self.role == User.ROLE_ADMIN

    def authenticate(self, id, pin):
        return (self.id == id and self.pin == pin)

    def accessRoom(self, room):
        print(room, self.currentRoom)
        # user is exiting from the room
        if(self.currentRoom == room):
            self.roomExit[room] = currentTime()
            self.totalTime = self.totalTime + \
                self.roomExit[room] - self.enterTime
            # reset
            self.currentRoom = User.ROOM_NONE
            print("first", self.currentRoom)
            return 1
        # user entering into a room
        elif(self.currentRoom == User.ROOM_NONE):
            self.enterTime = currentTime()
            self.currentRoom = room
            if(self.roomEnter[room] == -1):
                self.roomEnter[room] = currentTime()

            print("second", self.currentRoom)
            return 0
        else:
            return -1

    def userUpdate(self):
        update = {}
        update['roomEnter'] = self.roomEnter
        update['roomExit'] = self.roomExit
        update['currentRoom'] = self.currentRoom
        update['enterTime'] = self.enterTime
        update['totalTime'] = self.totalTime

        return update


USER_KEY = 'user'
USER_ID_KEY = 'id'
USER_PIN_KEY = 'pin'

'''
 checks if the admin has been created
'''


def adminActive():
    find = {"role": User.ROLE_ADMIN}
    return db.users.find_one(find) != None


@app.route("/checkAdmin")
def checkAdmin():
    return jsonify(adminActive())


def checkLoggedIn():
    return USER_KEY in session


def findUser(id, pin):
    find = {USER_ID_KEY: id, USER_PIN_KEY: pin}
    return (db.users.find_one(find))


@app.route("/adminLoggedIn")
def adminLoggedIn():
    print(session)
    if(USER_KEY in session):
        return jsonify(True)
    return jsonify(False)


'''
login , only admin can login
checks if user id , pin valid ,then checks for role
'''


@app.route("/login", methods=['POST'])
def login():
    result = (json.loads(request.get_data(parse_form_data=True)))

    print("DATA", result)

    id = int(result['id'])
    pin = int(result['pin'])
    userCheck = findUser(id, pin)
    result = None
    if(userCheck == None):
        print("user not found")
        result = {"result": 0}
    elif(userCheck["role"] != User.ROLE_ADMIN):
        print("not admin")
        result = {"result": 1}
    else:
        print("logged in")
        userloggedIn = getUserFromQuery(userCheck)
        session[USER_KEY] = userloggedIn.__dict__
        print(session)
        result = {"result": 2, "user": userloggedIn.__dict__}

    return jsonify(result)


'''
get all user , only admin should access it
'''


@app.route("/getAllUser", methods=['GET'])
def getAllUser():
    '''
    take id , password and check todo
    '''
    # if checkLoggedIn() == False:
    #     return noUserPage()

    # if(userLoggedIn.role != User.ROLE_ADMIN):
    #     return noUserPage()

    find = {"role": User.ROLE_USER}
    data = list(db.users.find(find))
    res = []
    for x in data:
        res.append(getUserFromQuery(x).__dict__)

    return jsonify(res)


def addUser(user):
    # todo take data from user about user
    return (db.users.insert_one(user.__dict__))


'''
adding user method , it should check if the admin is active , if yes , then check if current user is admin
'''


@app.route("/AddUser", methods=['POST'])
def AddUser():
    '''
    take id , password and check todo
    '''
    result = (json.loads(request.get_data(parse_form_data=True)))

    print("DATA", result)

    userNew = User()

    userNew.id = int(result['id'])
    userNew.address = result['address']
    userNew.designation = result['designation']
    userNew.email = result['email']
    userNew.fname = result['fname']
    userNew.lname = result['lname']
    userNew.phone = int(result['phone'])
    userNew.pin = int(result['pin'])

    if(userNew.id == None or userNew.pin == None):
        return jsonify(False)
    if(adminActive()):
        userNew.role = User.ROLE_USER
    else:
        userNew.role = User.ROLE_ADMIN
    addUser(userNew)
    # todo
    return jsonify(True)




'''
Check if the inputID is already there 
'''


@app.route("/checkID")
def checkID():
    # if checkLoggedIn() == False:
    #     return noUserPage()

    id = request.args.get(USER_ID_KEY)
    print("ARGS", id)

    find = {"id": int(id)}
    data = (db.users.find_one(find))
    return jsonify(data != None)


def getUserFromQuery(data):
    userNow = User()
    userNow.__dict__.update(data)
    userNow.__dict__.pop('_id')
    return userNow


'''
Check if the user can go through a door
get the id , pin from form , and check
used loggedinUser for this 
'''


@app.route("/AuthenticateUser", methods=['POST'])
def authenticateUser():

    result = (json.loads(request.get_data(parse_form_data=True)))
    print("DATA", result)

    id = int(result['id'])
    pin = int(result['pin'])

    data = findUser(id, pin)
    if(data == None):
        return jsonify({"result": -1})
    userNow = getUserFromQuery(data)
    print(json.dumps(userNow.__dict__))
    return jsonify({"result": 0, "user": userNow.__dict__})


@app.route("/AccessSuite", methods=['POST'])
def accessSuite():

    result = (json.loads(request.get_data(parse_form_data=True)))
    print("DATA", result)

    id = int(result['id'])
    pin = int(result['pin'])
    suite = int(result['currentRoom'])

    data = findUser(id, pin)
    if(data == None):
        return jsonify(-2)
    userNow = getUserFromQuery(data)
    print(json.dumps(userNow.__dict__))

    result = userNow.accessRoom(suite)
    if(result != -1):
        updaterUser(userNow)

    return jsonify(result)


'''
for updating user time in a room
take the logged in user and update it
'''


def updaterUser(user):
    result = db.users.update_one(
        {USER_ID_KEY: user.id}, {"$set": user.userUpdate()})

    print('Number of documents modified : ' + str(result.modified_count))


@app.route("/", methods=['GET'])
def index():
    return "Welcome to Employee Attendance System"


app.secret_key = '000d88cd9d90036ebdd237eb6b0db000'
if __name__ == '__main__':
    app.run(debug=True)
