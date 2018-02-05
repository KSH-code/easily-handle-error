/* global describe, it */
'use strict'
const express = require('express')
const request = require('request')
const { checkEqual } = require('easily-expect')
const app = require('../index')(express())
function timer () {
  return new Promise(resolve => {
    setTimeout(() => {
      return resolve(true)
    }, 100)
  })
}
describe('Start', () => {
  it('Listen server', done => {
    app.get('/', async (req, res) => {
      await timer()
      res.status(200).end()
    })
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
    app.listen(7001)
    done()
  })
  it('test', done => {
    request.get('http://127.0.0.1:7001', (err, res, body) => {
      if (err) return done(err)
      checkEqual(200, res.statusCode)
      done()
    })
  })
  it('test error1', done => {
    request.get('http://127.0.0.1:7001/error1', (err, res, body) => {
      if (err) return done(err)
      checkEqual(500, res.statusCode)
      done()
    })
  })
  it('test error2', done => {
    request.get('http://127.0.0.1:7001/error2', (err, res, body) => {
      if (err) return done(err)
      checkEqual(500, res.statusCode)
      done()
    })
  })
})
