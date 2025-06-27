const { fireStore, auth } = require("../config/firebaseAdminEngine.js");
const showPopup = require("./popupController.js");
require("dotenv").config();

const userCollection = fireStore.collection("User");

async function registerByEmail(req, res) {
  try {
    // login by authentication
    const { email, password, rePassword } = req.body;

    if (password !== rePassword) {
      return showPopup.showPopup(
        req,
        res,
        "Mật khẩu không khớp",
        "/registerPage"
      );
    }

    const userRecord = await auth.createUser({
      email,
      password,
    });

    console.log("User created:", userRecord.uid);

    await userCollection.doc(userRecord.uid).set({
      email: email,
      createAt: new Date().getTime(),
      role: "admin",
      // role: "user"
    });

    return showPopup.showPopup(req, res, "Đăng ký thành công", "/");
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).send("Lỗi đăng ký");
  }
}

async function loadUserByEmail(email) {
  try {
    const userRecord = await auth.getUserByEmail(email);
    return userRecord;
  } catch (error) {
    console.error("Error fetching user:", error);
    throw error;
  }
}

async function loadUsers() {
  try {
    const listUsersResult = await auth.listUsers();
    var users = listUsersResult.users.map((user) => ({
      userId: user.uid,
      email: user.email || "N/A",
      disabled: user.disabled || false,
      createTime: user.metadata.creationTime
        ? new Date(user.metadata.creationTime).getTime()
        : null,
      lastSignIn: user.metadata.lastSignInTime
        ? new Date(user.metadata.lastSignInTime).getTime()
        : null,
      _id: user._id || "N/A",
    }));
    return users;
  } catch (error) {
    console.error("Error listing users:", error);
    throw error;
  }
}

async function deleteUserByEmail(email) {
  try {
    const userRecord = await auth.getUserByEmail(email);
    await auth.deleteUser(userRecord.uid);
    console.log("Successfully deleted user");
    fireStore.collection("User").doc(userRecord.uid).delete();
    return true;
  } catch (error) {
    console.error("Error deleting user:", error);
    return false;
  }
}

async function getUserById(id) {
  try {
    const userRecord = await auth.getUser(id);
    return userRecord;
  } catch (error) {
    console.error("Error fetching user:", error);
    throw error;
  }
}

async function getDataById(id) {
  try {
    const docRef = userCollection.doc(id);
    const doc = await docRef.get();
    if (doc.exists) {
      return doc.data();
    } else {
      console.log("No such document!");
      return null;
    }
  } catch (error) {
    console.error("Error getting document:", error);
    throw error;
  }
}

async function verifyIdToken(token) {
  try {
    const decodedToken = await auth.verifyIdToken(token);
    return decodedToken;
  } catch (error) {
    console.error("Error verifying ID token:", error);
    return null;
  }
}

module.exports = {
  registerByEmail,
  loadUserByEmail,
  loadUsers,
  deleteUserByEmail,
  getUserById,
  getDataById,
  verifyIdToken,
};
