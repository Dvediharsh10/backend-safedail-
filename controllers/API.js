// controllers/API.js

const User = require('../models/User');

/**
 * API for fetching user details by phone number.
 for now  Using req.query (GET request )for fetching,
 
*/
exports.getUserByNumber = async (req, res) => {
    try {
        
        const { phoneNumber } = req.query;

      
        if (!phoneNumber) {
            return res.status(400).json({ 
                message: 'Phone number is required.' 
            });
        }

        // chck user/number in the database
        const user = await User.findOne({ phoneNumber });

        // 'Not Found' Case
        if (!user) {
            // Use 404 for a resource that doesn't exist
            return res.status(404).json({ 
                message: 'User not found.' 
            });
        }

        //  Successful Response (Status 200 OK ,default)
        return res.status(200).json({
            name: user.name,
            phoneNumber: user.phoneNumber,
            spamCount: user.spamCount || 0, // Ensure a default of 0 if field is missing
            
        });

    } catch (err) {
        console.error('Error fetching user:', err);
        // Internal Server Errors
        return res.status(500).json({ 
            message: 'Internal Server Error' 
        });
    }
};


/**
 *  POST request spam number 
 */
exports.reportNumber = async (req, res) => {
    try {
        
        const { phoneNumber } = req.body;

         // Validation
        if (!phoneNumber) {
            return res.status(400).json({ 
                message: 'Phone number is required in the request body.' 
            });
        }

        // Update the user/number
        
        const updatedUser = await User.findOneAndUpdate(
            { phoneNumber },
            { $inc: { spamCount: 1 } }, // Increment spamCount by 1
            { new: true, upsert: true } // {new: true} returns the updated document. {upsert: true} creates the document if it doesn't exist.
        );
        
        // Successful Response
        // Use 200 OK or 202 Accepted for a successful update 
        return res.status(200).json({
            message: 'Number successfully reported as spam.',
            phoneNumber: updatedUser.phoneNumber,
            newSpamCount: updatedUser.spamCount
        });

    } catch (err) {
        console.error('Error reporting number as spam:', err);
        //  Internal Server Errors
        return res.status(500).json({ 
            message: 'Internal Server Error' 
        });
    }
};