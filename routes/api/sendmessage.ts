import { FreshContext } from "$fresh/server.ts";

const accountSid = Deno.env.get('TWILIO_ACCOUNT_SID');
const authToken = Deno.env.get('TWILIO_AUTH_TOKEN');
const messagingServiceSid = Deno.env.get('TWILIO_MESSAGING_SERVICE_SID');

const url = `https://api.twilio.com/2010-04-01/Accounts/${accountSid}/Messages.json`;

export const handler = async (req: Request, _ctx: FreshContext) => {
  try {
    // Check for missing environment variables
    if (!accountSid || !authToken || !messagingServiceSid) {
      return new Response(JSON.stringify({ error: 'Twilio credentials missing' }), { status: 500 });
    }

    // Parse the incoming JSON body
    const { to, body } = await req.json();

    // Validate required fields
    if (!to || !body) {
      return new Response(JSON.stringify({ error: 'Missing required fields' }), { status: 400 });
    }

    // Log the request parameters for debugging
    console.log('Sending SMS to:', to, 'with body:', body);

    // Create the form data for the request
    const formData = new URLSearchParams();
    formData.append('To', to);
    formData.append('MessagingServiceSid', messagingServiceSid); // Use the declared messagingServiceSid
    formData.append('Body', body);

    // Basic Authentication header
    const headers = new Headers();
    headers.set('Authorization', 'Basic ' + btoa(`${accountSid}:${authToken}`));

    const requestOptions: RequestInit = {
      method: 'POST',
      headers: headers,
      body: formData,
    };

    // Make the POST request to Twilio
    const response = await fetch(url, requestOptions);

    if (response.ok) {
      const data = await response.json();
      return new Response(JSON.stringify({ messageSid: data.sid }), {
        status: response.status,
      });
    } else {
      const errorData = await response.json();
      return new Response(JSON.stringify({ error: errorData.message }), {
        status: response.status,
      });
    }
  } catch (error) {
    console.error('Error sending SMS:', error);
    return new Response(JSON.stringify({ error: 'Failed to send SMS' }), {
      status: 500,
    });
  }
};
