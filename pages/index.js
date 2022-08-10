import { Box, Button, Form, FormField, Heading, Main, TextInput, Paragraph } from 'grommet';
import Head from 'next/head';
import { useState } from 'react';
import { event } from "nextjs-google-analytics";
import { withTheme } from 'styled-components';


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
          <meta name="description" content="Social media like it should be. No ads. No AI. Only friends." />
  
        </Head>
        <Main full>
          <Box pad="small" align="center" style={{minHeight: '100vh'}} background="url(friends.jpg)">
            <Paragraph>Social media like it should be.</Paragraph>
            <Heading textAlign="center" size="large" margin="none">No ads. No AI. Only friends.</Heading>
            <Heading level={2} textAlign="center" size="large">$5 / month</Heading>
            <Box background={{color: "black", opacity: 0.7}} round pad="medium" >
              <Heading level={2} textAlign="center">Reserve your username now:</Heading>
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
                <Button disabled={state === 'pending'} fill="horizontal" type="submit" color="white" primary label="Reserve now" />
              </Form>
            </Box>
          </Box>
          <Box>
            <Box pad="xlarge" align="center" justify="center" background="url(friends-3.jpg)" width="100%" style={{minHeight: '100vh'}}>
              <Box align="start" pad="medium" round background={{color: "black", opacity: 0.7}}>
                <Paragraph size="large">What do Facebook, Twitter, Tiktok, Snapchat, Instagram and LinkedIn all have in common?</Paragraph>
                <Paragraph size="large">You aren&apos;t the customer; you&apos;re the product.</Paragraph>
                <Paragraph size="large">Their customers are advertisers — not you.</Paragraph>
              </Box>
            </Box>
            
            <Box pad="xlarge" align="center" justify="center" background="url(friends-4.jpg)" width="100%" style={{minHeight: '100vh'}}>
              <Box align="start" pad="medium" round background={{color: "black", opacity: 0.7}}>
                <Paragraph size="large">&quot;But I don&apos;t mind seeing an ad every now and then!&quot;</Paragraph>
                <Paragraph size="large">The ads aren&apos;t the point.</Paragraph>
                <Paragraph size="large">It&apos;s the incentives the ads create.</Paragraph>
              </Box>
            </Box>
            <Box pad="xlarge" align="center" justify="center" background="url(friends-4.jpg)" width="100%" style={{minHeight: '100vh'}}>
              <Box align="start" pad="medium" round background={{color: "black", opacity: 0.7}}>
                <Paragraph size="large">You see, to target you with ads...</Paragraph>
                <Paragraph size="large"><strong>They have to spy on you.</strong></Paragraph>
                <Paragraph size="large">And they have to be <strong>addictive</strong>, so you come back.</Paragraph>
                <Paragraph size="large">That&apos;s why they&apos;re always changing —</Paragraph>
                <Paragraph size="large">Optimizing for addiction.</Paragraph>

              </Box>
            </Box>
            <Box align="center" pad="xlarge" justify="center" background="url(friends-2.jpg)" width="100%" style={{minHeight: '100vh'}}>
              <Box align="start" pad="medium" round background={{color: "black", opacity: 0.7}}>
                <Paragraph size="large" color="white">Imagine a world...</Paragraph>
                <Paragraph size="large" color="white">in which social media companies...</Paragraph>
                <Paragraph size="large" color="white">were accountable to their users...</Paragraph>
                <Paragraph size="large" color="white">instead of their advertisers.</Paragraph>
              </Box>
            </Box>
            <Box align="center" pad="xlarge" justify="center" background="url(friends-6.jpg)" width="100%" style={{minHeight: '100vh'}}>
              <Box align="start" pad="medium" round background={{color: "black", opacity: 0.7}}>
                <Paragraph size="large" color="white">Imagine an app that was built for <strong>you</strong>...</Paragraph>
                <Paragraph size="large" color="white">and not a bunch of creepy internet marketers.</Paragraph>
              </Box>
            </Box>
            
            <Box pad="xlarge" align="center" justify="center" background="url(friends-5.jpg)" width="100%" style={{minHeight: '100vh'}}>
              <Box align="start" pad="medium" round background={{color: "black", opacity: 0.7}}>              
                <Paragraph size="large">Onlyfrends.lol is a place for you and your friends.</Paragraph>
                <Paragraph size="large">It&apos;s a place to share ideas, thoughts, pictures, videos, you name it.</Paragraph>
                <Paragraph size="large">Everyone is welcome to join onlyfriends for a small monthly fee.</Paragraph>
                <Paragraph size="large">Note: You&apos;re exchanging money for a service. That makes you a <strong>customer</strong>!</Paragraph>
              </Box>
            </Box>
            <Box pad="xlarge" align="center" justify="center" background="url(friends-7.jpg)" width="100%" style={{minHeight: '100vh'}}>
              <Box align="start" pad="medium" round background={{color: "black", opacity: 0.7}}>              
                <Paragraph size="large">We don&apos;t care <i>what</i> you&apos;re into. We just want you to have a good time here...</Paragraph>
                <Paragraph size="large">So you keep paying us money. It&apos;s a pretty simple relationship.</Paragraph>
              </Box>
            </Box>
            <Box pad="xlarge" align="center" justify="center" background="black" width="100%" style={{minHeight: '100vh'}}>
              <Heading level={2} textAlign="center">Reserve your username now:</Heading>
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
                <Button disabled={state === 'pending'} fill="horizontal" type="submit" color="white" primary label="Reserve now" />
              </Form>
            </Box>

            







          </Box>
        </Main>
      </div>
    )
  } else {
    return (
      <div>
        <Head>
          <title>Onlyfriends.lol</title>
          <meta name="description" content="Social media like it should be. No ads. No AI. Only friends." />
        </Head>
        <Main align="center" background="black" full style={{minHeight: '100vh'}}>
          <Heading textAlign="center" size="large">We&apos;ll be in touch.</Heading>
        </Main>
      </div>
    )
    
  }
  
}
