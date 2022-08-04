import { Button, Form, FormField, Heading, Main, TextInput } from 'grommet';
import Head from 'next/head';
import { useState } from 'react';
import { event } from "nextjs-google-analytics";


export default function Home() {

  const [value, setValue] = useState({});
  const [state, setState] = useState('idle');
  const [error, setError] = useState(false);
  
  const handleSubmit = async ({value}) => {
    setError(false)
    setState('pending')
    try {
      const res = await fetch("/api/reserveUsername", {
        method: "POST",
        body: JSON.stringify(value),
        headers: { 'Content-Type': 'application/json'}
      })
      const status = await res.status;
      if (status === 201) {
        setState('success')
        event("reserved_username")
      } else {
        const error = await res.json()
        setState('error')
        setError(error)
      }
    } catch (error) {
      console.error(error)
      setState('error')
      setError(error)
    }
  }


  if (state !== 'success') {
    return (
      <div>
        <Head>
          <title>Onlyfriends.lol</title>
          <meta name="description" content="No ads. No AI. Only friends." />
  
        </Head>
        <Main align="center" background="black" full style={{minHeight: '100vh'}}>
          <Heading textAlign="center" size="large">No ads. No AI. Only friends.</Heading>
          <Heading level={2} textAlign="center" size="large">$<strike>15</strike> 5 / month</Heading>
          <Heading level={2} textAlign="center">Reserve your username today:</Heading>
          { error && (<Heading textAlign="center" color="red" level={2}>{error.msg}</Heading>)}
          <Form
            value={value}
            onChange={nextValue => setValue(nextValue)}
            onSubmit={handleSubmit}
          >
            <FormField 
              htmlFor="email" 
              label="Email Address"
            >
              <TextInput type="email" name="email" id="email" required />
            </FormField>
            <FormField 
              htmlFor="username" 
              label="Username"
              info="Lowercase letters, numbers and _ only."
            >
              <TextInput name="username" id="username" required  />
            </FormField>
            <Button disabled={state === 'pending'} fill="horizontal" type="submit" primary label="Reserve now" />
          </Form>
        </Main>
      </div>
    )
  } else {
    return (
      <div>
        <Head>
          <title>Onlyfriends.lol</title>
          <meta name="description" content="No ads. No AI. Only friends." />
        </Head>
        <Main align="center" background="black" full style={{minHeight: '100vh'}}>
          <Heading textAlign="center" size="large">We&apos;ll be in touch.</Heading>
        </Main>
      </div>
    )
    
  }
  
}
