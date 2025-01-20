exports.handler = async (event, context) => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: 'Method Not Allowed'
    }
  }

  const { identity, user } = context.clientContext
  
  if (!user) {
    return {
      statusCode: 401,
      body: 'Unauthorized'
    }
  }

  return {
    statusCode: 200,
    body: JSON.stringify({
      token: user.token,
      provider: 'github'
    })
  }
} 