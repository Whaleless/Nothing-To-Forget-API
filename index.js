const PORT = process.env.PORT || 8000;
const express = require('express');
const axios = require('axios');

const app = express()

app.get('/', (req,res) => {
    res.json('Welcome to NothingToForget');
})

const stories = [
    {
        id: 1,
        name: 'The first test story',
        hashtags: ['Senya', 'carrot', 'Love Story'],
        story: 'I have a story to tell you, so listen closely',
    },
    {
        id: 2,
        name: 'The second test story',
        hashtags: ['Senya', 'Carrot', 'Love Story'],
        story: 'Once upon a time',
    }
]

function randomStory(stories) {
    return Math.floor(Math.random() * stories.length);
}

function findStoriesByHashtag(stories, hashtag) {
    const hashtagStories = stories.filter(story => {
        return story.hashtags.includes(hashtag);
    })
    return hashtagStories;
}

app.get('/stories', (req,res) => {
    res.json(stories);
})

app.get('/stories/random', (req,res) => {
    res.json(stories[randomStory(stories)]);
})

app.get('/stories/hashtag/:hashtag', async (req,res) => {
    const hashtag = req.params.hashtag;
    res.json(findStoriesByHashtag(stories, hashtag));
})

app.get('/stories/hashtag/:hashtag/random', async (req,res) => {
    const hashtag = req.params.hashtag;
    const hashtagStories = findStoriesByHashtag(stories, hashtag);
    res.json(hashtagStories[randomStory(hashtagStories)]);
})

app.listen(PORT, () => console.log(`SERVER RUNNING ON PORT ${PORT}`));