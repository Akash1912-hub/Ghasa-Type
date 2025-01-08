router.post('/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;
    
    // Check if the password is at least 6 characters long
    if (password.length < 6) {
      return res.status(400).json({ message: 'Password must be at least 6 characters long' });
    }
    
    // Check if email or username already exists
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      if (existingUser.email === email) {
        return res.status(400).json({ message: 'Email already in use' });
      }
      if (existingUser.username === username) {
        return res.status(400).json({ message: 'Username already taken' });
      }
    }

    // Set admin role for specific email
    const role = (email === 'asivasabariganesan@gmail.com' || email === '231401004@rajalakshmi.edu.in') ? 'admin' : 'user';

    
    const user = new User({
      username,
      email,
      password,
      role
    });

    await user.save();

    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.status(201).json({
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});
