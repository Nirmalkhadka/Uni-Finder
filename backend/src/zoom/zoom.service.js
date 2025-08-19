import fetch from "node-fetch";
import base64 from "base-64";
const zoomAccountId = "6S2UWxtuQ52oiJmW9ayQfA";
const zoomClientId = "xOmR2jZFRoqFR_KZs5nHJA";
const zoomClientSecret = "MOW3GLJv5UcF9d1WQEab04EVufZ4yeT4";

const getAuthHeaders = () => {
    return {
        Authorization: `Basic ${base64.encode(
            `${zoomClientId}:${zoomClientSecret}`
        )}`,
        "Content-Type": "application/json"
    };
};

export const generateZoomAccessToken = async () => {
    try {
        const response = await fetch(
            `https://zoom.us/oauth/token?grant_type=account_credentials&account_id=${zoomAccountId}`,
            {
                method: "POST",
                headers: getAuthHeaders()
            }
        );

        const jsonResponse = await response.json();
        return jsonResponse.access_token;
        // return jsonResponse;
        // console.log(jsonResponse);
        // console.log(jsonResponse.access_token);



    } catch (error) {  
        console.log("Access Token Error --> ", error);
        throw error;
    }
}

export const generateZoomMeeting = async (req, res, next) => {
    try {
        //get data from the front end
        const initiator = req.body.initiator;
        const requestee = req.body.requestee;
        const meetingDate = req.body.meetingDate;
        const meetingTime = req.body.meetingTime;

        const start_time = new Date(`${meetingDate}T${meetingTime}:00`).toISOString();

        const zoomAccessToken = await generateZoomAccessToken();
        const response = await fetch(
            `https://api.zoom.us/v2/users/me/meetings`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${zoomAccessToken}`
                },
                body: JSON.stringify({
                    agenda: "Abroad Study Consultation",
                    default_password: false,
                    duration: 60,
                    password: "unifinder",
                    // schedule_for: "pushpa527sangroula@gmail.com",
                    settings: {
                        allow_multiple_devices: true,
                        breakout_rooms: {
                            enable: true,
                            rooms: [
                                {
                                    name: "room1",
                                    participants: [
                                        initiator, requestee
                                    ]
                                }

                            ]
                        },
                        calendar_type: 1,
                        contact_email: initiator,
                        // contact_name: "Pushpa Raj",
                        email_notification: true,
                        encryption_type: 'enhanced_encryption',
                        focus_mode: true,
                        // global_dial_in_countries: ['US'],
                        host_video: true,
                        join_before_host: true,
                        meeting_authentication: true,
                        mute_upon_entry: true,
                        participant_video: true,
                        private_meeting: true,
                        waiting_room: false,
                        watermark: false,
                        continuous_meeting_chat: {
                            enable: true
                        }
                    },
                    start_time: start_time,
                    timezone: 'Asia/Kathmandu',
                    topic: 'Abroad Study Consultation',
                    type: 2
                }),
            }
        );

        const jsonResponse = await response.json();
        if (!response.ok) {
            return res.status(400).json(
                {
                    success: false,
                    message: jsonResponse
                });
        } else {
            // Return meeting details (join and start URL)
            return res.status(201).json({
                success: true,
                message: "Zoom meeting created",
                join_url: jsonResponse.join_url,
                start_url: jsonResponse.start_url,
                meeting_id: jsonResponse.id,
                topic: jsonResponse.topic,
                password: jsonResponse.password,
                // full_response: jsonResponse
            });
        }

        // console.log(jsonResponse);

    } catch (error) {
        console.log("Meeting Generation Error --> ", error);
        // throw error;
        return res.status(500).json({
            success: false,
            message: error.message || "Server error"
        });
    }
}




