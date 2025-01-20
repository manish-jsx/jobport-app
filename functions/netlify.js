const fetch = require('node-fetch')

exports.handler = async (event, context) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' }
  }

  const { identity, user } = context.clientContext

  if (!user) {
    return { statusCode: 401, body: 'Unauthorized' }
  }

  try {
    const response = await fetch('https://api.github.com/user', {
      headers: {
        'Authorization': `token ${user.token}`,
        'Accept': 'application/json',
      },
    })

    if (!response.ok) {
      throw new Error('GitHub API call failed')
    }

    const data = await response.json()

    return {
      statusCode: 200,
      body: JSON.stringify({
        token: user.token,
        provider: 'github',
        user: data
      })
    }
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to authenticate with GitHub' })
    }
  }
} 