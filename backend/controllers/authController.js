// controllers/authController.js
const authController = {
  // Handles user login logic
  login: async (req, res) => {
    try {
      // In a real app, you would validate the user's credentials against the database.
      const { email, password } = req.body;

      // Placeholder for successful login
      if (email === 'alumni@example.com' && password === 'password123') {
        // In a real app, you would generate and return a JWT here.
        // For this example, we just return a success message.
        return res.status(200).json({ message: 'Login successful!', token: 'dummy_token' });
      } else {
        return res.status(401).json({ error: 'Invalid credentials' });
      }

    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred during login.' });
    }
  },
};

module.exports = authController;