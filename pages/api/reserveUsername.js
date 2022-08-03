// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { table } from "../../utils/Airtable"

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).send({ message: "Only POST requests allowed"})
    return
  }
  const username = req.body.username
  const email = req.body.email
  if (!String(email).toLowerCase().match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
    // invalid email
    res.status(400).json({ msg: 'Invalid email address.'})
    return
  }
  if (!String(username).match(/^[a-zA-Z0-9_]+$/) && username.length < 40) {
    // invalid username
    res.status(400).json({msg: 'Invalid username. Only letters, numbers and underscores allowed. Must be less than 40 characters.'})
    return
  }

  try {
    const matchingUsernames = await table.select({filterByFormula: `{username} = '${username}'`}).firstPage();
    const matchingEmails = await table.select({filterByFormula: `{email} = '${email}'`}).firstPage();
    if (matchingUsernames.length === 0) {
      if (matchingEmails.length === 0) {
        // Yay! Username is available. Give it to this email address
        try {
          console.log('Creating new user')
          const newUser = await table.create([
            {
              fields: {
                "email": email, 
                "username": username
              }
            }
          ])
          res.status(201).json('Created.');
        } catch (error) {
          console.log(error)
          res.status(500).json({msg: "Could not create new user."})
        }
      } else {
        // No! Email is already in use. Return an error
        res.status(409).json({msg: "This email address already reserved a username."})
      }
      
    } else {
      // No! Username is already reserved. Return an error
      res.status(409).json({msg: "Username already taken."})
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({msg: "Something went wrong!"})
  }
}
