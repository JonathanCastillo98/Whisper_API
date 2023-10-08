// import { Server } from "socket.io";
// import Message from "../models/message.model";
// import Chat from "../models/chat.model";
// import User from "../models/user.model";
// import cors from "cors";

// let currentChat;
// let isSupportActive = false;

// const setupSocket = (server) => {
//     const io = new Server(server, {
//         cors: {
//             origin: [
//                 "http://localhost:3000",
//                 "http://localhost:3001", ,
//             ],
//             methods: ["GET", "POST"],
//             credentials: true,
//         },
//     });

//     io.on("connection", (socket) => {
//         console.log("Connected");

//         // Setup
//         socket.on("setup admin", () => {
//             isSupportActive = true;
//             io.emit("connected admin", isSupportActive);
//         });

//         socket.on("setup client", () => {
//             io.emit("connected client");
//             io.emit("connected admin", isSupportActive);
//         });

//         // Join a chat room
//         socket.on("join chat", (room) => {
//             socket.join(room);
//             // console.log("User Joined Room: " + room);
//         });

//         socket.on("join adminchat", (room) => {
//             if (currentChat && currentChat !== room) {
//                 socket.leave(currentChat);
//             }
//             socket.join(room);
//             currentChat = room;
//             // console.log("Support Joined room: " + room);
//         });

//         // Create a new chat
//         socket.on("create chat", async (chat) => {
//             try {
//                 // Check if there are already existent messages
//                 const messages = await Message.find({ chat: chat._id })
//                     .populate("sender", "email picture website")
//                     .populate("chat");

//                 if (messages.length > 0) {
//                     if (messages[0].chat.liveChatStarted) {
//                         socket.emit("work hours");
//                         const ltsMsgChat = await Chat.findByIdAndUpdate(chat._id, {
//                             latestMessage: messages[messages.length - 1],
//                         }).populate("latestMessage");
//                     }
//                     // console.log(ltsMsgChat);
//                     io.emit("create chat", ltsMsgChat);
//                 } else {
//                     // Store first message in database
//                     let fstMessage = await Message.create(firstMessage);
//                     fstMessage = await fstMessage.populate(
//                         "sender",
//                         "email website picture"
//                     );
//                     fstMessage = await fstMessage.populate("chat");
//                     fstMessage = await User.populate(fstMessage, {
//                         path: "chat.users",
//                         select: "email picture website",
//                     });

//                     // Store second message in database
//                     let scndMessage = await Message.create(secondMessage);
//                     scndMessage = await scndMessage.populate(
//                         "sender",
//                         "email website picture"
//                     );
//                     scndMessage = await scndMessage.populate("chat");
//                     scndMessage = await User.populate(scndMessage, {
//                         path: "chat.users",
//                         select: "email picture website",
//                     });

//                     // Set the last message of the conversation to the second message
//                     await Chat.findByIdAndUpdate(chat._id, {
//                         latestMessage: scndMessage,
//                     });
//                     chat.latestMessage = scndMessage;
//                     io.emit("create chat", chat);

//                     // Emit the messages so they can be shown on the frontend
//                     io.in(chat._id).emit("back message", fstMessage);
//                     io.in(chat._id).emit("back message", scndMessage);
//                 }
//             } catch (error) {
//                 console.log(error.message);
//             }
//         });

//         // Typing
//         socket.on("typing", (room) => {
//             socket.in(room).emit("typing", room);
//         });

//         // Stop typing
//         socket.on("stop typing", (room) => socket.in(room).emit("stop typing"));

//         // New message
//         socket.on("new message", (message) => {
//             io.in(message.chat._id).emit("back message", message);
//             io.emit("update ltsmessages", message);
//         });

//         // Unread
//         socket.on("unread", (message) => {
//             io.emit("unread support", message);
//         });

//         socket.on("disconnect", () => {
//             isSupportActive = false;
//             io.emit("connected admin", isSupportActive);
//         });
//     });

//     return io; // If you want to use io elsewhere
// };