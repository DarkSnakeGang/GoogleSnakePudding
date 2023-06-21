// netlify/functions/fetch-css.js

const fetch = require('node-fetch');

exports.handler = async (event, context) => {
  try {
    // Fetch the CSS file from GitHub
    const response = await fetch('https://main--starlit-llama-4c0b99.netlify.app/bootstrap-stripped.css');
    const cssContent = await response.text();

    // Set the response headers
    const headers = {
      'Content-Type': 'text/css',
    };

    return {
      statusCode: 200,
      headers,
      body: cssContent,
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to fetch CSS file' }),
    };
  }
};
