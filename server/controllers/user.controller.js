// controllers/user.controller.js
import UserModel from "../models/user.model.js";
import bcryptjs from "bcryptjs";
//bcryptjs → used to hash passwords and compare the
import sendEmailFun from "../config/sendEmail.js";
//sendEmailFun → function to send emails.
import VerificationEmail from "../utils/verifyEmailTemplate.js";
//VerificationEmail → HTML template for email verification.
import generatedAccessToken from "../utils/generatedAccessToken.js";
import generatedRefreshToken from "../utils/generatedRefreshToken.js";

// ===== REGISTER USER =====
export async function registerUserController(req, res) {
  try {
    const { name, email, mobile, password, address_details } = req.body;

    if (!name || !email || !mobile || !password) {
      return res.status(400).json({
        message: "Provide name, email, mobile, and password",
        error: true,
        success: false,
      });
    }



    // ✅ Validate mobile number length
    if (!/^\d{11}$/.test(mobile)) {
      return res.status(400).json({
        message: "Mobile number must be 11 digits",
        error: true,
        success: false
      });
    }


    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        message: "User already registered with this email",
        error: true,
        success: false,
      });
    }












    const salt = await bcryptjs.genSalt(10);
    const hashPassword = await bcryptjs.hash(password, salt);
    const verifyCode = Math.floor(100000 + Math.random() * 900000).toString();
    //eikhanei code ta generate hocce 

    const user = new UserModel({
      name,
      email,
      mobile: mobile.toString(), // ✅ Ensure mobile is stored as string
      address_details: Array.isArray(address_details) ? address_details : [],
      password: hashPassword,
      otp: verifyCode,
      otpExpires: Date.now() + 600000, // 10 min
    });

    await user.save();

    // send verification email
    await sendEmailFun({
      /*
      Sends a verification email to the user’s email address.
          VerificationEmail(name, verifyCode) 
        generates the HTML email content with the user’s name and OTP code.
      */
      to: email,
      subject: "Verify your account",
      html: VerificationEmail(name, verifyCode),
    });

    const accessToken = await generatedAccessToken(user._id);
    //accessToken → short-lived token for authentication
    const refreshToken = await generatedRefreshToken(user._id);
    //refreshToken → long-lived token to get a new access token

    const cookieOptions = { httpOnly: true, secure: false, sameSite: "Lax" };//for security
    res.cookie("accessToken", accessToken, cookieOptions);
    res.cookie("refreshToken", refreshToken, cookieOptions);

    return res.status(201).json({
      message: "User registered successfully! Please verify your email.",
      //Tells the user registration was successful
      error: false,
      success: true,
      data: { accessToken, refreshToken },
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: error.message, error: true, success: false });
    //If anything goes wrong, sends a 500 Internal Server Error with the error message.
  }
}

// ===== VERIFY EMAIL =====
export async function verifyEmailController(req, res) {
  //Gets email and otp (the verification code) from the request body.-->otp je dilam
  //Searches the database for a user with that email.
  try {

    const { email, otp } = req.body;
    const user = await UserModel.findOne({ email });

    if (!user)
      //If no user is found → responds with 400 Bad Request.
      return res
        .status(400)
        .json({ error: true, success: false, message: "User not found" });
    if (user.otp !== otp)
      //Checks if the OTP matches the one saved in the database.
      //If it doesn’t match → responds with Invalid OTP.
      return res
        .status(400)
        .json({ error: true, success: false, message: "Invalid OTP" });
    //Checks if the OTP has expired.

    if (user.otpExpires < Date.now())
      // /If yes → responds with OTP expired.
      return res
        .status(400)
        .json({ error: true, success: false, message: "OTP expired" });

    user.verify_email = true;
    //Marks the user’s email as verified.
    user.otp = null;
    //Clears the OTP and its expiry from the database.
    user.otpExpires = null;
    await user.save();
    //Saves the updated user.

    return res.status(200).json({
      error: false,
      success: true,
      message: "Email verified successfully",
      //Sends a 200 OK response confirming the email was successfully verified.upore choto je box ase oitay dekabe
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: error.message, error: true, success: false });
    //If any error occurs → responds with 500 Internal Server Error.
  }
}

// ===== LOGIN =====
export async function loginUserController(req, res) {
  try {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email });

    if (!user)
      return res.status(400).json({
        message: "User not registered",
        error: true,
        success: false,
      });

    const isPasswordValid = await bcryptjs.compare(password, user.password);
    if (!isPasswordValid)
      return res.status(400).json({
        message: "Incorrect password",
        error: true,
        success: false,
      });

    if (user.status === "Suspended")
      return res.status(400).json({
        message: "Account suspended",
        error: true,
        success: false,
      });

    const accessToken = await generatedAccessToken(user._id);
    const refreshToken = await generatedRefreshToken(user._id);

    await UserModel.findByIdAndUpdate(user._id, {
      last_login_date: new Date(),
      status: "Active",
    });

    const cookieOptions = { httpOnly: true, secure: false, sameSite: "Lax" };
    res.cookie("accessToken", accessToken, cookieOptions);
    res.cookie("refreshToken", refreshToken, cookieOptions);

    return res.json({
      message: "Login successful",
      error: false,
      success: true,
      data: { id: user._id, accessToken, refreshToken },
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: error.message, error: true, success: false });
  }
}

// ===== LOGOUT =====
export async function logoutController(req, res) {

  try {
    const userId = req.userId;
    //Gets the logged-in user’s ID from the request (req.userId).

    const cookieOptions = { httpOnly: true, secure: false, sameSite: "Lax" };

    res.clearCookie("accessToken", cookieOptions);
    res.clearCookie("refreshToken", cookieOptions);
    //Effectively logs the user out on the client side

    await UserModel.findByIdAndUpdate(userId, {
      //Updates the user in the database:Sets the status to "Inactive"
      refresh_token: "",
      status: "Inactive",
    });

    return res.json({
      message: "Logout successful",
      //Sends a success response to the client confirming the user is logged out.
      error: false,
      success: true,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: error.message, error: true, success: false });
  }
}

// ===== GET PROFILE =====
export async function getProfileController(req, res) {
  try {
    const user = await UserModel.findById(req.userId).select("-password");

    if (!user) {
      return res.status(404).json({
        message: "User not found",
        error: true,
        success: false,
      });
    }

    return res.status(200).json({
      name: user.name,
      email: user.email,
      mobile: user.mobile,
      address_details: user.address_details || [],
      role: user.role, // ✅ add this
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: error.message, error: true, success: false });
  }
}


// ===== UPDATE PROFILE =====
export async function updateProfileController(req, res) {
  try {
    const userId = req.userId;
    //Gets the logged-in user’s ID from req.userId.
    const { name, mobile, address_details, password } = req.body;
    //Extracts fields (name, mobile, address_details, password) from the request body.

    const updateFields = {};
    //Creates an empty object to store the fields that need to be updated.--> update gulo neyar jonno

    if (name) updateFields.name = name;
    if (mobile) updateFields.mobile = mobile;
    if (address_details && Array.isArray(address_details)) {
      updateFields.address_details = address_details;
      //Adds fields to updateFields only if they are provided in the request.
    }

    if (password) {
      //If a new password is provided:Generates a salt and hashes the password using bcryptjs,amdr pass hash forme data base e ,more security
      //tores the hashed password in updateFields (never store plain text passwords!)
      const salt = await bcryptjs.genSalt(10);
      const hashedPassword = await bcryptjs.hash(password, salt);
      updateFields.password = hashedPassword;
    }

    const updatedUser = await UserModel.findByIdAndUpdate(
      userId,
      updateFields,
      { new: true }
    ).select("-password");
    //returns the updated user object. updates field take database e pathalam
    //password ta bade jate seta keo na pay

    if (!updatedUser) {
      //If the user ID does not exist → respond with 404 Not Found.
      return res.status(404).json({ message: "User not found", error: true, success: false });
    }

    return res.status(200).json({
      message: "Profile updated successfully",
      error: false,
      success: true,
      data: updatedUser,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message, error: true, success: false });
  }
}
