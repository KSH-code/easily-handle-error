[![Build Status](https://travis-ci.org/KSH-code/easily-handle-error.svg?branch=master)](https://travis-ci.org/KSH-code/handle-error)
![Npm Version](https://img.shields.io/npm/v/easily-handle-error.svg?style=flat-square)
# Usage
```
npm install --save easily-handle-error
```
```
  const express = require('express')
  const ehe = require('ehe')
  const app = ehe(express())

  app.get('/error1', async (req, res) => {
    await timer()
    throw new Error('error')
  })
  
  app.get('/error2', async (req, res, next) => {
    await timer()
    next()
  }, async (req, res) => {
    await timer()
    throw new Error('error')
  })

  app.use((err, req, res, next) => {
    if (err) res.status(500).end()
  })
```
## Example

