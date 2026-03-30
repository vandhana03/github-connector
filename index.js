const express = require('express');
const axios = require('axios');
require('dotenv').config();

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;
const TOKEN = process.env.GITHUB_TOKEN;

// Get Repositories
app.get('/repos/:username', async (req, res) => {
  try {
    const { username } = req.params;

    const response = await axios.get(
      `https://api.github.com/users/${username}/repos`,
      {
        headers: {
          Authorization: `token ${TOKEN}`
        }
      }
    );

    res.json(response.data.map(repo => ({
      name: repo.name,
      url: repo.html_url,
      private: repo.private
    })));

  } catch (error) {
    res.status(error.response?.status || 500).json({
      message: error.message
    });
  }
});

// Get Issues
app.get('/issues/:owner/:repo', async (req, res) => {
  try {
    const { owner, repo } = req.params;

    const response = await axios.get(
      `https://api.github.com/repos/${owner}/${repo}/issues`,
      {
        headers: {
          Authorization: `token ${TOKEN}`
        }
      }
    );

    res.json(response.data.map(issue => ({
      title: issue.title,
      body: issue.body,
      state: issue.state,
      url: issue.html_url
    })));

  } catch (error) {
    res.status(error.response?.status || 500).json({
      message: error.message
    });
  }
});

// Create Issue
app.post('/create-issue', async (req, res) => {
  try {
    const { owner, repo, title, body } = req.body;

    const response = await axios.post(
      `https://api.github.com/repos/${owner}/${repo}/issues`,
      { title, body },
      {
        headers: {
          Authorization: `token ${TOKEN}`
        }
      }
    );

    res.json({
      message: "Issue created successfully",
      url: response.data.html_url
    });

  } catch (error) {
    res.status(error.response?.status || 500).json({
      message: error.message
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
