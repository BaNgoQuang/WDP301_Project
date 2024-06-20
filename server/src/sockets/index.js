let userOnlines = []
let admin

const addUserOnline = (socket) => {
  return data => {
    const user = userOnlines.find(i => i.UserID === data)
    if (!user) {
      userOnlines.push({
        UserID: data,
        SocketID: socket.id
      })
    }
  }
}

const adminLogin = (socket) => {
  return data => {
    admin = {
      AdminID: data,
      SocketID: socket.id
    }
  }
}

const sendNotification = (socket) => {
  return data => {
    if (!!admin) {
      socket.to(admin.SocketID).emit('get-notification', data)
    }
  }
}

const sendComment = (io) => {
  return data => {
    io.to(data.RoomID).emit("get-comment", data)
  }
}

const sendDeactiveAccount = (socket) => {
  return data => {
    // io.sockets.emit('get-deactive', data)
  }
}

const joinRoom = (socket) => {
  return data => {
    socket.join(data)
  }
}

const leaveRoom = (socket) => {
  return data => {
    socket.leave(data)
  }
}

const sendMessage = (socket) => {
  return data => {
    console.log("dâta", data);
    if (!data.Receiver && !!admin.AdminID) {
      socket.to(admin.SocketID).emit("get-message", data)
    } else if (!!data.Receiver) {
      const user = userOnlines.find(i => i.UserID === data.Receiver)
      if (!!user) {
        console.log("user", user);
        socket.to(user.SocketID).emit("get-message", data)
      }
    }
  }
}

const SocketService = {
  addUserOnline,
  adminLogin,
  sendNotification,
  sendComment,
  sendDeactiveAccount,
  joinRoom,
  leaveRoom,
  sendMessage
}

export default SocketService
