require("dotenv").config();

const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.post("/send-feedback", async (req, res) => {

    const {
        name,
        experience,
        issues,
        happy,
        changes,
        future
    } = req.body;

    const embed = {
        title: "🤖 New Nova AI Tester Feedback",
        color: 3447003,

        fields: [
            {
                name: "👤 Name",
                value: name || "Unknown",
                inline: false
            },
            {
                name: "📝 Experience",
                value: experience || "None",
                inline: false
            },
            {
                name: "🐞 Problems Found",
                value: issues || "None",
                inline: false
            },
            {
                name: "✅ Happy With Development?",
                value: happy || "No response",
                inline: true
            },
            {
                name: "🔧 Requested Changes",
                value: changes || "N/A",
                inline: false
            },
            {
                name: "🚀 Future Suggestions",
                value: future || "None",
                inline: false
            }
        ],

        footer: {
            text: "Nova AI Feedback System"
        },

        timestamp: new Date().toISOString()
    };

    try {

        const response = await fetch(process.env.WEBHOOK_URL, {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({

                username: "Nova Feedback",

                embeds: [embed]

            })

        });

        if (!response.ok) {

            throw new Error("Discord rejected the webhook.");

        }

        res.json({

            success: true,

            message: "Feedback submitted successfully."

        });

    } catch (err) {

        console.error(err);

        res.status(500).json({

            success: false,

            message: "Could not send feedback."

        });

    }

});

app.listen(3000, () => {

    console.log("Server running on port 3000");

});