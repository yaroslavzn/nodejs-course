const users = [];

const addUser = ({id, username, room}) => {
    const name = username.trim().toLowerCase();
    const roomName = room.trim().toLowerCase();

    if (!name || !roomName) {
        return {
            error: "User name and Room name are required fields!"
        };
    }

    const isUserExist = users.findIndex(user => user.name === name && user.room === roomName) !== -1;

    if (isUserExist) {
        return {
            error: "User is in use!"
        };
    }

    const user = {
        name,
        id,
        room: roomName
    };

    users.push(user);

    return {
        user: user
    };
};

const removeUser = (id) => {
    const idx = users.findIndex(user => user.id === id);

    return users.splice(idx, 1)[0];
};

const getUser = (id) => {
    const idx = users.findIndex(user => user.id === id);

    if (idx === -1) {
        return {
            error: "User does not exist!"
        }
    }

    return {user: users[idx]};
};

const getUsersInRoom = (room) => {
    const normalizedRoom = room.trim().toLowerCase();
    const usersInRoom = users.filter(user => user.room === normalizedRoom);

    return usersInRoom;
};

module.exports = {
    addUser,
    removeUser,
    getUser,
    getUsersInRoom
};