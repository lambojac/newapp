

const userSchema = new mongoose.Schema({
    // Basic user information
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  
    // User roles
    isAdmin: {
      type: Boolean,
      default: false,
    },
    isTenant: {
      type: Boolean,
      default: false,
    },
  
    
})
  module.exports = mongoose.model("User", userSchema);
  
  
  
  
  
  
  
  
  